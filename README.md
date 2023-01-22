# API 

## Armazenar informações de contato e as mensagens

Foi solicitado que criasse uma API para armazenar as informações de contatos e suas respectivas mensagens fazendo uma integração com  site no qual emule o funcionamento do whatsApp.

A API foi criada com arquitetura REST e para garantir a performance foi utilizada programação assíncrona.

**Descrição do que foi implementado**

1. Foi criado um banco dados chamado `saltsystem` com as tabelas descritas abaixo e todo código de criação das tabelas foi colocado no arquivo `dump.sql`

a) Tabela `contacts` com os campos:

- id - identificador único do usuário como chave primaria e auto incremento
- name - (obrigatório)
- phone_number - (obrigatório)

b) Tabela `messages` com os campos:
- id - identificador único do usuário como chave primaria e auto incremento
- user_id - chave estrangeira que faz referencia com o campo id da tabela `contacts`
- message
- data_message - que pega a hora/data da mesagem enviada por default

2 - Para a entidade `contacts` foi implementado as seguintes funcionalidades.

a) Cadastro de um novo contato 
###### `POST` `/contacts`
Essa é a rota que será utilizada para cadastrar um novo contato no sistema.

- **Requisição**
Sem parâmetros de rota ou de query.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- name
- phone_number

- **Resposta**  
    Em caso de **sucesso**, é enviado no corpo (body) da resposta o conteúdo do contato cadastrado, incluindo seu respectivo `id`.
    Em caso de **falha no cadastro**,  possuii um **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** e no seu valor um texto explicando o motivo da falha.

    #### **Exemplo de requisição**

```javascript
// POST /contacts
{
    "name": "Dora Aventureira",
    "phone_number": 61999999999
}
```
#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "name": "Dora Aventureira",
    "phone_number": 61999999999
}
```
b) Listar todos os contatos
###### `GET` `/contacts`
Essa é a rota que será utilizada para listar todos os contatos no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o contatos encontrado, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado. 

#### **Exemplo de requisição**

```javascript
// GET /contacts
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "name": "Dora Aventureira",
    "phone_number": 61999999999
}
```

C) Detalhar um contato
###### `GET` `/contacts/:id`
Essa é a rota que será utilizada para detalhar apenas um contato do sistema.
**Atenção!:** Deve-se infromar o ID no parâmetro de rota.

- **Requisição**  
    Parâmetro de rota, informando o ID do contato correspondente.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o contato encontrado, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /contacts/1
// Sem conteúdo no corpo (body) da requisição
```
#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "name": "José",
    "phone_number": 61999999999
}
```
3 - Para a entidade `messages` foi implementado as seguintes funcionalidades.

a)Cadastrar uma nova mensagem
###### `POST` `/messages`
Essa é a rota que será utilizada para cadastrar um novo contato no sistema.

- **Requisição**
Sem parâmetros de rota ou de query.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- user_id
- message

- **Resposta**  
    Em caso de **sucesso**, é enviado no corpo (body) da resposta o conteúdo do contato cadastrado, incluindo seu respectivo `id`.
    Em caso de **falha no cadastro**,  possuii um **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** e no seu valor um texto explicando o motivo da falha.

```javascript
// POST /messages
{
	"user_id": 1,
	"message": "Olá, tudo bem?"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"user_id": 1,
		"message": "Olá, tudo bem?",
		"data_message": "2023-01-22T00:43:43.959Z"
	}
]
```

b) Listar todos as mensagens
###### `GET` `/messages`
Essa é a rota que será utilizada para listar todas as mesnagens no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o contatos encontrado, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.

#### **Exemplo de requisição**

```javascript
// GET /messages
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
		"id": 3,
		"user_id": 2,
		"message": "Olá, tudo bem"
    }
]
```

C) Detalhar uma mensagem
###### `GET` `/messages/:user_id`
Essa é a rota que será utilizada para detalhar mensagens de um contato específico no sistema.
**Atenção!:** Deve-se infromar o ID do contato no parâmetro de rota.

- **Requisição**  
    Parâmetro de rota, informando o ID do contato correspondente.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o contato encontrado, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /messages/1
// Sem conteúdo no corpo (body) da requisição
```
#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"name": "Dora Aventureira",
		"phone_number": "61993478418",
		"id": 1,
		"user_id": 1,
		"message": "Olá, tudo bem?",
		"data_message": "2023-01-22T00:42:00.392Z"
	},
	{
		"name": "Dora Aventureira",
		"phone_number": "61993478418",
		"id": 2,
		"user_id": 1,
		"message": "O que vamos fazer nesse fim de semama?",
		"data_message": "2023-01-22T00:43:43.959Z"
	}
]
```
---
# Tecnologias utilizadas

- Arquitetura API REST
- Linguagem: 
JavaScript

- Servidor: 
Foi utilizado o Node.Js e Express

- Banco de dados: 
Foi utilizado banco relacional PostgresSql juntamente com o knex para fazer configuração de conexão

- Variáveis de ambiente:
Foi utilizado o dotenv para criação das variáveis.  
