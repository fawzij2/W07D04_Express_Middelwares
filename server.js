const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const users = [];
// "John", "Mark"

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

app.get("/users", (req, res, next) => {
    res.json(users);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});