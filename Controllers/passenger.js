const {get} = require('../Helpers/dbCon')
const {findOne,updateOne,findAll,insertOne} = require('../Helpers/queryHandler')

module.exports.book = async(req,res)=>{
  try {
    const db = await get();
    const isPassengerAlreadyAdded = await findOne({passengers:req.body.username},'bus',db)
    if(isPassengerAlreadyAdded) return res.status(400).send({message:"Passenger already added"})
    await updateOne({number:req.body.number},{$push:{passengers:req.body.username}},'bus',db);
    res.status(200).send({message:"Ok"})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"})
  }
}

module.exports.getAllBuses = async (req,res)=>{
  try {
    const db = await get();
    const allBuses = await findAll('bus',db,{$and:[{passengers:{$ne:req.body.username}},{start:{$exists:true}}]})
    res.status(200).send({message:"Ok",data:allBuses})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}

module.exports.feedback = async (req,res)=>{
  try {
    const db = await get();
    await insertOne({...req.body},'feedback',db);
    res.status(200).send({message:'Ok'})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}

module.exports.getAllFeedback = async (req,res)=>{
  try {
    const db = await get()
    const drivers = await findAll('feedback',db)
    res.status(200).send({mesage:"Ok",data:drivers})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}