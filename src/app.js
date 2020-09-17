import 'dotenv/config';

import 'express-async-errors';
import express from'express';
import path, { dirname } from'path';
import Youch from 'youch';
import * as Sentry from "@sentry/node";
import routes from './routes';
import sentryConfig from './config/sentry';
import './database';

class App{
  constructor(){
    this.server=express();

  Sentry.init(sentryConfig);
  
    this.middlewares();
    this.routes();
    this.exceptionHandle();
  }
  middlewares(){
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    //Usando a funcionalidade express static
    this.server.use('/files',express.static(path.resolve(__dirname,'..','tmp','uploads')));
  }
  routes(){
    this.server.use(routes);
   this,this.server.use(Sentry.Handlers.errorHandler());
  }
  //Função pra tratamento de erros e execessões
  exceptionHandle(){
    this.server.use(async(error,req,res,next)=>{
      if(process.env.NODE_ENV){
      const errors=await new Youch(err,req).toJSON();
      return res.status(500).json(errors);
    }
      return res.status(500).json({error:'Internal server error'});
    })
    
  }
}
export default new App().server;