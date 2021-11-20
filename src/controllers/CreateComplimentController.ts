import {Request, Response} from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";




class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const {tag_id, user_sender, user_reciver, message} = req.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id, 
      user_sender, 
      user_reciver, 
      message
    });

    return res.json(compliment)
  }
}

export { CreateComplimentController }