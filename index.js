
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const db = require("./src/config/db/connect")
const router = require("./src/routers/index")
var methodOverride = require('method-override')
var cors = require('cors')
const app = express()
const port = 5000

db.connect();
app.use(cors())

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('combined'))


router(app);

app.listen(port, () => console.log(`http://localhost:${port}`))