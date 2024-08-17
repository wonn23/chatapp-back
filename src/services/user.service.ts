import User, { IUser } from '../models/User';

export const UserService = {
  async saveUser(username: string, sid: string): Promise<IUser | null> {
    try {
      let user = await User.findOne({ name: username });

      if (!user) {
        user = new User({
          name: username,
          token: sid,
          online: true,
        });
      } else {
        user.token = sid;
        user.online = true;
      }

      await user.save();
      return user;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  async checkUser(sid: string): Promise<IUser | null> {
    const user = await User.findOne({ token: sid });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};
