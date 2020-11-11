import mongoose from 'mongoose';

const securityQuestionsSchema = mongoose.Schema(
  {
    question: [String]
  },
  {
    collection: 'securityQuestions'
  }
);

const securityQuestion = mongoose.model('securityQuestion', securityQuestionsSchema);
export default securityQuestion;