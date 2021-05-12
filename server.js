const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const users = ["John", "Mark"];


// Pulse Check
//1. 
const logUsers = (req,res,next)=>{
    console.log(users);
    next();
}

//2.
app.use(logUsers);

//3.
const logMethod = (req,res,next)=>{
    if (users.length > 0){
        console.log(req.method);
        next()
    } else {
        const err = new Error("internal error");
        err.status = 404;
        next(err);
    }
}
app.use("/users", logMethod);

//5. 
app.use((err,req,res,next)=>{
    res.status(err.status);
    res.json("no users")
})


// Practice
//1.
const usersRouter = express.Router();
usersRouter.use((req, res, next) => {
    res.json(users);
    console.log(users);
    next();
});
app.use("/users",usersRouter)

//2.
const logUser = (req,res,next)=>{
    console.log(req.body);
}
app.post("/users/create",(req,res,next)=>{
    const addUser = req.body.name;
    users.push(addUser)
    next()
},logUser)

//3.
const productsRouter = express.Router();
productsRouter.use((req, res, next) => {
    console.log("hello from products");
});
app.use("/products", productsRouter)

//4. 
const products = [`keyboard`, `mouse`];
app.put("/products/update", (req,res,next)=>{
    const replacement = req.body.product;
    products.splice(1,1,replacement);
    // for testing purposes
    // console.log(products);
    // res.json('update done');
    next();
})

app.get("/users", (req, res, next) => {
    res.json(users);
});

//5.
const pRouter = (req,res,next)=>{
    console.log("/products",req.path);
    next()
}
app.use("/products", pRouter);

//6.
app.use("*",(req,res,next)=>{
    const err = new Error("page doesn't exist")
    err.status = 404
    next(err)
    
})
app.use((err,req,res,next)=>{
    res.status(err.status);
    res.json("NOT FOUND");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});