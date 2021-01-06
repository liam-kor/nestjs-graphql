import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PickType } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dto/edit-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async createUser({
    email,
    password,
  }: CreateUserDto): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email: email });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user tiwh tah email already',
        };
      }
      await this.users.save(this.users.create({ email, password }));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password.',
        };
      }
      const token = this.jwt.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  async findById(id: number) {
    return this.users.findOne({ id });
  }

  async editProfile(userId: number, { email, password }: EditProfileInput) {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
