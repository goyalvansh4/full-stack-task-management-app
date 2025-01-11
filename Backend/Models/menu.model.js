const {mongoose,Schema} = require('mongoose');

const menuSchema = new Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
  category: {type:String, required:true},
  availability: {type:Boolean, required:true},
},{timestamps:true});

const Menu = mongoose.model('Menu',menuSchema);

module.exports = Menu;