# olshop
## how to run

backend
```
npm run dev
```

frontend
```
npm run dev
```

you can access with http://localhost:3000 as a backend
and front end is http://localhost:5173/

## list endpoint backend with cURL
### auth
- login
    ```
    curl --location 'http://127.0.0.1:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "user1@mail.com",
        "password": "123456"
    }'
    ```
- register
    ```
    curl --location 'http://127.0.0.1:3000/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "user@mail.com",
        "fullname": "User Man",
        "password": "123456"
    }'
    ```
- logout
    ```
    curl --location --request POST 'http://127.0.0.1:3000/auth/logout' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE3MTE5MDE4MDQsImV4cCI6MTcxMTkwNTQwNH0.dpY1bNT31ApYt7mwo5xJ2MIdVfDJVYkqCDUd2HDMhR8'
    ```
### product
- create
    ```
    curl --location 'http://127.0.0.1:3000/products' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "0",
        "price": "123.00",
        "description": "memang beda",
        "sku": "777",
        "category": "food"
    }'
    ```
- get by id
    ```
    curl --location 'http://127.0.0.1:3000/products/5'
    ```
- update
    ```
    {
        "name": "0",
        "price": "123.00",
        "description": "memang beda",
        "sku": "889",
        "category": "digital"
    }
    ```
- get list
    ```
    curl --location 'http://127.0.0.1:3000/products'
    ```
- delete 
    ```
    curl --location --request DELETE 'http://127.0.0.1:3000/products/1'
    ```