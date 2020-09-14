import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController{
async index (req,res){
  //Checando se ele é um provider
  const checkProvider=await User.findOne({
    where:{id:req.userId,provider:true}
  });
  if(!checkProvider){
    return res.status(401).json({error:'Only provider can load notifications'})
  }
  const notifications=await Notification.find({
    user:req.userId,
  }).sort({createAt:'desc'}).limit(20);
  return res.json(notifications);
}
}

export default new NotificationController();