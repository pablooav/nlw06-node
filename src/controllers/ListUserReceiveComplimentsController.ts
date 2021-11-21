import {Request, Response} from "express";
import { ListUserreceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserreceiveComplimentsController {
  async handle(req: Request, res: Response) {
    const {user_id} = req

    const listUserreceiveComplimentsService = new ListUserreceiveComplimentsService();

    const compliments = await listUserreceiveComplimentsService.execute(user_id);

    return res.json(compliments)
  }
}

export { ListUserreceiveComplimentsController }