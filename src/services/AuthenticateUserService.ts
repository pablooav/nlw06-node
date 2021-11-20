import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
  email: string,
  password: string
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {

    const userRepositories = getCustomRepository(UsersRepositories)

    //Verificar se email existe
    const user = await userRepositories.findOne({ email })
    if(!user) throw new Error('Email/Password incorrect')
    
    //Verificar se senha ta certa
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) throw new Error('Email/Password incorrect')

    //Gerar token
    const token = sign({
      email: user.email
    }, 
    "ec78c3983e41e0016a79dec046d47673",
    {
      subject: user.id,
      expiresIn: "1d",
    }
    )
    return token
  }
}


export { AuthenticateUserService }