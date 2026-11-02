"""Atualiza versao, assunto e HTML do comunicado. Nao publica nem envia nada.

Uso: python patch_comunicado.py lido.json novo.json VERSAO "ASSUNTO" email.html
Workflow: 8iNFZ03A0rtX9Y1q
"""
import json
import re
import sys

EMAIL_TESTE = "rogerio@tecnologiacorporativa.com.br"


def main(lido, novo, versao, assunto, email_html):
    w = json.load(open(lido, encoding="utf-8"))
    html = open(email_html, encoding="utf-8").read()
    nos = {n["name"]: n for n in w["nodes"]}

    # Confere o estado esperado: se alguem mexeu no fluxo, para aqui.
    assert w["active"] is False, "o comunicado deve seguir inativo"
    assert nos["Send a transactional email"].get("onError") == "continueErrorOutput"
    assert w["connections"]["Comunicar Atualização"]["main"][0][0]["node"] == "config_comunicado"
    assert f"v{versao}" in html, "e-mail sem a versao"
    assert f"v{versao}" in assunto, "assunto sem a versao"

    # O unico {{ }} aceito e o do nome; outro marcador quebra no n8n ou chega ao cliente.
    marcadores = [m for m in re.findall(r"\{\{.*?\}\}", html) if "$json.nome" not in m]
    assert not marcadores, f"marcador pendente: {marcadores}"
    assert "{https" not in html, "link quebrado"

    def define(no, valores):
        campos = {a["name"]: a for a in nos[no]["parameters"]["assignments"]["assignments"]}
        for nome, valor in valores.items():
            campos[nome]["value"] = valor

    define("config_comunicado", {"versao": versao, "assunto": assunto})
    define("destinatario_teste", {
        "email": EMAIL_TESTE,
        "comunicado_versao": versao + "-teste",
        "comunicado_assunto": "[TESTE] " + assunto,
    })
    nos["HTML Email Atualização"]["parameters"]["html"] = html

    json.dump(w, open(novo, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("ok")


if __name__ == "__main__":
    main(*sys.argv[1:6])
