const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./Routes/user')

const app = express()
app.set('views','views')
const sequelize = require('./models/user')
app.use(cors())

app.use(bodyParser.json())
app.use(userRoutes)

const port = 3000;
sequelize
.sync()
.then(()=>{
    console.log('database connected')
    app.listen(port,()=>{
        console.log(`server started at port ${port}`)
    })
}).catch(err=>console.log(err,"db connect error"))