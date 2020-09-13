import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';
//Models Appoitments
class Appoitments extends Model{
  static init(sequelize){
    super.init(
      {
      date: Sequelize.STRING,
      canceled_at: Sequelize.STRING,
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