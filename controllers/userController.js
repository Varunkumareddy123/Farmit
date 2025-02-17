import signup from '../models/signup.js';
import bcrypt from 'bcryptjs';

class UserController {
  async getUserProfile(req, res) {
    try {
      const user = await signup.findById(req.user.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateUserProfile(req, res) {
    try {
      const updatedUser = await signup.findByIdAndUpdate(req.user.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

//    async changeUserPassword(req, res) {
//     const { oldPassword, newPassword } = req.body;
//     try {
//       const user = await signup.findById(req.user.id);
//       const isMatch = await bcrypt.compare(oldPassword, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });
      
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//       await user.save();
//       res.json({ message: 'Password updated' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// }


async changeUserPassword(req, res) {
  const {email, oldPassword, newPassword } = req.body;

  try {
    // Find user
    const user = await signup.findOne({email: email});
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    // Prevent reusing the same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) return res.status(400).json({ message: 'New password cannot be the same as the old password' });

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
}
export default new UserController();