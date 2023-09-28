
import { Request, Response } from "express";
import {getRepository, Repository} from "typeorm";
import { User } from "../../entity/user/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController {
    public async authenticate(req: Request, res: Response): Promise<void> {
        const { name, password } = req.body;

        const userRepository: Repository<User> = getRepository(User.name);

        const user = await userRepository.findOne({ where: { name } });

        if (!user) {
            res.status(401).json({ message: "Неверные данные пользователя" });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Неверные данные пользователя" });
            return;
        }

        // Генерация JWT
        const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ 'access_token': token });
    }

}

export default new LoginController();
