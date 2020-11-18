import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    securityQuestion: {
      type: [String],
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.comparePassword = async function (enteredKey) {
  return await bcrypt.compare(enteredKey, this.securityQuestion[1]);
};

userSchema.pre('save', async function (next) {
   this.securityQuestion[1] = this.securityQuestion[1].toLowerCase();

  if (!this.isModified('password') && !this.isModified('securityQuestion[1]')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.securityQuestion[1] = await bcrypt.hash(this.securityQuestion[1], salt);
});

const User = mongoose.model('User', userSchema);

export default User;
