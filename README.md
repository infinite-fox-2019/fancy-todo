**Todo Fancy**
----
  Simple Todo App with authentication and authorization API build using Express JS, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using jQuery and Bootstrap 4. 

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to register a new account
/login | POST | Route used to let user login to app
/gsignin | POST | Route used to let user register or login to app via Google account join their group
/todos | GET | Route used to retrieve all tasks belongs to a user
/todos | POST | Route used to create a task
/todos/:id | PATCH | Route used to edit and update a task
/todos/:id | DELETE | Route used to delete a task


## Usage

With only npm: 

```javascript
npm install
node app.js in server folder
run index.html using live-server --host:localhost
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Name<br />
  Email<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: true, message: Account successfully registered }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Username<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong username or password" }`


**Google Log In**
----
  Let user skip registration phase by registering into the app using information from their Google account. Returns token if succeeded.

* **URL**

  /gsignin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`



**Get User's Tasks**
----
  Request to retrieve user's personal tasks.

* **URL**

  /tasks

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all tasks data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Create a Task**
----
  Post request to server to create a task.

* **URL**

  /tasks

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Title<br />
  Author

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ todos_data : task data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Edit Task**
----
  Edit task and update the existing data in the database.

* **URL**

  /tasks/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id (edited task)

* **Data Params**

  Title<br />
  Description<br />
  Priority<br />
  Due Date

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated task }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Delete Task**
----
  Delete task from the database and remove task data from user's.

* **URL**

  /tasks/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (deleted task)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted task }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

