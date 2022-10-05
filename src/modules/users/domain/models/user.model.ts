import { Types } from 'mongoose';

export interface UserModel {
  _id: string | Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  profile: {
    key: string;
    uri: string;
  };
}
