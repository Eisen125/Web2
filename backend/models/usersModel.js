
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
      fireBaseId:String,  
      name: {
        type: String,
      },
      email: {
        type: String,
        required: false,
        unique: true,
      },
      password: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }  
  );
  
  const User = mongoose.model('User', userSchema);
  export default User;