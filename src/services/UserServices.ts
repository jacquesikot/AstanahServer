import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { IGoogleAuth, IUser } from '../types';
import { JWT_KEY } from '../constants';

const prisma = new PrismaClient();

interface UserUpdate {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default class UserService {
  public async findUser(user_params: IUser) {
    try {
      let user = await prisma.app_users.findOne({
        where: { email: user_params.email },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  public async findOauthUser(user_email: string) {
    try {
      let user = await prisma.app_users.findOne({
        where: { email: user_email },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  public async findUserById(id: number) {
    try {
      let user = await prisma.app_users.findOne({ where: { id: id } });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  public async createUser(user_params: IUser) {
    try {
      const salt = await bcrypt.genSalt(10);
      user_params.password = await bcrypt.hash(user_params.password, salt);
      let user = await prisma.app_users.create({
        data: {
          first_name: user_params.first_name,
          last_name: user_params.last_name || '',
          email: user_params.email,
          password: user_params.password,
          created_at: Date.now().toString(),
        },
      });
      return _.pick(user, ['id', 'first_name', 'last_name', 'email']);
    } catch (e) {
      console.log(e);
    }
  }

  public async createGoogleUser(user_params: IGoogleAuth) {
    try {
      const { id, firstName, lastName, email } = user_params;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(id, salt);

      let user = await prisma.app_users.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          google_id: id,
          password,
          created_at: Date.now().toString(),
        },
      });
      return _.pick(user, ['id', 'first_name', 'last_name', 'email']);
    } catch (e) {
      console.log(e);
    }
  }

  public async updateUser(user_params: UserUpdate) {
    try {
      const { id, first_name, last_name } = user_params;
      const user = await prisma.app_users.update({
        where: {
          id,
        },
        data: {
          first_name,
          last_name,
        },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  public async validatePassword(reqPassword: string, userPassword: string) {
    try {
      const validPassword = await bcrypt.compare(reqPassword, userPassword);
      if (!validPassword) return false;
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  public async getToken(user: any) {
    try {
      // try and type check this
      const { id, first_name, last_name, email } = user;
      const token = jwt.sign({ id, first_name, last_name, email }, JWT_KEY);
      return token.toString();
    } catch (e) {
      console.error(e);
    }
  }
}
