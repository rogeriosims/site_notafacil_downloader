-- Registro de envios de comunicado por versao (fluxo 8iNFZ03A0rtX9Y1q).
-- Tabela separada: nao acrescentar coluna em nota_facil_clientes, que o n8n grava com mapeamento automatico.
CREATE TABLE IF NOT EXISTS comunicado_envios (
    versao       text        NOT NULL,
    email        text        NOT NULL,
    status       text        NOT NULL CHECK (status IN ('enviado', 'erro')),
    detalhe      text,
    atualizado_em timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (versao, email)
);
