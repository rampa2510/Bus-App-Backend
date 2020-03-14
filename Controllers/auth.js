const {get} = require('../Helpers/dbCon')
const {insertOne,findOne} = require('../Helpers/queryHandler')
const { hash,compare } = require('bcryptjs');

module.exports.register =async (req,res)=>{
  try {
    const db =  get();

    if(req.body.type!=='driver'){
    
      const hashPass =await hash(req.body.password, parseInt(10, 10));

      await insertOne({...req.body,password:hashPass},`${req.body.type}`,db);

      res.status(200).send({message:'Ok'})
      
    }else{
      await insertOne({...req.body,verified:false},`${req.body.type}`,db);

    }
  } catch (error) {
      console.log(error);
      res.status(500).send({message:'internal server error'})
  }
}

module.exports.login = async (req,res)=>{
  try {
    const db = get();
    const userData = await findOne({username:req.body.username},`${req.body.type}`,db)
    const isUserAUthenticated = await compare(req.body.password,userData.password);
    if(isUserAUthenticated) res.status(200).send({message:'ok'});
    else res.status(400).send({message:"Invalid username or password"})
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'internal server error'})
  }
}