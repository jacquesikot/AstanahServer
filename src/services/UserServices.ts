import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { IUser } from '../types';
import { JWT_KEY } from '../constants';

const prisma = new PrismaClient();

export default class UserService {
  public async findUser(user_params: IUser) {
    let user = await prisma.app_users.findOne({
      where: { email: user_params.email },
    });
    return user;
  }

  public async findUserById(id: number) {
    let user = await prisma.app_users.findOne({ where: { id: id } });
    return user;
  }

  public async createUser(user_params: IUser) {
    const salt = await bcrypt.genSalt(10);
    user_params.password = await bcrypt.hash(user_params.password, salt);
    let user = await prisma.app_users.create({
      data: {
        first_name: user_params.first_name,
        last_name: user_params.last_name,
        email: user_params.email,
        password: user_params.password,
      },
    });
    return _.pick(user, ['ID', 'first_name', 'email']);
  }

  public async validatePassword(reqPassword: string, userPassword: string) {
    const validPassword = await bcrypt.compare(reqPassword, userPassword);
    if (!validPassword) return false;
    return true;
  }

  public async getToken(id: number | undefined) {
    const token = jwt.sign({ id: id }, JWT_KEY);
    return token.toString();
  }
}
