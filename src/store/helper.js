export const updateQuestion = (prevQuestions, updatedQuestion) => {
    console.log("helper funciton", prevQuestions, updatedQuestion)
    // const oldQuesitonObj = prevQuestions.filter(question => question.question === updatedQuestion.question);
    return prevQuestions.filter(question => question.question !== updatedQuestion.question).concat(updatedQuestion);
};