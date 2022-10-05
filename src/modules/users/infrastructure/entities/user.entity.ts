import { Schema, Prop, ModelDefinition, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserModel } from '../../domain';

@Schema({ collection: 'users', versionKey: false })
export class UserEntity implements UserModel {
  readonly _id: Types.ObjectId;

  @Prop({ required: true, unique: true, index: 1 })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  nickName: string;

  @Prop({ type: Object })
  profile: {
    key: string;
    uri: string;
  };
}

export type UserDocument = UserEntity & Document;

export const UserModelDefinition: ModelDefinition = {
  name: UserEntity.name,
  schema: SchemaFactory.createForClass(UserEntity),
  collection: 'users',
};
