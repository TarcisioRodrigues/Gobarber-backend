//Importações
import{Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import User from './app/controllers/UserController'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppoitmentsController from './app/controllers/AppoitmentsController';

import authMiddleware from './app/middlewares/auth';
//Declarando as variáveis
const upload=multer(multerConfig)
const routes=new Router();

//Rotas

//Users
routes.post('/users',UserController.store)
routes.put('/users',UserController.update)
routes.use(authMiddleware);
//Providers
routes.get('/providers',ProviderController.index);
//Appoitments 
routes.post('/appoitments',AppoitmentsController.store);
routes.get('/appoitments',AppoitmentsController.index);

//Session
routes.post('/sessions' ,authMiddleware,SessionController.store);
//Upload
routes.post('/files',upload.single('file'),FileController.store);


export default routes;
