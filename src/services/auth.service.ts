import { User } from '../models';

const getUserByFirebaseUId = (uid: string) => User.findOne({ firebaseUid: uid });

export { getUserByFirebaseUId };
