## REST-API Fancy-Todo

Fancy-todo ini adalah aplikasi web untuk menyimpan dan mengelola task/todo dan di tampilkan berdasarkan statusnya sehingga lebih mudah untuk dibaca dan dimengerti.

Format routes awal dari fancy-todo ini adalah :

```
http://localhost:3000/
```

dan setiap routes selanjutnya diikuti oleh :

```
http://localhost:3000/<model>/<task>
```

------



### 1. POST /users/register

```
http://localhost:3000/users/register
```

Routes ini untuk mendaftarkan diri anda dan dibutuhkan data :

**Body**

| Field    | Type   |
| -------- | ------ |
| username | string |
| email    | string |
| password | string |

return dari server berupa token yang menandakan registrasi anda berhasil.

### 2. POST /users/login

```
http://localhost:3000/users/login
```

Routes ini untuk mendaftarkan diri anda dan dibutuhkan data :

**Body**

| Field    | Type   |
| -------- | ------ |
| email    | string |
| password | string |

Return dari server sama seperti register dimana akan dihasilkan token

### 3. POST /users/loginOAuth

```
http://localhost:3000/users/loginOAuth
```

Routes ini digunakan untuk login kedalam web dengan menggunakan OAuth 2.0 milik google. Sehingga dengan menggunakan aku google, dapat mengakses web ini.

Return dari server sama seperti register dimana akan dihasilkan token



### 4. GET /users/find

```
http://localhost:3000/users/find
```

Routes ini untuk mendaftarkan diri anda dan dibutuhkan data :

**Headers**

| Field | Type   |
| ----- | ------ |
| token | string |

return dari routes ini adalah json file yang menampilkan data user berdasarkan id beserta todo list dari user terserbut.

Contoh output :

```json
{
    "todoList": [
        {
            "status": "On-Progress",
            "_id": "5d99d53f441b7d2c192abc8f",
            "title": "Todo-1",
            "createdAt": "2019-10-06T11:51:27.801Z",
            "updatedAt": "2019-10-06T11:51:27.801Z",
            "dueDate": "2019-10-08",
            "descriptions": "Masih progress",
            "userId": "5d99d259f2d80029fbc1f519",
            "__v": 0
        },
        {
            "status": "New",
            "_id": "5d99d90a441b7d2c192abc90",
            "title": "todo 2",
            "createdAt": "2019-10-06T12:07:38.938Z",
            "updatedAt": "2019-10-06T12:07:38.938Z",
            "dueDate": "2019-10-09",
            "descriptions": "todo 2",
            "userId": "5d99d259f2d80029fbc1f519",
            "__v": 0
        }
    ],
    "_id": "5d99d259f2d80029fbc1f519",
    "name": "Nadhil Janitra",
    "email": "nadhiljanitraa@gmail.com",
    "__v": 0
}
```

### 5. POST /todos/add

```
http://localhost:3000/todos/add
```

Routes ini untuk membuat todos baru dengan field yang dibutuhkan sebagai berikut

**Headers**

| Field | Type   |
| ----- | ------ |
| token | string |

**Body**

| Field        | Type   |
| ------------ | ------ |
| title        | string |
| descriptions | string |
| dueDate      | string |

hasilnya adalah akan membuat todos yang baru berdasarkan data yang telah diinputkan

### 5. DELETE /todos/delete

```
http://localhost:3000/todos/delete
```

Routes ini digunakan untuk menghapus todo dan data yang dibutuhkan adalah

**Headers**

| Field | Type   |
| ----- | ------ |
| token | string |

**Body**

| Field  | Type   |
| ------ | ------ |
| _id    | string |
| userId | string |

return dari routes ini adalah JSON file yang menampilkan jumlah data yang telah berhasil dihapus

```json
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

### 6. PATCH /todos/update

```
http://localhost:3000/todos/update
```

Routes ini digunakan untuk mengubah status dari todos dengan data yang dibutuhkan adalah :

**Headers**

| Field | Type   |
| ----- | ------ |
| token | string |

**Body**

| Field  | Type   |
| ------ | ------ |
| _id    | string |
| userId | string |
| status | string |

return dari routes ini adalah JSON file yang menampilkan jumlah data yang telah berhasil diupdate

```json
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

