# **fancy-todo**

# **Getting Started**
```
1. npm install
2. open terminal in file server
3. npm run dev
4. open terminal (new tab) in file client
5. live-server --host=localhost
6. open localhost:8080
```

# **env.template**
GOOGLE_CLIENT_ID=?  
DEFAULT_PS=?  
API_KEY_GIPHY=?  

# **List of User Routes** :

 BaseUrl  : http://localhost:3000/users  

| HTTP    | Routes       | Headers | Body                         | Description                  |
| ---     | -----        | ---     | ---                          | ---                          |
| POST    | /register    | none    | name,email, password         | Register new user            |
| POST    | /login       | none    | email,password               | Login user                   |
| POST    | /signGoogle  | none    | gooogleToken                 | Login user by google         |

# **List of Todo Routes** :

 BaseUrl  : http://localhost:3000/todos  

| HTTP    | Routes     | Headers  | Body                                 | Description                                                     |
| ---     | -----      | ---      | ---                                  | ---                                                             |
| POST    | /          | token    | name,description,dueDate,project(id) | Create new todos (authentication), project is optional          |
| GET     | /          | token    | none                                 | Get all user todos (authentication)                             |
| GET     | /:id       | token    | none                                 | Get one todo by id (authorization)                              |
| DELETE  | /:id       | token    | none                                 | Delete todo by id  (authorization)                              |
| PATCH   | /:id       | token    | status(boolean)                      | Update todo by id  (authorization)                              |
| PUT     | /:id       | token    | name,description,dueDate             | Update todo by id  (authorization)                              |


# **List of Project Routes** :

 BaseUrl  : http://localhost:3000/projects  

| HTTP    | Routes                  | Headers | Body                         | Description                                     |
| ---     | -----                   | ---     | ---                          | ---                                             |
| POST    | /                       | token   | name                         | Create Project                                  |
| GET     | /                       | token   | none                         | Get all Projects                                |
| GET     | /:projectId             | token   | none                         | Get detail one project by id (members only)     |
| GET     | /:projectId/todo/:id    | token   | none                         | Get one todo from project (members only)        |
| DELETE  | /:projectId/todo/:id    | token   | none                         | Delete todo from project (members only)         |
| PATCH   | /:projectId/todo/:id    | token   | status(boolean)              | Change status todo from project (members only)  |
| PATCH   | /:projectId/remove      | token   | member(id)                   | Remove member from project (members only)       |
| PATCH   | /:projectId/add         | token   | members(array of id)         | Add members to project (owner only)             |
| GET     | /:projectId/user        | token   | none                         | Get all users non-member (owner only)           |
| DELETE  | /:projectId             | token   | none                         | Delete project  (owner only)                    |


# **API Route**
- HTTP : 'GET'
- Route : /apis/joke/
- Authentication required
```
Status : 200
Response : 
{
    "gif": "https://media1.giphy.com/media/3oEduVTFFm0wnzXYQ0/200.gif?cid=3a3de65aecbcf97665c11b81b51be20039126331bcca25e4&rid=200.gif",
    "joke": "What do you call a careful wolf? Aware wolf."
}
```
```
API : 
- Giphy
- icanhazdadjoke 
```
---

# **DETAIL**
 BaseUrl  : http://localhost:3000

# User Routes

## Register
- HTTP : POST
- Route : '/users/register'
```
Data : 
{
    "name": "admin",
    "email": "admin@mail.com",
    "password": "123456"
}
```
```
Status : 201
Response :
{
    "message": "Your account success created",
    "_id": "5d9a7e92f47f5c2f7c905d9d",
    "name": "admin",
    "email": "admin@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDlhN2U5MmY0N2Y1YzJmN2M5MDVkOWQiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTcwNDA2MDM0fQ.9LuS_lfvKz-1mwCvo4cGzriOayZgiZ6HypIiOxEkxNk"
}
```

## Log In
- HTTP : POST
- Route : '/users/signin'
```
Data : 
{
    "email": "admin@mail.com",
    "password": "123456"
}
```
```
Status : 200
Response :
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDlhN2U5MmY0N2Y1YzJmN2M5MDVkOWQiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTcwNDA2OTUyfQ.cdydzvt82AFfRmTi4EER_bK5MzaOD5QO0Mf01PJiiHU",
    "_id": "5d9a7e92f47f5c2f7c905d9d"
}
```


# Todo Routes
Todo routes require authentication which need token from headers
```
Headers : {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDlhN2U5MmY0N2Y1YzJmN2M5MDVkOWQiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTcwNDA2OTUyfQ.cdydzvt82AFfRmTi4EER_bK5MzaOD5QO0Mf01PJiiHU"
}
```

## Create Todo
- HTTP : 'POST
- Route : '/todos/'
```
Data :
{
    "name": "Create fancy todo",
    "description": "server and client",
    "dueDate": "10-07-2019"
}
```
```
Status : 201
Response :
{
    "message": "Success create new todo",
    "newTodo": {
        "status": false,
        "_id": "5d9a83b0d74ae6340745cc86",
        "name": "Create fancy todo",
        "description": "server and client",
        "dueDate": "2019-10-06T17:00:00.000Z",
        "user": "5d9a7e92f47f5c2f7c905d9d",
        "createdAt": "2019-10-07T00:15:44.135Z",
        "updatedAt": "2019-10-07T00:15:44.135Z"
    }
}
```

## Change Status Todo
- HTTP : 'PATCH'
- Route : '/todos/:id'
```
Data :
{
    "status": true
}
```
```
Status: 200
Response: 
{
    "message": "Success change status to true"
}
```

## Edit Todo
- HTTP : 'PUT'
- Route: '/todos/:id'
```
Data :
{
    "name": "Create Read.me",
    "description": "but more detail",
    "dueDate": "10-10-2019"
}
```
```
Status: 200
Response: 
{
    "message": "Success updated"
}
```

## Get Todo
- HTTP : 'GET'
- Route: '/todos/:id'
```
Status : 200
Response : 
{
    "message": "Here's your todo",
    "todo": {
        "status": null,
        "_id": "5d9a8f9767847235ce9b79d8",
        "name": "Create Read.me",
        "description": "but more detail",
        "dueDate": "2019-10-09T17:00:00.000Z",
        "user": "5d9a7e92f47f5c2f7c905d9d",
        "createdAt": "2019-10-07T01:06:31.785Z",
        "updatedAt": "2019-10-07T01:09:59.428Z"
    }
}
```

## Get All Todos
- HTTP : 'GET'
- Route: '/todos/'
```
Status : 200
Response :
{
    "message": "Here is your todo :",
    "todos": [
        {
            "status": false,
            "_id": "5d9a83b0d74ae6340745cc86",
            "name": "Create fancy todo",
            "description": "server and client",
            "dueDate": "2019-10-06T17:00:00.000Z",
            "user": "5d9a7e92f47f5c2f7c905d9d",
            "createdAt": "2019-10-07T00:15:44.135Z",
            "updatedAt": "2019-10-07T00:15:44.135Z"
        },
        {
            "status": true,
            "_id": "5d9a8f9767847235ce9b79d8",
            "name": "Create Read.me",
            "description": "but more detail",
            "dueDate": "2019-10-09T17:00:00.000Z",
            "user": "5d9a7e92f47f5c2f7c905d9d",
            "createdAt": "2019-10-07T01:06:31.785Z",
            "updatedAt": "2019-10-07T01:09:59.428Z"
        }
    ]
}
```



# Project Routes


## Create Project
- HTTP : 'POST'
- Route : /projects/
```
Data : 
{
    "name" : "Happy Me"
}
```
```
Status : 200
Response :
{
    "project": {
        "members": [],
        "_id": "5d9a921d67847235ce9b79d9",
        "name": "Happy Me",
        "owner": "5d9a7e92f47f5c2f7c905d9d",
        "createdAt": "2019-10-07T01:17:17.094Z",
        "updatedAt": "2019-10-07T01:17:17.094Z"
    }
}
```


## Get All Projects
- HTTP : 'GET'
- Route : /projects/
```
Status : 200
Response :
[
    {
        "members": [],
        "_id": "5d9a921d67847235ce9b79d9",
        "name": "Happy Me",
        "owner": {
            "_id": "5d9a7e92f47f5c2f7c905d9d",
            "name": "admin",
            "email": "admin@mail.com"
        },
        "createdAt": "2019-10-07T01:17:17.094Z",
        "updatedAt": "2019-10-07T01:17:17.094Z"
    }, ...
]
```

## Create Todo In Projects
- HTTP : 'POST
- Route : '/todos/'
```
Data :
{
    "name": "Create fancy todo",
    "description": "server and client",
    "dueDate": "10-07-2019",
    "project": "5d9a921d67847235ce9b79d9"
}
```
```
Status : 201
Response :
{
    "message": "Success create new todo",
    "newTodo": {
        "status": false,
        "_id": "5d9a932b67847235ce9b79da",
        "name": "Eat Breakfast",
        "description": "stay healthy",
        "dueDate": "2019-10-02T17:00:00.000Z",
        "user": "5d9a7e92f47f5c2f7c905d9d",
        "project": "5d9a921d67847235ce9b79d9",
        "createdAt": "2019-10-07T01:21:47.988Z",
        "updatedAt": "2019-10-07T01:21:47.988Z"
    }
}
```



## Get Details Project
- HTTP : 'GET'
- Route : /projects/:projectId
- Member authorization required
```
Status : 200
Response :
{
    "project": {
        "members": [],
        "_id": "5d9a921d67847235ce9b79d9",
        "name": "Happy Me",
        "owner": {
            "_id": "5d9a7e92f47f5c2f7c905d9d",
            "name": "admin",
            "email": "admin@mail.com"
        },
        "createdAt": "2019-10-07T01:17:17.094Z",
        "updatedAt": "2019-10-07T01:17:17.094Z"
    },
    "todos": [
        {
            "status": false,
            "_id": "5d9a932b67847235ce9b79da",
            "name": "Eat Breakfast",
            "description": "stay healthy",
            "dueDate": "2019-10-02T17:00:00.000Z",
            "user": {
                "_id": "5d9a7e92f47f5c2f7c905d9d",
                "name": "admin",
                "email": "admin@mail.com"
            },
            "project": "5d9a921d67847235ce9b79d9",
            "createdAt": "2019-10-07T01:21:47.988Z",
            "updatedAt": "2019-10-07T01:21:47.988Z"
        }
    ]
}
```


## Get One Todo In Project
- HTTP : 'GET'
- Route : /projects/:projectId/todo/:id
- Member authorization required
```
Status : 200
Response :
{
    "message": "Here's your todo",
    "todo": {
        "status": false,
        "_id": "5d9a932b67847235ce9b79da",
        "name": "Eat Breakfast",
        "description": "stay healthy",
        "dueDate": "2019-10-02T17:00:00.000Z",
        "user": "5d9a7e92f47f5c2f7c905d9d",
        "project": "5d9a921d67847235ce9b79d9",
        "createdAt": "2019-10-07T01:21:47.988Z",
        "updatedAt": "2019-10-07T01:21:47.988Z"
    }
}
```

## Change Todo Status In Project
- HTTP : 'PATCH'
- Route : /projects/:projectId/todo/:id
- Member authorization required
```
Data : {
    status : true
}
```
```
Status : 200
Response : 
{
    "message": "Success change status to true"
}
```

## Delete Todo In Project
- HTTP : 'Delete'
- Route : /projects/:projectId/todo/:id
- Member authorization required
```
Status : 200
Response : 
{
    "message": "Success deleted"
}
```

## Add Member 
- HTTP: 'PATCH'
- Route:  /projects/:projectId/add
- Owner authorization required
```
Data :
{
    "members": ["5d984a629c513e53d82466a1","5d99f62561cd87197dd57645"]
}
```
```
Status : 200
Response :
{
    "project": {
        "members": [
            "5d984a629c513e53d82466a1",
            "5d99f62561cd87197dd57645"
        ],
        "_id": "5d9a921d67847235ce9b79d9",
        "name": "Happy Me",
        "owner": "5d9a7e92f47f5c2f7c905d9d",
        "createdAt": "2019-10-07T01:17:17.094Z",
        "updatedAt": "2019-10-07T01:17:17.094Z"
    },
    "newMembers": [
        "5d984a629c513e53d82466a1",
        "5d99f62561cd87197dd57645"
    ]
}
```

## Remove Member
- HTTP: 'PATCH'
- Route:  /projects/:projectId/remove
- Member authorization required
```
Data :
{
    "member": "5d984a629c513e53d82466a1"
}
```
```
Status : 200
Response : 
{
    "message": "Success remove member"
}
```

## Get All User Non Member
- HTTP: 'GET'
- Route:  /projects/:projectId/user
- Owner authorization required
```
Status : 200
Response :
{
    "listuser": [
        {
            "_id": "5d984a629c513e53d82466a1",
            "name": "coba",
            "email": "coba@mail.com",
            "password": "$2a$10$Mm0/YS2Wm3j42XhQaoUD5eqRFHPw5VU8jmWFP/hsg1zIS9XTMGCWS",
            "createdAt": "2019-10-05T07:46:42.246Z",
            "updatedAt": "2019-10-05T07:46:42.246Z"
        },
        {
            "_id": "5d99f59761cd87197dd57643",
            "name": "luffy cat",
            "email": "masterluffyton@gmail.com",
            "password": "$2a$10$hdGq5s33iaA8RcAlJT9nIeppXt3ewHpBtog4Jx6zWweESRzBkQXpO",
            "createdAt": "2019-10-06T14:09:27.283Z",
            "updatedAt": "2019-10-06T14:09:27.283Z"
        },...
    ]
}
```

## Delete Project
- HTTP: 'DELETE'
- Route:  /projects/:projectId
- Owner authorization required
```
Status : 200
Response :
{
    "message" : "Success delete project"
}
```