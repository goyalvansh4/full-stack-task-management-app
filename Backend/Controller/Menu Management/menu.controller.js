const Menu = require('../../Models/menu.model');

const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({status:"success",menuItems});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

const createMenu = async (req, res) => {
  try {
    const { name, price , category , availability } = req.body;
    const menuItem = await Menu.create({name, price , category , availability});
    res.status(201).json({status:"success",message:"Menu item created successfully", menuItem});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const menuItem = await Menu.findByIdAndUpdate(id, {name, price}, {new:true});
    res.status(200).json({status:"success",message:"Menu item updated successfully", menuItem});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.status(200).json({status:"success",message:"Menu item deleted successfully"});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };