#### API DOCUMENTATION

###### aldinofrizal - FANCY TODO


### Register a new user, using app auth

> #### POST /user/register

```javascript
app.post('/user/register')
```

require body : name(string), email(string), password(string)

if one or more body field is not filled, will trigger an error

```json
{
  "err": "user validation failed: name: name is required"
}

{
  "err": "user validation failed: email: email is required"
}

{
  "err": "user validation failed: name: name is required, email: email is required"
}
```

if not, this call will return a new user object, and body data saved to database as a new user

```json
{
  "_id": "5d9771dcb4ce797984e442cb",
  "name": "omjon",
  "email": "omjon@gmail.com",
  "password": "omjon",
  "__v": 0
}
```



### Login using app auth

> #### POST /user/login

```javascript
app.post('/user/login')
```

require body : email(string) and password(string)

this call will return an error if there is no user has a same email with input body email, or email and password combination did not match

```json
{
  "err": "wrong email/password!!"
}

{
  "err": "user not found"
}
```

and will return a token which will be passed to client

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxkaW5vIiwiZW1haWwiOiJhbGRpbm9AZ21haWwuY29tIiwiaWF0IjoxNTcwMjA2NDE1fQ.j6HKbsTNPbj3pTXZzUf1oDy9JyQSvaR94r9hW2Rxs6c"
}
```



### Get user data

> #### GET /user

this call will return a user data, including user's todo as an array. This call require a token as a headers this call will check your authentication using your token. If token is authenticated then data will be returned. 

```json
{
  "todo": [
    {
      "createdAt": "2019-10-04T17:31:19.347Z",
      "_id": "5d978281f29dfc0b19d5b80a",
      "activity": "create fancy todo",
      "description": "create app using mongoose and mongodb as database, express as app framework and jquery as dom",
      "__v": 0
    },
    {
      "createdAt": "2019-10-04T17:19:55.823Z",
      "_id": "5d977fe56e50a809a326a214",
      "activity": "learn mongoose",
      "description": "create fancy todo to practice mongoose concept",
      "__v": 0
    }
  ],
  "_id": "5d977fc66e50a809a326a213",
  "name": "omjon",
  "email": "omjon@gmail.com",
  "password": "omjon",
  "__v": 0
}
```

if your token is not authenticated, this call will return an error object

```json
{
  "err": "you are not authenticated, please log in!"
}
```





once you logged in, there will be a token in your browser local storage, which can help you to do some magic with this app!

### Create to do list

> #### POST /todo/create

this call will check your authentication using your token (send as a headers)  , and if your token is authenticated, then a to do will be added to your data in database. This call require two body input, activity(string) and description(string)

if one or both body input is not filled, then an error will be triggered,

```javascript
{
  "err": "todo validation failed: description: you must fill the description form"
}
```

and a success response :

```javascript
{
  "msg": "success added list to YOUR_USER_NAME"
}
```





### Get to do list from specific user

> #### GET /todo/find

this call will check your authentication using your token (send as a headers) , if your token is authenticated this call will return an array of object of todo from a specific user. 

```json
[
  {
    "createdAt": "2019-10-05T13:28:07.643Z",
    "status": false,
    "_id": "5d98abc975428d70e6021971",
    "activity": "Test ui fancy todo",
    "description": "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
    "due_date": "2019-10-17T00:00:00.000Z",
    "userId": "5d985a8418c49f37ef9cb1a2",
    "__v": 0
  },
  {
    "createdAt": "2019-10-05T11:13:00.034Z",
    "status": false,
    "_id": "5d987b604b39b45ca308385a",
    "activity": "Semoga sudah berhasil",
    "description": "aamiin",
    "due_date": "2019-12-31T00:00:00.000Z",
    "userId": "5d985a8418c49f37ef9cb1a2",
    "__v": 0
  }
]
```

and if your token is not authenticated this call will return an error





### Delete to do from your user data

> ### PATCH /user/delete

this call will check your authentication using your token (send as a headers)  , and if your token is authenticated, then a to do will be deleted from your data in database. This call require todoId send in body

this call will return :

```javascript
{
  "msg": "successfully deleted"
}
```





### Update to do document

> #### PATCH /user/delete

to update a document, this call require a body input including :

todoId declare as _id, activity:string[optional] , description:strin[optional] and status:boolean[optional]. This call will loop through your body and defined what you want to update. 

allowed field to update are activity, description, and status. this call also need token as a headers, token will be checked in authentication process. 

```json
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```











