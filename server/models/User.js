const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Prompt = require('./Prompt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Prefer Not To Say'], //options
    trim: true,
  },
  height: {
    type: String,
    minlength: 3,
  },
  location: {
    type: String,
    required: true,
  },
  job: {
    type: String,
  },
  hereFor: {
    type: String,
    enum: ['Romance', 'Friendship', 'Group Outtings', 'Relationship', 'Not Sure'], //options
    trim: true,
  },
  about: {
    type: String,
    maxlength: 255,
  },
  profileImage: {
    type: String, 
  },
  images: [{
    type: String,
  }],

  prompts: [Prompt.schema],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
