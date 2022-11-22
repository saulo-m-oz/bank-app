# ngcash-fullstack
Projeto Fullstack criado para o teste técnico da NG.CASH. 

Frontend desenvolvido com NextJS, Nookies, Tailwind e Axios;

Backend desenvolvido com ExpressJS, Typeorm, Postgres, Docker, Bcrypt, JWT e Yup.

## Como buildar este projeto
Para realizar o build do projeto, faça o clone do repositório <code>main</code>. 

Com o repositório clonado, acesse o diretório <code>ngcash-fullstack</code>. Dentro do diretório, rode o comando <code>cp .env.example .env</code> para clonar
os dados do .env.example para um novo .env <b>(NECESSÁRIO PARA O DOCKER-COMPOSE)</b>.

Agora que fez o clone do <code>.env</code>, execute o comando de <code>docker network create next-app</code> para realizar o setup de uma nova network entre os containers. Feito isso, rode o comando de <code>docker compose up --build</code> e aguarde o building e inicialização de todos os containers.

Quando surgir no seu console o aviso de <code>Servidor executando em: http://localhost:8080</code>, sua aplicação estará pronta para ser utilizada acessando
<code>http://localhost:3000</code>.
