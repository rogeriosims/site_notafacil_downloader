export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy para o Webhook do n8n (mesma origem, zero erro de CORS)
    if (url.pathname === '/api/cadastro' || url.pathname === '/api/cadastro/') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.text();
          const n8nResponse = await fetch('https://n8n.rockethub.com.br/webhook/17e601cd-2655-410f-b8af-4ffffd07bec0', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: body
          });

          const responseText = await n8nResponse.text();
          return new Response(responseText, {
            status: n8nResponse.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({
            status: 'error',
            message: 'Instabilidade na comunicação com o servidor de cadastro.'
          }), {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      }
    }

    // Servir arquivos estáticos do Astro
    return env.ASSETS.fetch(request);
  }
};
