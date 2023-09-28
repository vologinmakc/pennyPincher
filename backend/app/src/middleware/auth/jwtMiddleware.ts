import {Request, Response, NextFunction} from 'express';
import {getRepository, Repository} from "typeorm";
import {User} from "../../entity/user/user";
import jwt from 'jsonwebtoken';

async function authenticateJWT(req: Request & { user?: User }, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id?: number };

            if (!decoded.id) {
                return res.sendStatus(403);
            }

            const userRepository: Repository<User> = getRepository(User.name);
            const user = await userRepository.findOne(decoded.id);

            if (!user) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        } catch (err) {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
}

export default authenticateJWT;
