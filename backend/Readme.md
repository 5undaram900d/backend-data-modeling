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