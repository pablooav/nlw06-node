import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_reciver: string;
  message: string;
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_reciver, message}: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories) 
    const userRepository = getCustomRepository(UsersRepositories)

    if(user_sender === user_reciver) throw new Error("Incorrect User Reciver!");

    const userReciverExists = await userRepository.findOne(user_reciver)
    if(!userReciverExists) throw new Error("User reciver does not exist!");

    const compliment = complimentsRepository.create({
      tag_id,
      user_reciver,
      user_sender,
      message
    })

    await complimentsRepository.save(compliment)

    return compliment

    
  }
}

export { CreateComplimentService } 