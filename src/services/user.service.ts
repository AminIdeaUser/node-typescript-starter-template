import { StandardUser, User, IAnyUser, IStandardUser } from '../models';

const getUserByFirebaseUId = (uid: string) => User.findOne({ firebaseUid: uid });

const createStandardUser = (data: Partial<IStandardUser>) => StandardUser.create(data);

const updateUserById = (id: MongoObjectId, data: Partial<IAnyUser>) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const updateStandardUserPreferences = (
  user: IStandardUser,
  preferencesToUpdate: IStandardUser['preferences']
) =>
  StandardUser.findByIdAndUpdate(
    user._id,
    {
      preferences: {
        ...user.toObject().preferences,
        ...preferencesToUpdate,
      },
    },
    { new: true, runValidators: true }
  );

export { getUserByFirebaseUId, createStandardUser, updateUserById, updateStandardUserPreferences };
