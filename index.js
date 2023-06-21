const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 5000


app.use(morgan('combined'))



app.listen(port, () => console.log(`http://localhost:${port}`))