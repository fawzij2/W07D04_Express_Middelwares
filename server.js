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
    console.log(req.method);
    next()
}
app.use("/users", logMethod);

app.get("/users", (req, res, next) => {
    res.json(users);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});