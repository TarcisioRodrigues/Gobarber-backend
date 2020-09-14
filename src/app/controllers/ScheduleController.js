import {startOfDay,endOfDay,parseISO} from 'date-fns';
import{Op} from 'sequelize';
import Appoitments from '../models/Appointments';
import User from '../models/User';
class ScheduleController{
  async index(req,res){
    //Metodo de listagem com condições
    const checkUserProvider=await User.findOne({
      where:{id:req.userId,provider:true},
   
    });
    if(!checkUserProvider){
        return res.status(400).json({error:'User is not a provider'});
    }
    const {date}=req.query
    const parseDate=parseISO(date);
    //Pegar todos os agendamentos da hora
    //2019-06-22 00:00:00
    //2019-06-22 23:59:50
    const appointments=await Appoitments.findAll({
      where:{
        provider_id:req.userId,
        canceled_at:null,
        date:{
          [Op.between]:[
            startOfDay(parseDate),
            endOfDay(parseDate),
          ]
        },
      },
      order:['date'],
    })
    return res.json({date});
  }

  }
  
  export default  new ScheduleController();