# gestao-alunos

##### Configurando o ambiente. (As Configurações abaixo foram executadas em ambiente Linux, dist Ubuntu 20)

## Postgres

O SGBD escolhido para hospedar as tabelas do projeto foi o Postrgres 12. Segue abaixo o passo a passo de sua intalação:

```
sudo apt update
sudo apt-get install postgresql-12
```

após concluída a instalação, acessar o postgres e atribuir uma senha ao usuario postgres

```
sudo -u postgres psql
ALTER USER postgres PASSOWRD 'postgres';
\q
```

Agora, é necessário abrir uma conexão postgres na porta 5432 e executarmos o sql do arquivo _00_postgres.sql presente em src>main>resource>migration no projeto (caso inicie a conexão em outra porta, lembre-se de atualizar a mesma no application.properties do projeto). No terminal, entre com os seguintes comandos:

```
psql -h localhost -U postgres -p 5432

CREATE DATABASE gestao_alunos;

\c gestao-alunos;

CREATE user delta LOGIN PASSWORD 'delta' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE;

CREATE SCHEMA gestao_alunos;

GRANT USAGE ON SCHEMA gestao_alunos TO delta;
GRANT ALL ON SCHEMA gestao_alunos TO delta;
```

O próximo passo agora é criar as tabelas do banco. Para isso, é necessário executar o sql V1__cria_tabelas_gestao_alunos.sql presente no mesmo diretório acima. Ainda no terminal, copie e cole o código abaixo e pressione enter

```
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
```


## Backend

### Java 11

```
sudo apt update
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

Execute a linha abaixo para verificar se o java foi instalado adequadamente.

```
java -version
```

Se tudo ocorreu de acordo com o esperado, a resposta para o comando acima será algo do tipo:

```
java version "11.0.12" 2021-07-20 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.12+8-LTS-237)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.12+8-LTS-237, mixed mode)
```

### Maven
```
sudo apt update
sudo apt install maven
```

Para verificar se a instalação, exetue:

```
mvn -version
```

A saída deve ser algo do tipo:

```
Apache Maven 3.6.3
Maven home: /usr/share/maven
Java version: 11.0.7, vendor: Ubuntu, runtime: /usr/lib/jvm/java-11-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "5.4.0-26-generic", arch: "amd64", family: "unix"
```

Para rodar o projeto, basta abrir o mesmo em sua IDE de preferência e executar o run da IDE. Lembre-se de definir a versão 11 para o JRE na mesma.

A aplicação irá subir no endereço http://localhost:8000


## Frontend

### Node.js

Para instalação do Node será utilizado o Node Version Manager (NVM), ele é uma ferramenta que permite gerenciar diferentes versões do Node.

```
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

O script do instalador nvm cria uma entrada de ambiente para o script de login do usuário atual. Você pode fazer logout e login novamente para carregar o ambiente ou executar o comando abaixo para fazer o mesmo.

```
source ~/.profile   
```

Instalar a última versão do node.js

```
nvm install node
```

### Yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install --no-install-recommends yarn yarn
```

### Rodando o frontend

Após realizar o download do projeto, acessar o diretório frontend do mesmo e executar os seguintes comandos:

```
yarn
yarn dev
```

A aplicação irá subir no endereço http://localhost:3000


#### Alguns prints da aplicação

Tela inicial
![home](https://user-images.githubusercontent.com/34627524/133669360-00006955-8a5d-4df0-aef8-ba6aeaa25697.png)

Tela de edição
![edicao](https://user-images.githubusercontent.com/34627524/133669434-2ccb53db-f854-4e31-a0c8-cc12da33fe9d.jpg)

Tela de cadastro
![cadastro](https://user-images.githubusercontent.com/34627524/133669436-c374e6a3-657b-4c39-a71e-122d49844477.png)
