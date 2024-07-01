# Backend using JavaScript & MongoDb as database

## 1: Intialize npm by command
    npm init
        => By this package.json file created

### Notes:  How to add a Link in Readme.md file 
- [Model Link]()

### Notes: How to add a image in Readme.md file
<img width="100" alt="LOGO" src="https://i.pngimg.me/thumb/f/720/456c6c08f2.jpg">

## 2: add manually Readme.md file
    for difining the working of the code

## 3: add folder public/temp
    now for storing in github, we need a .gitkeep file for tracking this empty folder
    because git only track files, not folder

## 4: add .gitignore file 
    for avoiding push secret data into the gitHub

## 5: add .env file
    for securing curious data such as password etc.

## 6: add src file
    for code takes in separate place

## 7: now inside src create important files
    app.js, constant.js, index.js
    ++++ Can create by cmd +++++++++++
    echo [file-name] [file-content]

## 8: java script has 2 type of syntax
    1. commonjs
    2. module

    +++ for setup in module syntax +++
    ~ add in package.json one line
        "type": "module",

## 9: for server restarting use nodemon
    used as a dev-dependency:
        use module as dev-dependency, where on production module has no importance

used as main dependency:
```npm i nodemon```

for as dev_dependency:
```npm install --save-dev nodemon```
        'OR'
```npm i -D nodemon```

## 10. after run ```npm i -D nodemon``` nodemon install as devDepencies
    and automatic file created such as package-lock.json, 
    folder as node_modules: which has all info about the install modules

## 11. change in package.json
    from=> "test": "echo \"Error: no test specified\" && exit 1"
    to=> "dev": "nodemon src/index.js"

by start easily as command
```npm run dev```

## 12. create essential folders inside src
    controllers = for setup all controllers inside it,
    db = for code about the database,
    middlewares = use checks between the cummunication the server,
    models = for keeping all models,
    routes = for keeping all routes in a separate folder,
    utils = for store utilities, ehich are use for again & again

## 13. install prettier
    - to avoid conflict in production based code in the team,
    - otherwise lots of error comes when merging the code,
    - show prettier used for the formatting the code,
    - it install as devDependency
    - because it has no need after deploy the code in server
use ```npm i -D prettier```

## 14. create two file inside main folder (backend)
    - .prettierrc = set all the neccessary condition according to the format of code
    - .prettierignore = in which you wan't any change add inside this file

## 15. Setup Mongo atlas
    - for database
    - after that add mongodb connection uri inside .env file

## 16. install neccessary package as dependencies
    - install as dependencies, because these are also important after deploying the server
    - mongoose = for datatbase related activities
    - express = for backend
    - dotenv = for environment variable
use ```npm i mongoose express dotenv```

## 17. for setup dotenv
    - for dotenv use as import syntax in place of require
    - setup is required in package.json file
    - here change:
        from: "dev": "nodemon src/index.js"
        to: "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

## 18. importation format
    - many places impotation of file with extension is neccesary to avoid error.

## 19. change in .env file
    - when you change inside .env file then restarting takes place
    - it will not restart automatic by the help of nodemon

## 20. import cors, cookie-parser
    use middleware for taking less resource from computing power
<img width="350" alt="LOGO" src="https://media.geeksforgeeks.org/wp-content/uploads/20211007175759/MiddlewareChaining.png">

## 21. HTTP response status codes
    1. informational responces (100 - 199)
    1. successful responces (200 - 299)
    1. redirection responces (300 - 399)
    1. client responces (400 - 499)
    1. server error responces (500 - 599)

## 22. install some module
    ~ mongoose-aggregate-paginate-v2 => for handle big task in mongoDB
    ~ bcrypt => A library to help you hash password
    ~ jwt (JsonWebToken) => is a bearer token

## 23. install multer & cloudinary
    multer => use as a middleware to save your file inside thestorage or memory, use if any error occurs before uploading file, then keep save the destination of file.
    cloudinary => after that upload file into cloudinary, we can also directory upload our file into cloudinary without using middleware.