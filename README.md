# Laravel | React Websockets - Pusher (Real time updates)

Projeto desenvolvido com intuito de testar a funcionalidade de Websockets do Laravel, que nesse caso foi desenvolvido com Pusher.

Para rodar o projeto corretamente, é necessário seguir os requisitos e passos de cada projeto **(Frontend + Backend)**

Também deixei export do Insomnia, para requisições na API em caso de necessidade.

# Requisitos + Instalação # Back-End

- Configurar .env **(Conforme .env.example)**
- Redis
- MySQL
- [Pusher + Setup Tokens](https://pusher.com/docs/channels/getting_started/javascript/)

```
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
```

- Instalação dependências composer (`composer install`)

**Steps para funcionar**

- Gera key do app

```
php artisan key:generate
```

- Cria tabelas

```
php artisan migrate
```

- Necessário para processar eventos

```
php artisan queue:listen
```

- Sobe servidor de desenvolvimento

```
php artisan serve
```

# Requisitos + Instalação # Front-End

- Configurar .env **(Conforme .env.example)**
- Yarn/NPM

```
REACT_APP_PUSHER_APP_KEY=PUSHER_APP_KEY
```

**Steps para funcionar**

- Baixa dependências

```
yarn | npm install
```

- Roda o projeto

```
yarn start | npm start
```
