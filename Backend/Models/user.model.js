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
    minlength: 8,
    validate: {
      validator: function (value) {
        // Ensure the password has at least one uppercase letter, one lowercase letter, one digit, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message: (props) => `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
    },
  },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;