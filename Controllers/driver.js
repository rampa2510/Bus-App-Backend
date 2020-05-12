const {get} = require('../Helpers/dbCon')
const {updateOne,findAll,findOne} = require('../Helpers/queryHandler')
module.exports.updateBus =async (req,res)=>{
  try {
    const db = await get()
    await updateOne({number:req.body.number},
      {$set:{driver:req.body.username,time:req.body.time}}
      ,'bus',db);
    res.status(200).send({message:'Ok'})
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'internal Server error'})
  }
}
module.exports.updateBusRoute =async (req,res)=>{
  try {
    const db = await get()
    await updateOne({number:req.body.number},{$set:{reached:req.body.reached}},'bus',db);
    res.status(200).send({message:'Ok'})
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'internal Server error'})
  }
}

module.exports.getVacantBus = async (req,res)=>{
  try {
    const db = await get()
    const checkIfBusIsDriving = await findOne({driver:req.body.username},'bus',db)
    if(checkIfBusIsDriving){
      return res.status(200).send({message:"Ok",data:{...checkIfBusIsDriving,driverBusy:true}})
    }
    const getVacantBus = await findAll('bus',db,{driver:{$exists:false}})
    res.status(200).send({message:"Ok",data:getVacantBus})
  } catch (err) {
    console.log(err)
    res.status(500).send({message:'We are expreincing issues please try again or contact the technical team'})
  }
}