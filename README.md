# fancy-todo
**Register**
----
  Register new user to database

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `email=[string]`
  `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ _id: 5d99dc44c50b0f5bf4a01704,
  email: 'ada@ddw.co',
  password:
   '$2a$05$sTkjYyGxXWIKBes6KsRdV.iQvggMigW88kQnjstXI1Z9Qs3pUPJaq',
  __v: 0 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "email telah terdaftar" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/register",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

**Login**
----
  Login User

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `email=[string]`
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id: 5d99dc44c50b0f5bf4a01704,
  email: 'ada@ddw.co',
  password:
   '$2a$05$sTkjYyGxXWIKBes6KsRdV.iQvggMigW88kQnjstXI1Z9Qs3pUPJaq',
  __v: 0 }`
 
* **Error Response:**

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Password salah" }`
OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Email tidak ditemukan" }`
* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/login",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });


**Create ToDo**
----
  Register new ToDo to database for current User Login

* **URL**

  /ToDo/create

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `date=[date]`
  `activity=[string]`
  `User_Id=['User._id']`
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ _id: 5d99dc44c50b0f5bf4a01704,
  date: '2019-10-21',
  activity:
   'makan',
   User_Id : '5d99dc44c50b0f5bf4a01704'
  __v: 0 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ToDo/create",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

**Get ToDo**
----
  Get all list to do from user logged in

* **URL**

  /ToDo

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**
  `token=[string]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id: 5d99dc44c50b0f5bf4a01704,
  date: '2019-10-21',
  activity:
   'makan',
   User_Id : '5d99dc44c50b0f5bf4a01704'
  __v: 0 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Data tidak ada" }`
    OR
  * **Code:** 500 <br />
    **Content:** `{ msg: "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ToDo",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });

**Delete ToDo**
----
  Delete a todo from user logged in

* **URL**

  /ToDo/delete/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id = ["String"]`

* **Data Params**
  `token=[string]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id: 5d99dc44c50b0f5bf4a01704,
  date: '2019-10-21',
  activity:
   'makan',
   User_Id : '5d99dc44c50b0f5bf4a01704'
  __v: 0 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Data tidak ada" }`
    OR


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ToDo//delete/2",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });

**Update ToDo**
----
  Update current to do from user logged in

* **URL**

  /ToDo/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
  `id=["string"]`

* **Data Params**
  `token=[string]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id: 5d99dc44c50b0f5bf4a01704,
  date: '2019-10-21',
  activity:
   'makan',
   User_Id : '5d99dc44c50b0f5bf4a01704'
  __v: 0 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Data tidak ada" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ToDo/1",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });