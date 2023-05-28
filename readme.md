# ![COFFEIN]<img width="50" src="./public/index.png" alt="display-documentation"> **COFFEEIN**

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
<br>

---

# **Introduction**

Coffeein is a website for ordering coffee.

---

## 𓆙 Table of Contents

- [Introduction](#Introduction)
- [Table of Contents](#𓆙-Table-of-Contents)
- [Requirement](#𓆙-Requirement)
- [Installation](#)
  - [Windows](#𓆙-Windows-Installation)
  - [Linux](#𓆙_Linux_Installation)
- [How to run](#𓆙-How-to-run)
- [Route](#𓆙-Documentation-Postman)
- [Documentation Postman](#𓆙-Documentation-Postman)
- [Related Project](#𓆙-Related-Project)
- [Contributor](#𓆙-Contributors)

## 𓆙 Requirement

This repo require a [NodeJS](https://nodejs.org/)

[ENV](#ENV) File

## 𓆙 Windows Installation

First of all, you need to install [Git](https://git-scm.com/download/win) & [NodeJS](https://nodejs.org/). Then open your git bash, and follow this:<br>

```sh
$ git clone https://github.com/redhadefinto/coffe_shop_be
$ cd Coffeein-be
$ code .
$ npm i
```

## 𓆙 Linux Installation

```sh
$ apt-get update
$ apt-get install git-all
$ apt-get install nodejs-current
$ git clone https://github.com/redhadefinto/coffe_shop_be
$ cd coffeein-be
$ code .
$ npm i
```

## 𓆙 How to run

1. Install file using [WINDOWS](#Windows-Installation) OR [LINUX](Linux-Installation)

2. Add .env file at root folder, and add following

```sh
DB_HOST = ""
DB_NAME = ""
DB_PORT = ""
DB_USER = ""
DB_PWD = ""
SERVER_PORT = ""

JWT_SECRET = ""

MONGO_PWD = ""

MONGO_DBNAME = ""
MONGO_HOST = ""
MONGO_USER = ""

CLOUD_NAME =  ""
CLOUD_KEY = ""
CLOUD_SECRET = ""
```

3. Starting application

```sh
$ npm run dev
```

## 𓆙 Route

| Endpoint             |    Method    | Info         | Remark                               |
| -------------------- | :----------: | :----------- | :----------------------------------- |
| /auth                |    `POST`    | Auth         | Login                                |
| /auth/logout         |   `PATCH`    | Auth         | LOGOUT                               |
| /auth/register       |    `POST`    | Auth         | Register                             |
| /auth                |   `PATCH`    | User         | Change Password                      |
| /auth/otp            |   `PATCH`    | User         | get otp                              |
| /auth/forgot         |   `PATCH`    | User         | fotgot password                      |
| /transactions/admin  |    `GET`     | Transactions | History transactios all users(admin) |
| /transactions        |    `GET`     | Transactions | History Transaction                  |
| /transactions        |    `POST`    | Transactions | Create Transaction                   |
| /transactions        |   `DELETE`   | Transactions | Delete Transaction                   |
| /transactions        |   `PATCH`    | Transactions | status Transaction done (admin)      |
| /products            | `POST` `GET` | Products     | Create and See Products              |
| /products/promo      |    `POST`    | Products     | Create product with prom             |
| /products/:id        |    `GET`     | Products     | Get detail product                   |
| /products/promo/:id  |    `GET`     | Products     | Get detail product With promo        |
| /products/:productId |   `PATCH`    | Products     | Edit product                         |
| /products/promo/:id  |   `PATCH`    | Products     | Edit product with promo              |
| /products/:id        |   `DELETE`   | Products     | Delete product                       |
| /promo               |    `GET`     | Promo        | Get all Promo                        |
| /promo/:id           |    `GET`     | Promo        | Get Detail promo                     |
| /promo               |    `POST`    | Promo        | Create promo                         |
| /promo/:id           |   `PATCH`    | Promo        | Edit Promo                           |
| /promo/:id           |   `DELETE`   | Promo        | Delete Promo                         |
| /profile             |    `GET`     | Profile      | Get Profile                          |
| /profile             |   `PATCH`    | Profile      | Edit Profile                         |

## 𓆙 Documentation Postman

Click here [POSTMAN](https://documenter.postman.com/preview/22450553-e364f8b6-386f-4613-aa1e-dc3c1947392f?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=light&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37)

Download json [POSTMAN](https://api.postman.com/collections/22450553-e364f8b6-386f-4613-aa1e-dc3c1947392f?access_key=PMAT-01H1GPA58D131ER8ZB19W3ZWZ2)

<BR>
<BR>

## 𓆙 Related-Project

- [FRONT-END](https://coffe-shop-fullstack.vercel.app/)
- [BACK-END](https://coffe-shop-gamma.vercel.app/)

## 𓆙 Contributor

  <table>
    <tr>
      <td >
        <a href="https://github.com/redhadefinto">
          <img width="100" src="https://avatars.githubusercontent.com/u/66767762?s=400&u=00ad08bd394a1ba0fe65d9b61cbef4245df96fb4&v=4" alt=""><br/>
          <center><sub><b>Redha Definto </b></sub></center>
        </a>
        </td>
    </tr>
  </table>
<h1 align="center"> THANK FOR YOUR ATTENTION </h1>
