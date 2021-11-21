import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { getCustomRepository } from "typeorm"


class ListUserreceiveComplimentsService{
  async execute(user_id: string) {

    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id
      }
    })

    return compliments;
  }
}

export { ListUserreceiveComplimentsService }