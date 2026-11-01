"""Atualiza versao e cards do app para a v3.5.4. Nao publica nada.

Uso: python patch_licenciamento_v354.py lido.json novo.json card.json
Workflow: SVWDjcZJzAMpck5w
"""
import json
import sys


def main(lido, novo, card):
    w = json.load(open(lido, encoding="utf-8"))
    cards = json.load(open(card, encoding="utf-8"))
    no = [n for n in w["nodes"] if n["name"] == "configuracoes"]
    assert len(no) == 1
    campos = {a["name"]: a for a in no[0]["parameters"]["assignments"]["assignments"]}

    # Confere o estado esperado: se alguem mexeu no fluxo, para aqui.
    assert campos["current_version"]["value"] == "3.5.2"
    assert str(campos["is_mandatory"]["value"]).lower() == "true"
    assert "v3.5.2" in campos["html_banners"]["value"]
    assert isinstance(cards, list) and "v3.5.4" in cards[0]["title"]

    campos["current_version"]["value"] = "3.5.4"
    campos["html_banners"]["value"] = "=" + json.dumps(cards, ensure_ascii=False, indent=2)

    json.dump(w, open(novo, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("ok")


if __name__ == "__main__":
    main(*sys.argv[1:4])
