# gostack-desafio-01
Bootcamp RocketSeat desafio 01

Rotas
POST /projects: A rota deve receber um id e um title dentro do body. Com isso irá cadastrar um novo projeto.

GET /projects: Rota que lista todos projetos e suas tarefas;

PUT /projects/:id: A rota altera apenas o título do projeto com o id presente nos parâmetros da rota;

DELETE /projects/:id: A rota deve deletar o projeto com o id presente no parâmetro da rota;

POST /projects/:id/tasks: A rota deve receber um campo title, com isso irá armazenar essa task no projeto do Id fornecido

Para rodar a aplicação utilize:
yarn install
yarn dev
