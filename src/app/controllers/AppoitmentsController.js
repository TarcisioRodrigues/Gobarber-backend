import * as Yup from 'yup';
import Appoitments from '../models/Appoitments';
import User from '../models/User';
//Controller para fazer agendamentos
class AppoitmentsController{
 async store (req,res){
  //Validando o agendamento 
  const schema=Yup.object().shape({
    provider_id:Yup.object().required(), 
    date:Yup.date().required(),
   });
   if(!(await schema.isValid(req.body))){
     return res.status(400).json({error:'Validation fails'});
   }
   const {provider_id,date}=req.body;
   /**
    * Checando se o provider_id é um provider
    */
   const isProvider=await User.findOne({
     where:{id:provider_id,provider:true}
   })
   if(!isProvider){
     return res.status(401).json({error:'You can only create appoitments with providers'})
   }
   const appoitment=await Appoitments.create({
     user_id:req.userId,
     provider_id:req.providerId,
     date,
   })
   return res.json(appoitments)
  }

}
export default new AppoitmentsController();