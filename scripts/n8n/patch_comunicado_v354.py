"""Prepara o fluxo de comunicado para a v3.5.4. Nao publica nada.

Uso: python patch_comunicado_v354.py lido.json novo.json email.html
Workflow: 8iNFZ03A0rtX9Y1q
"""
import json
import sys
import uuid

VERSAO = "3.5.4"
ASSUNTO = "🚨 v3.5.4: atualize para voltar a baixar por certificado digital"
EMAIL_TESTE = "rogerio@tecnologiacorporativa.com.br"

QUERY_DESTINATARIOS = """SELECT DISTINCT ON (lower(trim(c.email))) c.*,
       $1::text AS comunicado_versao,
       $2::text AS comunicado_assunto
FROM public.nota_facil_clientes c
WHERE c.followup_tag IS DISTINCT FROM 'nao_enviar'
  AND NOT EXISTS (
      SELECT 1 FROM public.comunicado_envios e
      WHERE e.versao = $1
        AND e.email = lower(trim(c.email))
        AND e.status = 'enviado'
  )
ORDER BY lower(trim(c.email)), c.last_seen DESC NULLS LAST"""

QUERY_LOG = """INSERT INTO public.comunicado_envios (versao, email, status, detalhe)
VALUES ($1, lower(trim($2)), $3, $4)
ON CONFLICT (versao, email) DO UPDATE
SET status = EXCLUDED.status, detalhe = EXCLUDED.detalhe, atualizado_em = now()"""

ITEM = "$('LoopCadastrados1').item.json"


def main(lido, novo, email_html):
    w = json.load(open(lido, encoding="utf-8"))
    html = open(email_html, encoding="utf-8").read()
    nos = {n["name"]: n for n in w["nodes"]}
    con = w["connections"]

    # Confere o estado esperado: se alguem mexeu no fluxo, para aqui.
    busca = nos["BuscaDados"]["parameters"]
    assert busca["operation"] == "select" and busca["where"]["values"][0]["value"] == "=nao_enviar"
    brevo = nos["Send a transactional email"]
    assert brevo["parameters"]["subject"].startswith("=[Atualização Crítica v3.5]")
    assert brevo.get("onError") is None
    assert "Atualização v3.5.2" in nos["HTML Email Atualização"]["parameters"]["html"]
    assert con["Comunicar Atualização"]["main"] == [[{"node": "credenciais", "type": "main", "index": 0}]]
    assert con["Schedule Trigger1"]["main"] == [[{"node": "credenciais", "type": "main", "index": 0}]]
    assert con["credenciais"]["main"] == [[{"node": "BuscaDados", "type": "main", "index": 0}]]
    assert con["Send a transactional email"]["main"] == [[{"node": "Wait", "type": "main", "index": 0}]]
    assert not any(o for s in con.get("Envia E-mail Plunk1", {}).values() for o in s)
    assert not any(
        d["node"] == "Envia E-mail Plunk1"
        for c in con.values() for s in c.values() for o in s for d in o
    )
    assert "link_download" not in html and "{https" not in html
    assert not any("$('credenciais')" in json.dumps(n["parameters"]) for n in w["nodes"])

    # Token do Chatwoot e chave do Plunk saem deste caminho: nenhum dos dois nos e usado no comunicado.
    x, y = nos["credenciais"]["position"]
    w["nodes"] = [n for n in w["nodes"] if n["name"] not in ("credenciais", "Envia E-mail Plunk1")]
    del con["credenciais"]
    con.pop("Envia E-mail Plunk1", None)

    def add(no):
        no["id"] = str(uuid.uuid4())
        w["nodes"].append(no)

    def campo(nome, valor):
        return {"id": str(uuid.uuid4()), "name": nome, "value": valor, "type": "string"}

    # Item 5 e versao do registro
    add({
        "name": "config_comunicado", "type": "n8n-nodes-base.set", "typeVersion": 3.4, "position": [x, y],
        "parameters": {"assignments": {"assignments": [
            campo("versao", VERSAO), campo("assunto", ASSUNTO),
        ]}, "options": {}},
    })
    destino = [[{"node": "config_comunicado", "type": "main", "index": 0}]]
    con["Comunicar Atualização"]["main"] = destino
    con["Schedule Trigger1"]["main"] = destino
    con["config_comunicado"] = {"main": [[{"node": "BuscaDados", "type": "main", "index": 0}]]}

    # Itens 1 e 2: nulo nao fica de fora; quem ja recebeu e pulado; e-mail repetido sai uma vez so.
    nos["BuscaDados"]["parameters"] = {
        "operation": "executeQuery",
        "query": QUERY_DESTINATARIOS,
        "options": {"queryReplacement": "={{ [$json.versao, $json.assunto] }}"},
    }

    # Item 4: gatilho separado, com destinatario interno fixo.
    add({
        "name": "Testar Comunicado", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1,
        "position": [x - 192, y - 240], "parameters": {},
    })
    add({
        "name": "destinatario_teste", "type": "n8n-nodes-base.set", "typeVersion": 3.4, "position": [x, y - 240],
        "parameters": {"assignments": {"assignments": [
            campo("email", EMAIL_TESTE), campo("nome", "Rogério"),
            campo("comunicado_versao", VERSAO + "-teste"), campo("comunicado_assunto", "[TESTE] " + ASSUNTO),
        ]}, "options": {}},
    })
    con["Testar Comunicado"] = {"main": [[{"node": "destinatario_teste", "type": "main", "index": 0}]]}
    con["destinatario_teste"] = {"main": [[{"node": "LoopCadastrados1", "type": "main", "index": 0}]]}

    # Item 5: conteudo da v3.5.4
    nos["HTML Email Atualização"]["parameters"]["html"] = html
    brevo["parameters"]["subject"] = "={{ " + ITEM + ".comunicado_assunto }}"

    # Itens 2 e 3: falha no envio nao para o loop e tudo fica registrado.
    brevo["onError"] = "continueErrorOutput"
    bx, by = brevo["position"]
    pg_cred = nos["BuscaDados"]["credentials"]

    def log(nome, py, status, detalhe):
        add({
            "name": nome, "type": "n8n-nodes-base.postgres", "typeVersion": 2.6, "position": [bx + 192, py],
            "credentials": pg_cred,
            "parameters": {
                "operation": "executeQuery", "query": QUERY_LOG,
                "options": {"queryReplacement": "={{ [" + ITEM + ".comunicado_versao, " + ITEM + ".email, '"
                            + status + "', " + detalhe + "] }}"},
            },
        })

    log("registra_enviado", by - 112, "enviado", "String($json.messageId || '')")
    log("registra_erro", by + 112, "erro",
        "String(($json.error && $json.error.message) || $json.error || $json.message || 'erro')")
    con["Send a transactional email"]["main"] = [
        [{"node": "registra_enviado", "type": "main", "index": 0}],
        [{"node": "registra_erro", "type": "main", "index": 0}],
    ]
    espera = {"main": [[{"node": "Wait", "type": "main", "index": 0}]]}
    con["registra_enviado"] = espera
    con["registra_erro"] = espera
    nos["Wait"]["position"] = [bx + 416, by]

    json.dump(w, open(novo, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("ok:", novo, "| nos:", len(w["nodes"]))


if __name__ == "__main__":
    main(*sys.argv[1:4])
