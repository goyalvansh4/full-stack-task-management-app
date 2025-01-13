const {mongoose,Schema} = require('mongoose');

const orderSchema = new Schema({
  userId: {type:Schema.Types.ObjectId, ref:'User', required:true},
  items: [
    {
      menuItemId: { type: Schema.Types.ObjectId, ref: 'Menu', required: true }, 
      quantity: { type: Number, required: true }, 
    },
  ],
  totalAmount: {type:Number, required:true},
  status: {type:String, required:true},
},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;
