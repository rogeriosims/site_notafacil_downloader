import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function cleanMarkdown(md: string): string {
  return md
    // Remove markdown images: ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Convert links to text: [text](url) -> text (url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Normalize blank lines (max 2 consecutive newlines)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog'))
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const baseUrl = context.site ? context.site.origin : 'https://notafacildownloader.contabilcert.com.br';

  const header = `# Nota Fácil Downloader — Blog Fiscal: Conteúdo Completo
> Versão de texto integral para indexação por LLMs e sistemas RAG.
> Fonte canônica: ${baseUrl}/blog
> Gerado em: ${new Date().toISOString().split('T')[0]}

---

`;

  const articlesContent = posts.map(p => {
    const rawBody = p.body || '';
    const cleanBody = cleanMarkdown(rawBody);
    
    const pubDateStr = p.data.pubDate ? p.data.pubDate.toLocaleDateString('pt-BR') : '';

    return `## ${p.data.title}
**URL:** ${baseUrl}/blog/${p.id}
**Data:** ${pubDateStr}
**Autor:** ${p.data.author || 'Nota Fácil'}
**Resumo:** ${p.data.description || ''}
**Tags:** ${(p.data.tags || []).join(', ')}

${cleanBody}

---
`;
  }).join('\n');

  const fullContent = header + articlesContent;

  return new Response(fullContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex', // Evita indexação duplicada no Google, mas acessível para LLMs
    },
  });
};
