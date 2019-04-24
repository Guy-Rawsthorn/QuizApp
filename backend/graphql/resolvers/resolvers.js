const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Questions = require('../models/questions');

module.exports = {
    questions: async () => {
        try {
            const questions = await Questions.find();
            return questions.map(questions => {
                return {
                    ...questions._doc,
                    _id : questions._doc._id.toString()
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createQuestion: async  (args) => {
        try {
        const createdQuestion = new Questions({
            question: args.questionInput.question,
            answer: args.questionInput.answer,
            isCorrect: false
        });
        const result = await createdQuestion.save();
        return {
            ...result._doc,
            _id: result._doc._id.toString(),
        };
    } catch (err) {
        throw err;
    }
    },
    updateQuestion: async (args) => {
        try {
            // Find question and change isCorrect
            const foundQuestion = await Questions.findById(args.updateQuestionInput.questionId);
            if (args.updateQuestionInput.isCorrect === true){
                if (foundQuestion.isCorrect === false) {
                    foundQuestion.isCorrect = args.updateQuestionInput.isCorrect
                }
            }
            await foundQuestion.save();
            return {
                _id: foundQuestion._id.toString(),
                question: foundQuestion.question,
                answer: foundQuestion.answer,
                isCorrect: foundQuestion.isCorrect
            }
        } catch (err) {
            throw err;
        }
    },
    deleteAllQuestions:  async (parent, args) => {
        await Questions.find().remove();
    },
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    ...user._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async (args) => {
        try {
            const user = await User.findOne({
                email: args.userInput.email
            });
            if(user) {
                throw new Error('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const createdUser = new User({
                email: args.userInput.email,
                password: hashedPassword,
                role: 'Customer'
            });
            const result = await createdUser.save();
            return {
                ...result._doc,
                _id: result.id,
                password: null
            };
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        // does user exist
        const user = await User.findOne({
            email: email
        });
        // no user found
        if (!user) {
            throw new Error('Authentication failed');
        }
        // validate password
        const isEqual = await bcrypt.compare(password, user.password);
        // check if password is incorrect
        if (!isEqual) {
            throw new Error('Authentication failed');
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.PRIVATE_KEY, {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        };
    }
};
