import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';
//Classe User
class User extends Model{
  static init(sequelize){
    super.init(
      {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      //Virtual é um campo que nunca vai existe na base do banco de dados
      password:Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      provider:Sequelize.BOOLEAN,
    },
    {
      sequelize,
    }
    );
    // HOOK :Comando que disparar quando alguma função é acionada
    //Criptografando o password_hash
    this.addHook('beforeSave',async user=>{
     if(user.password){
       user.password_hash=await bcrypt.hash(user.password,8)
     }
    });
    return this;
  }
  //Metodo estatico que faz relacionamentos
  static associate(models){
    //as :passando um codinome para a chave estranjeira
    this.belongsTo(models.File,{foreignKey:'avatar_id',as:'avatar'});
  }
  //Metodo para checar a senha 
  checkPassword(password){
    return bcrypt.compare(password,this.password_hash);
  }
}
export default User;