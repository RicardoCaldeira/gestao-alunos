CREATE TABLE gestao_alunos.endereco(
	id serial NOT NULL,
	logradouro varchar(100) NOT NULL,
	numero integer NULL,
	bairro varchar(30) NOT NULL,
	cidade varchar(30) NOT NULL,
	estado varchar(30) NOT NULL,
	complemento varchar(30) NULL,
    CONSTRAINT pk_endereco PRIMARY KEY (id)
);
COMMENT ON TABLE gestao_alunos.endereco IS 'Tabela que armazena os endereços relacionados aos alunos';

COMMENT ON COLUMN gestao_alunos.endereco.id IS 'Identificador único da entidade.';
COMMENT ON COLUMN gestao_alunos.endereco.logradouro IS 'Nome da rua onde o aluno reside.';
COMMENT ON COLUMN gestao_alunos.endereco.numero IS 'Número da casa onde o aluno reside.';
COMMENT ON COLUMN gestao_alunos.endereco.bairro IS 'Nome do bairro onde o aluno reside.';
COMMENT ON COLUMN gestao_alunos.endereco.cidade IS 'Nome da cidade onde o aluno reside.';
COMMENT ON COLUMN gestao_alunos.endereco.estado IS 'Nome do estado onde o aluno reside.';
COMMENT ON COLUMN gestao_alunos.endereco.complemento IS 'Informações complementares sobre o endereço do aluno.';

CREATE SEQUENCE gestao_alunos.seq_endereco
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 1000
	START 1;

ALTER TABLE gestao_alunos.endereco ALTER COLUMN id SET DEFAULT nextval('gestao_alunos.seq_endereco'::regclass);
ALTER SEQUENCE gestao_alunos.seq_endereco OWNER TO postgres;

ALTER TABLE gestao_alunos.endereco OWNER TO postgres;
GRANT ALL ON TABLE  gestao_alunos.endereco TO postgres;
GRANT SELECT, UPDATE ON SEQUENCE  gestao_alunos.seq_endereco TO postgres;
--GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE  sout.reducao_criticidade TO sout_pa;

-------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE gestao_alunos.aluno(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	id_endereco integer NOT NULL,
    CONSTRAINT pk_aluno PRIMARY KEY (id),
    CONSTRAINT fk_al_endereco FOREIGN KEY (id_endereco) REFERENCES gestao_alunos.endereco(id)
);
COMMENT ON TABLE gestao_alunos.aluno IS 'Tabela que armazena os alunos cadastrados';

COMMENT ON COLUMN gestao_alunos.aluno.id IS 'Identificador único da entidade.';
COMMENT ON COLUMN gestao_alunos.aluno.nome IS 'Nome do aluno.';
COMMENT ON COLUMN gestao_alunos.aluno.id_endereco IS 'Endereço relacionado ao aluno.';

CREATE SEQUENCE gestao_alunos.seq_aluno
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 1000
	START 1;

ALTER TABLE gestao_alunos.aluno ALTER COLUMN id SET DEFAULT nextval('gestao_alunos.seq_aluno'::regclass);
ALTER SEQUENCE gestao_alunos.seq_aluno OWNER TO postgres;

ALTER TABLE gestao_alunos.aluno OWNER TO postgres;
GRANT ALL ON TABLE  gestao_alunos.aluno TO postgres;
GRANT SELECT, UPDATE ON SEQUENCE  gestao_alunos.seq_aluno TO postgres;
--GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE  sout.reducao_criticidade TO sout_pa;

-------------------------------------------------------------------------------------------------------------------------------------