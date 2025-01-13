const {mongoose , Schema} = require('mongoose');

const userSchema = new Schema({
  username: {
    type:String, 
    required:true,
    unique: true,
  },
  password: {
    type:String, 
    required:true,
    validate:[
      function(password){
        return password.length >= 8;
      },
      'Password must be at least 6 characters long'
    ]
  },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;