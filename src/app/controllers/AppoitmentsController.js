import * as Yup from 'yup';
import {startOfHour,parseISO,isBefore,format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appoitments from '../models/Appointments';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

//Controller para fazer agendamentos
class AppoitmentsController{

  async index (req,res){
    //Paginação
    const {page=1}=req.query;
    const appoitments=await Appoitments.findAll({
      where:{user_id:req.userId,canceled_at:null},
      //Comando para ordena as listagens
      limit:20,
      offset:(page-1)*20,
      order:['date'],
      include:[
        {
          models:User,
          as:'provider',
          attributes:['id','name'],
          include:[
            {
              model:File,
              as:'avatar',
              attributes:['id','path','url']
            }
          ]
        }
      ]
    });
    return res.json(appoitments);
  }
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
   //Validando a data de agendamento
   const hourStart=startOfHour(parseISO(date));
   if(isBefore(hourStart,new Date())){
     return res.status(400).json({error:'Past dates are not permitted'});
   }
   //Checando se não tem agendamento marcado 
   const checkAvailabity=await Appoitments.findOne({
     where:{
       provider_id,
       cancele_at:null,
       date:hourStart,
     },
     if(checkAvailabity){
      return res.status(400).json({error:'Appoitment date is not availiable'});
     }
   })
   const appoitment=await Appoitments.create({
     user_id:req.userId,
     provider_id:req.providerId,
     date:hourStart,
   })
   //Notificar o prestador de serviço
   const user=await User.findByPk(req.userId);
   const formattedDate=format(hourStart,
    "dia 'dd' ' de'  MMMM', às' H:mm'h" ,
    {locale:pt}
    )
   await Notification.create({
     content:`Novo agendamento de ${user.name} para  ${formattedDate}`,
     user:provider_id,
     
   })
   return res.json(appoitments)
  }

}
export default new AppoitmentsController();