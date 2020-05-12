const {get} = require('../Helpers/dbCon')
const {updateOne} = require('../Helpers/queryHandler')
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