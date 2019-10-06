# Fancy-todo API



> ###### Server:
>
> npm run dev  => http://localhost:3000

> ###### Client:
>
> live-server --host=localhost => http://localhost:8080



## Routes

### Login User | Log in user through form

- #### URL

  > /users/login

- #### Method

  > POST

- #### Body

  > email
  >
  > password

- #### Success Response

  > Status: 200 => {token, username}

- #### Error Response

  > Status: 404 => { "message": "User does not exist"} / {"message": "Invalid Password"}



### Login User Google | Using OAuth to log in through

- #### URL

  > /users/loginGoogle

- #### Method

  > POST

- #### Body

  > token

- #### Success Response

  > Status: 200 => {token, username}



### Register User

- #### URL

  > /users/register

- #### Method

  > POST

- #### Body

  > username
  >
  > password
  >
  > email

- #### Success Response

  > Status: 201 => {"message": "User Created"}

- ### Error Response

  > Status: 400 => validation error, user already registered



### Create Todo (Authenticate)

- #### URL

  > /todos

- #### Method

  > POST

- ### Headers

  > token

- ### Body

  > todo
  >
  > description
  >
  > tag

- #### Success Response

  > Status: 201 => {
  >
  > ​        todo,
  >
  > ​        description,
  >
  > ​        tags,
  >
  > ​        userId
  >
  > ​      }

- ### Error Response

  > Status: 400 => validation error



### Get All Todos (Authenticate)

- #### URL

  > /todos

- #### Method

  > GET

- #### Headers

  > token

- #### Success Response

  > Status: 200 => [{
  >
  > ​        todo,
  >
  > ​        description,
  >
  > ​		status,
  >
  > ​        tags,
  >
  > ​        userId
  >
  > ​      } ... ]

- ### Error Response

  > Status: 500 => Internal Server Error 



### Update Todo (Authenticate, Authorize)

- #### URL

  > /todos/:id

- #### Method

  > PATCH

- #### Headers

  > token

- #### Params

  > UserId

- #### Body

  > todo
  >
  > description
  >
  > tags
  >
  > status

- #### Success Response

  > Status: 200 => {
  >
  > ​        todo,
  >
  > ​        description,
  >
  > ​        tags,
  >
  > ​		status
  >
  > ​        userId
  >
  > ​      }

- ### Error Response

  > Status: 401 => not authorized



### Delete Todo (Authenticate, Authorize)

- #### URL

  > /todos/:id

- #### Method

  > DELETE

- #### Headers

  > token

- #### Params

  > UserId

- #### Success Response

  > Status: 200 => {"message": "Todo Deleted"}

- ### Error Response

  > Status: 401 => not authorized