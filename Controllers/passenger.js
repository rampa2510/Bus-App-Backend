const {get} = require('../Helpers/dbCon')
const {findOne,updateOne,findAll} = require('../Helpers/queryHandler')

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
    const allBuses = await findAll('bus',db,{passengers:{$ne:req.body.username}})
    res.status(200).send({message:"Ok",allBuses})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}
