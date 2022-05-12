const express = require('express');
const app = express();
const port=5000;
const path = require('path')

//method Get
app.get("/",(req,res)=>{
    res.send("<h1>hello world</h1>")
})

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","contact.html"))
})

//middleware
app.use(express.static("public"));
app.use(express.json())

app.listen(port,()=>{
    console.log(`server is up and running on port http://localhost:${port}`)
});

const students =[
    {
        id:0,
        name: "walid",
        age:30
    },
    {
        id:1,
        name: "lina",
        age:20
    },
    {
        id:2,
        name: "mohamed",
        age:12
    },
]

app.get('/students',(req,res)=>{
    res.send({msg:'list of students :',students})
})
//method post
app.post("/addStudent",(req,res)=>{
    let added=[...students,req.body];
    res.send({msg:'student added successfully',added})
})
//method delete
app.delete("/delete/:id",(req,res)=>{
    let deleted=students.filter((student)=>student.id!=req.params.id);
    res.send({msg:'student deleted ',deleted})
})
//method put
app.put("/update/:id",(req,res)=>{
    let updated=students.map((student)=>
        student.id == req.params.id?{...student, ...req.body}: student);
    res.send({msg:'student updated successfully',updated})
})
