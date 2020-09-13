//Importações
import{Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import User from './app/controllers/UserController'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
//Declarando as variáveis
const upload=multer(multerConfig)
const routes=new Router();
//Users
routes.post('/users',UserController.store)
routes.put('/users',UserController.update)
routes.use(authMiddleware);
//Session
routes.post('/sessions' ,authMiddleware,SessionController.store)
//Upload
routes.post('/files',upload.single('file'),(req,res)=>{
  return res.json({ok:true});
})
export default routes;
