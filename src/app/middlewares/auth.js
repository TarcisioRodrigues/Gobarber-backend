//Autenticação
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
export default async(req,res,next)=>{
  const authHeader=req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({error:'Token not provider'});
  }
  //split serve pra dar um espaço
  const [,token]=authHeader.split('');
  try{
    //Metodo do jwt chamado verify
     const decoded=await promisify(jwt.verify)(token,authConfig.secret);
     req.userId=decoded.id;
  }catch(err){
    return res.status(401).json({error:'Token Invalid'});
  }
}