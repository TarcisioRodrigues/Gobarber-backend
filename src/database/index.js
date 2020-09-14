//Conexão com o banco de dados e carregando models
import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'
import File from '../app/models/File'
import Appointments from '../app/models/Appointments'
import databaseConfig from '../config/database';
const models=[User,File,Appointments];
class Database{
  constructor(){
      this.init();
      this.mongo();
  }
  init(){
    this.connection=new Sequelize(databaseConfig)
 
    models.map(model=>model.init(this.connection))
      models.map(model=>model.associate && model.associate(this.connection.models));
  }
  //Incluindo o mongoDB
  mongo(){
    this.mongoConnection=mongoose.connect('mongodb://localhost:27017/gobarber',{useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:true,
    }).then(res=>{
      console.log("DB Connected!")
}).catch(err => {
console.log(Error, err.message);
})

    
  }
}

export default new Database();