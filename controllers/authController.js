import signup from '../models/signup.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class authController {
  async createUser(req, res) {
    const { firstName, lastName, email, password, role } = req.body;
    try {
      const existingUser = await signup.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new signup({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      });
      
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await signup.findOne({ email });
      if (!user) return res.status(400).json({ message: 'signup not found' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      console.log(isMatch);
      const token = jwt.sign({ userId: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async verifyId(req, res) {
    try {
        const user = await signup.findByIdAndUpdate(
          req.params.id,
          req.body,
          {  isVerified: true ,}
        );
        if (!user) {
          return res.status(404).json({ message: 'signup not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
       }
    }
}

export default new authController();