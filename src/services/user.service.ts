import { IUser, User } from '../models';

const getUserByFirebaseUId = (uid: string) => User.findOne({ firebaseUid: uid });

const createUser = (data: Partial<IUser>) => User.create(data);

export { getUserByFirebaseUId, createUser };
