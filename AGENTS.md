# Diretrizes do Projeto - Nota Fácil Downloader (Site)

## 1. Tratamento de Links Externos e Protegidos (Claude Artifacts, Docs, etc.)
- Quando o usuário fornecer um link externo (ex: `claude.ai/artifact/...`, links protegidos por login ou Cloudflare):
  - Se a ferramenta não conseguir acessar o conteúdo diretamente pelo terminal/web, **NÃO execute buscas em massa no disco**, varreduras de arquivos recentes em outros projetos ou tentativas descontroladas de adivinhar o conteúdo.
  - **PARE IMEDIATAMENTE** e peça para o usuário copiar e colar o conteúdo ou código no chat.

## 2. Escopo Estrito de Projeto
- Nunca busque, leia ou altere arquivos de outros projetos do usuário (como `nota_facil_admin`, `0 - Nota Facil Downloader`, etc.) a menos que o usuário cite expressamente o caminho daquele projeto específico.
- Mantenha-se estritamente dentro do workspace do site.
