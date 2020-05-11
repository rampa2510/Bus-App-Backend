const {get} = require('../Helpers/dbCon')
const {insertOne,findOne} = require('../Helpers/queryHandler')
const { hash,compare } = require('bcryptjs');

module.exports.register =async (req,res)=>{
  try {
    const db =  get();
    const doesUserAlreadyExist = await findOne({username:req.body.username},`${req.body.type}`,db);
    if(doesUserAlreadyExist) return res.status(400).send({message:"Username taken"})
    if(req.body.type!=='driver'){
      
      const hashPass =await hash(req.body.password, parseInt(10, 10));

      await insertOne({...req.body,password:hashPass},`${req.body.type}`,db);

      res.status(200).send({message:'Ok'})
      
    }else{
      await insertOne({...req.body,verified:false},`${req.body.type}`,db);
      res.status(200).send({message:'Ok',data:{...req.body}})
    }
  } catch (error) {
      console.log(error);
      res.status(500).send({message:'internal server error'})
  }
}

module.exports.login = async (req,res)=>{
  try {
    // console.log("l")
    const db = get();
    const userData = await findOne({username:req.body.username},`${req.body.type}`,db)
    if(!userData) return res.status(400).send({message:"User not present"})
    if(req.body.type==='driver' && !userData.verified) return res.status(400).send({message:"Driver still not verified"})

    const isUserAUthenticated = await compare(req.body.password,userData.password);

    if(isUserAUthenticated) res.status(200).send({message:'ok',data:{...req.body}});

    else res.status(400).send({message:"Invalid username or password"})

  } catch (error) {
    console.log(error);
    res.status(500).send({message:'internal server error'})
  }
}