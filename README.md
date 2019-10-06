# Fancy-To Do by Eric Sudhartio

baseUrl http://localhost:3000/

# <span style='color:green'>All Requests are received in json form

## Error Response
```javascript
{
    status : Number,
    msg : String
}
```
# USERS

Request End Point: **Method POST**
```url
/users/signin  
```
## **Response**
### if the user does not have a todo list
```javascript
{
    getToken : String,
    username : String,
}
```
### if the user have a todo list
```javascript
//Response Status 200
//getData
{
    getToken : String,
    username : String,
    todoList : [
        {
            due_date : String,
            title : String,
            description : String,
            status : Boolean,
            createdAt : Date,
            todoId : String
        },
        {...},
        {...},
        {...}
    ]
}
```

Request End Point **Method POST**
```text
/users/signinG
```
## **Response**
### if the user first time login
```javascript
//Response Status 200
[
    {
        getToken : String,
        photo : String,
        name : String,
        msg : String
    }
]
//allready send message to user gmail
//Default User get
```
### if next login
``` javascript
//Response Status 200
[
    {
        serverToken : String,
        photo : String,
        name : String,
        todoList : [
            {
                due_date : String,
                title : String,
                description : String,
                status : String,
                createdAt : String,
                todoId : String
            },
            {...},
            {...}
        ]
    }
]
```
### Request End Point **Method POST**
```text
/users/signup
```
## Response
```javascript
//Response Status 201
{
    msg : String
}
//allready send message to user gmail
```

# Todos

## Request End Point **Method POST**
```text
/todos/
```
## Response
```javascript
{
    msg : String,
    data : {
        date : String,
        title : String,
        description : String
    }
}
```
## Request End Point **Method PUT**
## Response
```javascript
{
    msg : String
}
```
## Request End Point **Method DELETE**
## Response
```javascript
{
    msg : String,
}
```
