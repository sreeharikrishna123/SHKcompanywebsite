const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("."))

const FILE="data.txt"

app.get("/data",(req,res)=>{
    let data=fs.readFileSync(FILE)
    res.send(data)
})

app.post("/add",(req,res)=>{

    let data=JSON.parse(fs.readFileSync(FILE))
    data.push(req.body)

    fs.writeFileSync(FILE,JSON.stringify(data,null,2))

    res.send("ok")
})

app.delete("/delete/:id",(req,res)=>{

    let data=JSON.parse(fs.readFileSync(FILE))

    data.splice(req.params.id,1)

    fs.writeFileSync(FILE,JSON.stringify(data,null,2))

    res.send("deleted")
})

app.listen(3000,()=>console.log("Server running"))