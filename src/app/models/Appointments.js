import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';
import { isBefore, subHours } from 'date-fns';
//Models Appoitments
class Appoitments extends Model{
  static init(sequelize){
    super.init(
      {
      date: Sequelize.STRING,
      canceled_at: Sequelize.STRING,
      past:{
        type:Sequelize.VIRTUAL,
        get(){
          return isBefore(this.date,new Date())
        }
      },
      cancelable:{
        type:sequelize.VIRTUAL,
        get(){
          return isBefore(new Date(),subHours(this.date,2));
        }
      },
      },
     
    {
      sequelize,
    }
    );
    
    return this;
  }
  //Metodo estatico que faz relacionamentos
  static associate(models){
    //as :passando um codinome para a chave estranjeira
    this.belongsTo(models.User,{foreignKey:'user_id',as:'user'});
    this.belongsTo(models.User,{foreignKey:'provider_id',as:'provider'});
  }
 
}
export default Appoitments;