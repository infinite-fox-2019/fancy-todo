
# FANCY-TODO

- HOST :

```javascript
http://localhost:3000/

```



**1. Register New User**
----

  Returns data user and password that has been hashed.

* **URL**

  /user/register

* **Method:**

  `POST`
  
*  **URL Params**

   none

* **Data Body**

  ```json
  username=[string]
  email=[string]
  password=[string]
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    
    ```json
    { username : "sigit",email: sigitari111@gmail.com, password : "$2a$10$ASA5ZM/cnNoBcR/OIl1iZOczgacDPUamq3Kwrmn1C01Pw0u4.4Iqi" }
    ```
    
    **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "username / email / password required" }`

* **Sample Input:**

  ```JSON
  {
	    "username": "sigit",
	    "email": "sigitari111@gmail.com"
	    "password": "123456"
  }
  ```



## **2. Login User**

  Returns data Token.

- **URL**

  /user/login

- **Method:**

  `POST`

- **URL Params**

  none

- **Data Body**

  ```
  email=[string]
  password=[string]
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
    }
    ```

    **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "email / password wrong" }`

- **Sample Input:**

  ```JSON
  {
      "email": "sigitari111@gmail.com",
      "password": "123456"
  }
  ```



## 3. Change Username

  Change Full name User.

- **URL**

  /user/update/name

- **Method:**

  `PATCH`

- **URL Params**

  none

- **Data Body**

  ```
  username=[string]
  newUsername=[string]
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    ```json
    {
        _id: "5d9807ca0be6d70172fac1ac",
        username: "Sigit Ari Prasetyo",
        email: "sigitari111@gmail.com",
        password: "$2a$10$5owtqIYbwQkfo4oeOmifg.JuoR133yI9yuqh/kwbrjndwCBmZcZmy",
        createdAt: 2019-10-05T03:02:34.900+00:00,
        updatedAt: 2019-10-06T13:48:31.143+00:00,
        __v: 0
    }
    ```

    **Error Response:**

  - **Code:** 400 BAD REQUEST <br/>
    **Content:** `{ error : "new username is required" }`

- **Sample Input:**

  ```JSON
  {
      "username": "sigit",
      "newUsername": "Sigit Ari Prasetyo"
  }
  ```



## **4. Show TODO**

  Returns all TODO.

- **URL**

  /todo

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `token=[string]`

- **Data Body**

  none

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    ```json
    [
        {
            "id": 5,
            "title": "instal bcrypt",
            "description": "mengnstal MD",
            "status": true,
            "dueDate":2019-10-07T00:00:00.000+00:00,
            "userId": "hsgt5dnndh2ds2d5235ssd4",
            "createdAt": "2019-09-30T12:24:34.161Z",
            "updatedAt": "2019-09-30T12:24:34.161Z"
        }
  ]
    ```

    **Error Response:**
    
  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

- **Sample Input:**

  none



## 5.  Search TODO by title

​    Returns data TODO.

- **URL**

  /todo/search/:title

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `token=[string]`

  `title=[string]`

- **Data Params**

  ```
  title
  ```

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    ```json
    [
        {
            "id": 5,
            "title": "install",
            "description": "mengnstal MD",
            "status": true,
            "dueDate":2019-10-07T00:00:00.000+00:00,
            "userId": "hsgt5dnndh2ds2d5235ssd4",
            "createdAt": "2019-09-30T12:24:34.161Z",
            "updatedAt": "2019-09-30T12:24:34.161Z"
        },
      {
            "id": 7,
          "title": "install",
            "description": "mengnstal Ubuntu",
            "status": true,
            "dueDate":2019-10-07T00:00:00.000+00:00,
            "userId": "hsgt5dnndh2ds2d5235ssd4",
            "createdAt": "2019-09-30T12:24:34.161Z",
            "updatedAt": "2019-09-30T12:24:34.161Z"
        }
    ]
    ```
    
    **Error Response:**
    
  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

- **Sample Input:**

  ```json
  /todo/search/:install
  ```



## **6.  CREATE TODO**

​    Create new data TODO.

- **URL**

  /todo

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `token=[string]`

  `title=[String]`

  `description=[String]`

  `dueDate=[date]`

- **Data Body**

  ```
  title
  description
  dueDate
  ```

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 201 CREADTED <br />
    **Content:** 

    ```json
    {
        "id": 8,
        "title": "makan",
        "description": "makan sinag di kantin",
        "userId": 4,
        "dueDate":2019-10-07T00:00:00.000+00:00,
        "updatedAt": "2019-10-02T02:02:13.449Z",
        "createdAt": "2019-10-02T02:02:13.449Z"
    }
  ```
    
  **Error Response:**
    
  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "title / description required!!" }`

- **Sample Input:**

  ```json
  {
      "title": "makan siang",
      "description": "makan siang di kantin",
      "dueDate":2019-10-07T00:00:00.000+00:00,
  }
  ```



## **7.  UPDATE TODO**

​    Edit TODO.

- **URL**

  /todo/update/:id

- **Method:**

  `PATCH`

- **URL Params**

  **Required:**

  `token=[string]`

  `title=[String]`

  `description=[String]`

- **Data Body**

  ```
  title
  description
  ```

- **Data Params**

  ```
  id Todo
  ```

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    `{ msg : "Update todo successed!" }`

    ```json
    {
        "id": 8,
        "title": "makan",
        "description": "makan sinag di kantin",
        "userId": 4,
        "dueDate":2019-10-07T00:00:00.000+00:00,
        "updatedAt": "2019-10-02T02:02:13.449Z",
        "createdAt": "2019-10-02T02:02:13.449Z"
    }
  ```
    
  **Error Response:**
    
  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "title / description required!!" }`

- **Sample Input:**

  ```json
  {
      "title": "makan siang",
      "description": "makan siang di kantin"
  }
  ```

  

## **8.  DELETE TODO**

​    Delete TODO from list.

- **URL**

  /todo/delete/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `token=[string]`

  `id=[string]`

- **Data Body**

  none

- **Data Params**

  ```
  id Todo
  ```

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    `{ msg : "Delete todo successed!" }`

    **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "title / description required!!" }`

- **Sample Input:**

  ```json
  /todo/delete/5d9996f63e127d7dd8c6bc6c
  ```




## **9.  Mark Done Status TODO**

​    Mark TODO as DONE.

- **URL**

  /todo/update/:id

- **Method:**

  `PATCH`

- **URL Params**

  **Required:**

  `token=[string]`

  `id=[string]`

  `status=[boolean]`

- **Data Body**

  ```
  status
  ```

- **Data Params**

  ```
  id Todo
  ```

- **Data Header** 

  ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 

    none

    **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You are not Authentication!" }`

    OR

  - **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "You are not Authorized!" }`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "title / description required!!" }`

- **Sample Input:**

  ```json
  /todo/update/5d9996f63e127d7dd8c6bc6c
  ```



