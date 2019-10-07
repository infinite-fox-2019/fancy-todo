# fancy-todo

## User Routes Guide

| Route | HTTP | Request | Response |
|--|--|--|--|
|'/users/register' | GET | username: String (required) <br> email: String (required, Must be email format)<br>password: String(required) | *Success : 201*<br>*error : Internal server error* |
| '/users/login | POST | username: String (required) <br> password: String(required) | *Success : 201* <br> *error : Internal server error* |
| '/users/gsignin' | POST | (required data from user Google Account) | *Success : 200*<br>*error : Internal Server error* |

## Todo Routes Guide

| Route | HTTP | Request | Response |
|--|--|--|--|
|'/todos/' | GET | (required Authentification) | *Success : 200* <br> *error : Internal Server Error* |
| '/todos/' | POST | title: String (required) <br> description: String (optional) | *Success : 201 <br> error : Internal Server Error* | 
|'/todos/:id/delete' | DELETE | (required id Authentification) | *Success : 201 <br> error : Internal Server Error* |
|'/todos/:id/update' | PUT |(required id Authentification) | *Success : 201 <br> error : Internal Server Error* |
|'/todos/:id/updatestatus | PUT | (required id Authentification) | *Success : 201 <br> error : Internal Server Error* |

## Command

Run this command on Server
```
$ npm install
$ npm run dev
```
Run this command on Client
```
$ live-server --host=localhost
```

## Server 
```
http://localhost:3002
```
## Client
```
http://localhost:8080
```


