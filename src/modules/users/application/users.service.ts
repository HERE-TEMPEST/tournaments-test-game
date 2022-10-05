import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AwsS3Service } from '@tournaments/aws/s3';

import { UserDomain, UserModel } from '../domain';
import { UserDocument, UserEntity } from '../infrastructure';
import {
  CreateUserParams,
  GetByEmailParams,
  GetByIdParams,
  GetProfileParams,
  GetProfileResult,
  GetUserInfoParams,
  UpdateProfileParams,
  UpdateProfileResult,
  UpdateUserParams,
} from './user-service.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly userDomain: UserDomain,
    @InjectModel(UserEntity.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserParams): Promise<UserModel> {
    const newUser = await this.userDomain.create(createUserDto);

    return this.userRepository.create(newUser);
  }

  async updateUser(params: UpdateUserParams): Promise<UserModel> {
    const { userId, properties } = params;

    const newUser = await this.userRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $set: { ...properties } },
    );

    return newUser;
  }

  async getByEmail(params: GetByEmailParams): Promise<UserModel> {
    const { email } = params;
    const user = await this.userRepository.findOne({ email });

    return user;
  }

  async getById(params: GetByIdParams): Promise<UserModel> {
    const { userId } = params;

    const user = await this.userRepository.findById(new Types.ObjectId(userId));

    return user;
  }

  async getUserInfo(params: GetUserInfoParams): Promise<UserModel> {
    const { userId } = params;

    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(userId),
    });

    return user;
  }

  async updateProfile(
    params: UpdateProfileParams,
  ): Promise<UpdateProfileResult> {
    const { profile, userId } = params;

    const uploadedProfile = await this.awsS3Service.putFile({
      file: profile,
      name: userId,
      subPath: 'profiles/',
    });

    const { key, uri } = await this.awsS3Service.getFileUri(uploadedProfile);

    await this.userRepository.findByIdAndUpdate(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          profile: {
            key,
            uri,
          },
        },
      },
    );

    return {
      key,
      uri,
    };
  }

  async getUserProfile(params: GetProfileParams): Promise<GetProfileResult> {
    const { userId } = params;

    const user = await this.userRepository.findById(new Types.ObjectId(userId));

    return user.profile;
  }
}
