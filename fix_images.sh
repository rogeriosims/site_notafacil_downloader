#!/bin/bash
BLOG_DIR="/mnt/c/Users/Rogerio/Documents/Projetos/site_notafacil_downloader/src/content/blog"

for f in "$BLOG_DIR"/*.md; do
  sed -i 's|image: "/blog/imagens/|image: "../../assets/blog/imagens/|g' "$f"
done

echo "=== Resultado ==="
grep "image:" "$BLOG_DIR"/*.md
