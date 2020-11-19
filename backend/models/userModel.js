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
      type: String,
      required: true
    },
    securityAnswer: {
      type: String,
      required: true,
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
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.compareAnswer = async function (enteredKey) {
  return await bcrypt.compare(enteredKey, this.securityAnswer);
}

userSchema.pre('save', async function (next) {
   this.securityAnswer = this.securityAnswer.toLowerCase();

  if (!this.isModified('password') && !this.isModified('securityAnswer')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.securityAnswer = await bcrypt.hash(this.securityAnswer, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
