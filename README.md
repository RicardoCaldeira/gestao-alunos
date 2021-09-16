# gestao-alunos

Configurando o ambiente. (As Configurações abaixo foram executadas em ambiente Linux, dist Ubuntu 20)

## Backend

### Java 11

```
sudo apt update
sudo apt upgrade

sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

Execute a linha abaixo para verificar se o java foi instalado adequadamente.

```
java -version
```

Se tudo ocorrer de acordo com o esperado a resposta para o comando acima será algo do tipo:

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
