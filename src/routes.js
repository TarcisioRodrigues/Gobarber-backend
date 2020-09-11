import{Router} from 'express'
import User from './app/controllers/UserController'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
const routes=new Router();
//Users
routes.post('/users',UserController.store)
routes.put('/users',UserController.update)
//Session
routes.post('/sessions' ,authMiddleware,SessionController.store)

export default routes;
