const {mongoose,Schema} = require('mongoose');

const orderSchema = new Schema({
  userId: {type:Schema.Types.ObjectId, ref:'User', required:true},
  items: [{type:Schema.Types.ObjectId, ref:'Menu', required:true}],
  totalAmount: {type:Number, required:true},
  status: {type:String, required:true},
},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;
