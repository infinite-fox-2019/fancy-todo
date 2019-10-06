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