"""Atualiza versao e cards do app. Nao publica nada.

Uso: python patch_licenciamento.py lido.json novo.json VERSAO_ANTERIOR VERSAO card.json
Workflow: SVWDjcZJzAMpck5w
"""
import json
import sys


def main(lido, novo, anterior, versao, card):
    w = json.load(open(lido, encoding="utf-8"))
    cards = json.load(open(card, encoding="utf-8"))
    no = [n for n in w["nodes"] if n["name"] == "configuracoes"]
    assert len(no) == 1
    campos = {a["name"]: a for a in no[0]["parameters"]["assignments"]["assignments"]}

    # Confere o estado esperado: se alguem mexeu no fluxo, para aqui.
    assert campos["current_version"]["value"] == anterior, "versao publicada diferente da esperada"
    assert anterior != versao
    assert isinstance(cards, list) and cards and f"v{versao}" in cards[0]["title"], "card sem a versao"
    assert "{{" not in json.dumps(cards), "card com marcador pendente"

    campos["current_version"]["value"] = versao
    campos["html_banners"]["value"] = "=" + json.dumps(cards, ensure_ascii=False, indent=2)

    json.dump(w, open(novo, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("ok")


if __name__ == "__main__":
    main(*sys.argv[1:6])
