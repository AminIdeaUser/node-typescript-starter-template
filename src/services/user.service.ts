import { IUser, User } from '../models';

const getUserByFirebaseUId = (uid: string) => User.findOne({ firebaseUid: uid });

const createUser = (data: Partial<IUser>) => User.create(data);

const updateUserById = (id: MongoObjectId, data: Partial<IUser>) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export { getUserByFirebaseUId, createUser, updateUserById };
