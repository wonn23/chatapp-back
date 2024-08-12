import User from '../config/database/models/User';

export class userController {
  static saveUser = async (username: string, sid: string) => {
    try {
      console.log('컨트롤러', username, sid);
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
      console.log('User saved successfully', user);
      return user;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };
}
