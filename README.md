# fancy-todo APIs Documentation

### `Show All User`

| URL    | Method | URL Params | Data Params | Data Body | Data Headers |
| ------ | ------ | ---------- | ----------- | --------- | ------------ |
| /users | GET    | None       | None        | None      | None         |

- **Description**

  > Get all the user info

- **Success Response**

  - **Code** : 200

  - **Content : **

    ```json
    [
      {
        "eventId": [],
        "_id": "5d946f5b2c45e22a927d5d41",
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "$2a$10$549i84aRNfSaL1np9OpI9.k0iZZJeoDmbqsA.Bm3EnpllDRsuvCc.",
        "__v": 0
      },
      {
        "eventId": [],
        "_id": "5d9999458d8d8214f7d4a0e0",
        "name": "ghozi",
        "email": "ghozi@gmail.com",
        "password": "$2a$10$jgL6GJ1MjkfYp0qP2.iumOK32y5Q3pkbNH04axRoKxrdUIGRV.XDm",
        "__v": 0
      }
    ] 
    ```
  
- **Error Response**

  - **Code : ** 404 NOT FOUND

- **Sample Call:**

  ```javascript
  $.ajax({
      url: "/users",
      dataType: "json",
      type: "GET"
  })
  ```
  ------
  
  ### `Show a User`

| URL        | Method | URL Params    | Data Params | Data Body | Data Headers |
| ---------- | ------ | ------------- | ----------- | --------- | ------------ |
| /users/:id | GET    | id : objectId | None        | None      | None         |

- **Description**

  > Get  a user info

- **Success Response**

  - **Code** : 200

  - **Content : **

    ```json
    {
      "eventId": [],
      "_id": "5d9999458d8d8214f7d4a0e0",
      "name": "ghozi",
      "email": "ghozi@gmail.com",
      "password": "$2a$10$jgL6GJ1MjkfYp0qP2.iumOK32y5Q3pkbNH04axRoKxrdUIGRV.XDm",
      "__v": 0
    } 
    ```
  
- **Error Response**

  - **Code : ** 404 NOT FOUND

- **Sample Call:**

  ```javascript
  $.ajax({
      url: "/users/5d9999458d8d8214f7d4a0e0",
      dataType: "json",
      type: "GET"
  })
  ```
  ------

### `Create User`

| URL             | Method | URL Params | Data Params | Data Body                                                | Data Headers |
| --------------- | ------ | ---------- | ----------- | -------------------------------------------------------- | ------------ |
| /users/register | POST   | None       | None        | Name : String<br />Email : String<br />Password : String | None         |

- **Description**

  > create a new user

- **Success Response**

  - **Code** : 201

  - **Content : **

    ```json
    {
      "id": "5d946f5b2c45e22a927d5d41",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTQ2ZjViMmM0NWUyMmE5MjdkNWQ0MSIsImlhdCI6MTU3MDM0ODQ3MX0.xbuiWpzbd83JHGY3FtuLmA8HrLe32mwa0Fo9EA4C5D4"
    } 
    ```
  
- **Error Response**

  - **Code : ** 404 NOT FOUND

- **Sample Call:**

  ```javascript
  $.ajax({
      url: "/users/register",
      dataType: "json",
      type: "POST",
      data : {
          name : "ghozi",
          email : "ghozi@gmail.com",
          password : "ghozi"
      }
  })
  ```
  ------
  
  ### `login User`

| URL          | Method | URL Params | Data Params | Data Body                             | Data Headers |
| ------------ | ------ | ---------- | ----------- | ------------------------------------- | ------------ |
| /users/login | POST   | None       | None        | Email : String<br />Password : String | None         |

- **Description**

  > login  user via form login

- **Success Response**

  - **Code** : 200

  - **Content : **

    ```json
    {
      "id": "5d946f5b2c45e22a927d5d41",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTQ2ZjViMmM0NWUyMmE5MjdkNWQ0MSIsImlhdCI6MTU3MDM0ODQ3MX0.xbuiWpzbd83JHGY3FtuLmA8HrLe32mwa0Fo9EA4C5D4"
    }
    ```
  
- **Error Response**

  - **Code : ** 400 BAD REQUEST

- **Sample Call:**

  ```javascript
  $.ajax({
      url: "/users/login",
      dataType: "json",
      type: "POST",
      data : {
          email : "ghozi@gmail.com",
          password : "ghozi"
      }
  })
  ```
  ------

### `login User 3rd API`

| URL                | Method | URL Params | Data Params | Data Body | Data Headers |
| ------------------ | ------ | ---------- | ----------- | --------- | ------------ |
| /users/loginGoogle | POST   | None       | None        | token     | None         |

- **Description**

  > login  user via google API sign in

- **Success Response**

  - **Code** : 200

  - **Content : **

    ```json
    {
      "id": "5d946f5b2c45e22a927d5d41",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTQ2ZjViMmM0NWUyMmE5MjdkNWQ0MSIsImlhdCI6MTU3MDM0ODQ3MX0.xbuiWpzbd83JHGY3FtuLmA8HrLe32mwa0Fo9EA4C5D4"
    }
    ```
  
- **Error Response**

  - **Code : ** 400 BAD REQUEST

- **Sample Call:**

  ```javascript
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
      url: "/users/loginGoogle",
      dataType: "json",
      type: "POST",
      data : {
          token : id_token
      }
  })
  ```
  ------
