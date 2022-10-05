import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../domain';
import { FindByEmailParams, IUserRepository } from '../../domain/interfaces';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  findByEmail(params: FindByEmailParams): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
}
