"""Modelo para copiar na raiz do projeto do robo. Aciona o Claude Code na pasta do site.

Uso:
  python release.py preparar release.json
  python release.py publicar release.json                         (a Store ja aprovou)
  python release.py publicar release.json --confirmar-obrigatoria (libera atualizacao obrigatoria)

Acrescente --simular para so mostrar o comando.
A pasta do site vem de NF_SITE_DIR.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

SITE_PADRAO = r"C:\Users\Rogerio\orca\workspaces\site_notafacil_downloader\main"
CAMPOS = ("versao", "versao_anterior", "assunto", "obrigatoria", "copy", "email", "card")
FERRAMENTAS = "Read,Grep,Glob,Edit,Write,Bash"


def carregar(caminho):
    manifesto = json.load(open(caminho, encoding="utf-8"))
    faltando = [c for c in CAMPOS if c not in manifesto]
    if faltando:
        sys.exit(f"release.json sem os campos: {', '.join(faltando)}")
    base = Path(caminho).resolve().parent
    for campo in ("copy", "email", "card"):
        arquivo = (base / manifesto[campo]).resolve()
        if not arquivo.is_file():
            sys.exit(f"arquivo nao encontrado: {arquivo}")
        manifesto[campo] = str(arquivo)
    return manifesto


def main():
    p = argparse.ArgumentParser()
    p.add_argument("etapa", choices=["preparar", "publicar"])
    p.add_argument("manifesto")
    p.add_argument("--confirmar-obrigatoria", action="store_true")
    p.add_argument("--simular", action="store_true")
    a = p.parse_args()

    manifesto = carregar(a.manifesto)
    site = Path(os.environ.get("NF_SITE_DIR", SITE_PADRAO))
    if not (site / "astro.config.mjs").is_file():
        sys.exit(f"pasta do site invalida: {site}")

    manifesto["obrigatoria_confirmada"] = a.confirmar_obrigatoria
    pedido = f"/release-{a.etapa} {json.dumps(manifesto, ensure_ascii=False)}"
    comando = ["claude", "-p", "--allowedTools", FERRAMENTAS]

    if a.simular:
        print("pasta:", site)
        print("comando:", comando)
        print("pedido:", pedido)
        return
    executavel = shutil.which("claude")
    if not executavel:
        sys.exit("comando claude nao encontrado")
    comando[0] = executavel
    # O pedido vai pela entrada padrao: JSON como argumento quebra no cmd do Windows.
    sys.exit(subprocess.run(comando, cwd=site, input=pedido, text=True, encoding="utf-8").returncode)


if __name__ == "__main__":
    main()
