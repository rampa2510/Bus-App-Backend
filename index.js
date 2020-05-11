const express = require('express')
const cors = require('cors');
const {connect} = require('./Helpers/dbCon')
const app = express();

const PORT = process.env.PORT || 4000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/',require('./route'))

app.listen(PORT,async ()=>{
  try {
    await connect();
    console.log("Db connected "+PORT)
  
  } catch (error) {
    console.log(error)
  }
})