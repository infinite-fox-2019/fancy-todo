# fancy-todo

Fancy To-Do Built With Express, MongoDB, and Mongoose

## REST API Documentation

#### List of To-Do routes:

| Route     | HTTP   | Header(s) | Body                                               | Description                              |
| --------- | ------ | --------- | -------------------------------------------------- | ---------------------------------------- |
| /todo     | GET    | `token`   | `none`                                             | Get All To-Dos From Logged User          |
| /todo/:id | GET    | `token`   | `none`                                             | Get A Specific To-Do From Logged User    |
| /todo     | POST   | `token`   | title: string, description: string, status: string | Create A To-Do For Logged User           |
| /todo/:id | PATCH  | `token`   | title: string, description: string, status: string | Update A Specific To-Do From Logged User |
| /todo/:id | DELETE | `token`   | `none`                                             | Delete A Specific To-Do From Logged User |

### Find All To-Dos

| URL              | http://localhost:3000/todo                                   |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `none`                                                       |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200`,  [<br/>  {<br/>    "id": 1,<br/>    "title": "Make bed",<br/>    "description": "Before 6:30",<br/>    "status": false, <br/>    "user_id": 1,<br/>  }<br/>] |
| Error Response   | `status: 404`, Message: "To-Do List Not Found"               |
| Error Response 2 | `status: : 401`, Message:  "You Must Sign In First"          |

### Get A Specific To-Do

| URL              | http://localhost:3000/todo                                   |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `id: integer`                                                |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , {<br/>  "id": 1,<br/>  "title": "Make Bed",<br/>  "description": "Before 6:30",<br/>  "status": true<br/>} |
| Error Response   | `status: 401`, Message: 'You Must  Sign In First'            |
| Error Response 2 | `status: 404`, Message: 'To Do Not Found'                    |

### Create A To-Do

| URL              | http://localhost/3000/todo                                   |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `token: string`                                              |
| Data             | `status: 201` , Content: {<br/>  "id": 1,<br/>  "title": "Make bed",<br/>  "description": "Before 6:30",<br/>  "status": false<br />  "user_id": 2,<br/> } |
| Success Response |                                                              |
| Error Response   | `status: 401`, Message: 'You Must Sign In First'             |
| Erro Response 2  | `status: 401`, Message: 'To Do Created Unsuccessful'         |

### Update Specific To-Do

| URL              | https://localhost:3000/todo/:id                              |
| ---------------- | ------------------------------------------------------------ |
| Method           | `PATCH`                                                      |
| Params           | `id: integer`                                                |
| Headers          | `token: string`                                              |
| Data             | `title: string, description: string, status: boolean`        |
| Success Response | `status: 200` , Content: {   "Message": "To Do Successfully Updated!" } |
| Error Response 1 | `status:401` , Content: "You must sign in first!"            |
| Error Response 2 | `status:404` , Content: "To Do Updated Unsuccessful"         |

###  Delete Specific To-Do

| URL              | https://localhost:3000/todos/:id                             |
| ---------------- | ------------------------------------------------------------ |
| Method           | `DELETE`                                                     |
| Params           | `id: integer`                                                |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , Content: {   "message": "To Do Successfully Deleted!" } |
| Error Response 1 | `status:401` , Content: "You must sign in first!"            |
| Error Response 2 | `status:404` , Content: "To Do Deleted  Unsuccessful"        |

### List Of User Sign-In And Sign-Up Routes

| **Route**       | **HTTP** | **Header(s)** | **Body**                                             | **Description**                                     |
| --------------- | -------- | ------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `/register`     | POST     | `none`        | `username: string,  email: string, password: string` | Sign Up With New User Info                          |
| `/login`        | POST     | `none`        | `email: string, password: string`                    | Sign In To Get An Access Token Based On Credentials |
| `/logout`       | GET      | `none`        | `none`                                               | Sign Out                                            |
| `/googleSignIn` | POST     | `none`        | `id_token: string`                                   | Sign In By Google                                   |

## Usage

Make sure you have Node.js and NPM installed in your computer, and then run these commands:

```
$ git clone https://github.com/AudrickOng/fancy-todo.git
$ cd fancy-todo
$ npm install
$ npm run dev
```

