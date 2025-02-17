import farmer from '../models/farmer.js';
import signup from '../models/signup.js';

class FarmController {
  async getMyFarms(req, res) {
    try {
      const farms = await farmer.find(req.body);
      res.json(farms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createFarm(req, res) {
    try {
      const user = new farmer(req.body);
      const saveUser = await user.save();
      res.status(201).json(saveUser)
  }
  catch (err) {
      res.status(401)
          .json({
              message: err.message
      
          });
        }
      }


  async updateFarm(req, res) {
    try {
      const farm = await farmer.findById(req.params.id);
      if (!farm) return res.status(404).json({ message: 'farmer not found' });

      const updatedFarm = await farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedFarm);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

export default new FarmController();