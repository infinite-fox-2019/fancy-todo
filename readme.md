
**Timehunt**
----
**Usage**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/satyowicaksana/fancy-todo.git
$ cd server
```

Make a .env file with the same parameters in .env.example file
```
$ touch .env
```
set the values of with your preferences

Run the server with these commands:
```
$ npm install
$ npm run dev
```
Then run the client with these commands:
```
$ cd ../client
$ npm install
$ live-server --host=localhost
```

**GET /tasks**
* **URL**

  `/tasks`

* **Method:**

  `GET` 
  
* **Data Params**
 **headers:**
`'Content-Type' (string) | specify the media type of request being sent from the client to the server.`
`'token' (string) | a token that is sent from the server in authentication process.`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "status": true,
            "_id": "5d9a3feda67c962a6b8828f1",
            "name": "Buy Milk",
            "startDate": "2019-09-30T19:26:00.000Z",
            "dueDate": "2019-10-08T19:26:00.000Z",
            "userId": "5d98ee53996e75b374fbfc23",
            "__v": 0
        },
        {
            "status": true,
            "_id": "5d9a407aa67c962a6b8828f2",
            "name": "Buy Milk",
            "startDate": "2019-09-30T19:28:00.000Z",
            "dueDate": "2019-10-07T19:28:00.000Z",
            "userId": "5d98ee53996e75b374fbfc23",
            "__v": 0
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />

**GET /tasks/now**
* **URL**

  `/tasks/now`

* **Method:**

  `GET` 

* **Data Params**
 **headers:**
`'Content-Type' (string) | specify the media type of request being sent from the client to the server.`
`'token' (string) | a token that is sent from the server in authentication process.`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "status": true,
            "_id": "5d9a3feda67c962a6b8828f1",
            "name": "Buy Milk",
            "startDate": "2019-09-30T19:26:00.000Z",
            "dueDate": "2019-10-08T19:26:00.000Z",
            "userId": "5d98ee53996e75b374fbfc23",
            "__v": 0
        },
        {
            "status": true,
            "_id": "5d9a407aa67c962a6b8828f2",
            "name": "Buy Milk",
            "startDate": "2019-09-30T19:28:00.000Z",
            "dueDate": "2019-10-07T19:28:00.000Z",
            "userId": "5d98ee53996e75b374fbfc23",
            "__v": 0
        }
    ]
    ```
 * **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
   
**POST /tasks/**
* **URL**

  `/tasks/`

* **Method:**

  `POST` 

* **Data Params**
 **headers:**
`'Content-Type' (string) | specify the media type of request being sent from the client to the server.`
`'token' (string) | a token that is sent from the server in authentication process.`
**body:**
`'name' (string) | the name of the task.`
`'description' (string) | the description of the task.`
`'startDate' (date) | the start date of the task.`
`'dueDate' (date) | the due date of the task.`


* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
	    message:  'task created successfully'
    }
    ```


 * **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />

**PATCH /tasks/:id**
* **URL**

  `/tasks/:id`

* **Method:**

  `PATCH` 

* **Data Params**
 **headers:**
`'Content-Type' (string) | specify the media type of request being sent from the client to the server.`
`'token' (string) | a token that is sent from the server in authentication process.`
**params:**
`'id' (string) | the id of the task.`
**body:**
`'name' (string) | the name of the task.`
`'description' (string) | the description of the task.`
`'startDate' (date) | the start date of the task.`
`'dueDate' (date) | the due date of the task.`
`'status' (boolean) | the status of the task.`


* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
	    message:  'task updated successfully'
    }
    ```

 * **Error Response:**
	  * **Code:** 400 <br />
	    **Content Example:** 
    ```
    {
	    title: 'Invalid Input'
	    message:  'Please fill all the form'
    }
    ```

	  * **Code:** 500 INTERNAL SERVER ERROR <br />
	   
**DELETE /tasks/:id**
* **URL**

  `/tasks/:id`

* **Method:**

  `DELETE` 

* **Data Params**
 **headers:**
`'Content-Type' (string) | specify the media type of request being sent from the client to the server.`
`'token' (string) | a token that is sent from the server in authentication process.`
**params:**
`'id' (string) | the id of the task.`
**body:**


* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
	    message:  'task deleted successfully'
    }
    ```

 * **Error Response:**

	  * **Code:** 500 INTERNAL SERVER ERROR <br />
