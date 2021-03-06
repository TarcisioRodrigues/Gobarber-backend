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
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

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
//Available
routes.get('/providers:/providerId/available',AvailableController.index);
//Appoitments 
routes.post('/appoitments',AppoitmentsController.store);
routes.get('/appoitments',AppoitmentsController.index);
routes.delete('/appoitments/:id',AppoitmentsController.delete);

//Session
routes.post('/sessions' ,authMiddleware,SessionController.store);
//Upload
routes.post('/files',upload.single('file'),FileController.store);
//Schedule
routes.get('/schedule',ScheduleController.index);
//Notifications
routes.get('/notification',NotificationController.index)
routes.put('/notification/:id',NotificationController.update)
export default routes;
