-- psql -h localhost -U postgres -p 5431

CREATE DATABASE gestao_alunos;

-- \c gestao-alunos;

CREATE user delta LOGIN PASSWORD 'delta' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE;

CREATE SCHEMA gestao_alunos;

GRANT USAGE ON SCHEMA gestao_alunos TO delta;
GRANT ALL ON SCHEMA gestao_alunos TO delta;