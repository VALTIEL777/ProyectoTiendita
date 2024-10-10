const User = require('../models/userModel');

class UserController {

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    }
    catch (error) {
      res.status(500).json({ error: error.message });

    }
  }

  static async create(data) {
    const { name, email } = data;
    const result = await pool.query('INSERT INTO users (nombre, email) VALUES ($1, $2) RETURNING *'
    [name, email]
    );
  }

  static async createUseradd(req, res) {
    try {
      const { name, email } = req.body;
      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const result = await User.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}



module.exports = UserController;