//Configuração da parte de uploads de arquivos
import multer from 'multer';
import crypto from 'crypto';
import {extname,resolve} from 'path';

export default{
 //Configurando o diretorio de uploads e criptografando a imagem
  storage:multer.diskStorage({
    destination:resolve(__dirname,'..','..','tmp','upload'),
    filename:(req,file,cb)=>{
      crypto.randomBytes(16,(err,res)=>{
        if(err) return cb(err);
        return cb(null,res.toString('hex')+extname(file.originalname))
      })
    }
  }),
}