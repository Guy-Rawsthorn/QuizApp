const {buildSchema} = require('graphql');

module.exports = buildSchema(`

     type User {
            _id: ID!
            email: String!
            password: String
        }
       
     type Question{
        _id: ID!
        question: String!
        answer: String!
        isCorrect: Boolean
     }
     
     input QuestionInput {
        question: String!
        answer: String!
     }
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        type RootQuery {
           questions: [Question]!
           login(email: String!, password: String!): AuthData!
        }
        
        input UpdateQuestionInput {
            questionId: ID!
            isCorrect: Boolean!
        }
        
        type RootMutation {
            createQuestion(questionInput: QuestionInput): Question
            updateQuestion(updateQuestionInput: UpdateQuestionInput): Question
            createUser(userInput: UserInput): User
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);
