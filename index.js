const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./routes/routes")
const connection = require('./database/connection')


 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/",router);


app.listen(3000,(err)=>{
    if (err) {
        console.log('servidor nao iniciado!')
    } else {
        console.log('servidor iniciado!')
    }
})