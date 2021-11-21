import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

interface IPayload {
  sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  
  
  // Receber o token 
  const authToken = req.headers.authorization

  // Validar se o token esta preenchido
  if(!authToken) return res.status(401).end();
  
  // Validar se token é valido
  const [, token] = authToken.split(" ")
  try {
    const {sub} = verify(token, "ec78c3983e41e0016a79dec046d47673") as IPayload
    req.user_id = sub
    
    return next();
  } catch (error) {
    return res.status(401).end()
  }
  // Recuperar informações do usuário
  

  return next();
}