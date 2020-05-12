const {updateOne,deleteOne,findAll,findOne,insertOne} = require('../Helpers/queryHandler')
const {get} = require('../Helpers/dbCon')
module.exports.updateDriver = async (req,res)=>{
  try {
    const db = await get()
    if(req.body.verify){
    await updateOne({username:req.body.username},{$set:{verified:true}},'driver',db)
  }else{
    await deleteOne({username:req.body.username},'driver',db)
  }
    res.status(200).send({message:"Ok"})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"})
  }
}

module.exports.deleteDriver = async (req,res)=>{
  try {
    const db = await get()
    await deleteOne({username:req.body.username},'driver',db)
    res.status(200).send({message:"Ok"})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"})
  }
}

module.exports.getAllDrivers =async (req,res)=>{
  try {
    const db = await get()
    const drivers = await findAll('driver',db)
    res.status(200).send({message:"Ok",drivers})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"})
  }
}

module.exports.addBus = async (req,res)=>{
  try {
    const db = await get();
    const doesBusNoExist = await findOne({number:req.body.number},'bus',db);
    if(doesBusNoExist) return res.status(400).send({message:"Bus number already exists"});
    await insertOne({number:req.body.number,start:req.body.start,end:req.body.end,passengers:[],price:req.body.price},'bus',db)
    res.status(200).send({message:'Ok'})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}