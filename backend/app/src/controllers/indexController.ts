import {Request, Response} from "express";
import {User} from "../entity/user/user";

interface RequestWithUser extends Request {
    user?: User;
}

class IndexController {
    public async index(req: RequestWithUser, res: Response): Promise<void> {
        const user = req.user;

        res.json(user);
    }
}

export default new IndexController();