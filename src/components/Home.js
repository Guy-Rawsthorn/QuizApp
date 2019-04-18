import React from 'react'
import './../index.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        console.log("yeye");
        this.props.findQuestions();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // if (!nextProps.loading){
            console.log("next props",nextProps)
        // }
    }

    state = {
        value: "",
        questions: [
            {q:"What is the capital city of Ukrain?",a:"Kiev", m: false},
            {q:"2+1",a:"3", m:false},
            {q:"3+1",a:"4", m:false}]
    };

    onInputChange(event) {
        this.state.questions.map((answer, i) => {
            let a = answer.a.toLowerCase();
            if (a === event.target.value.toLowerCase()) {
                console.log("answer is correct",a);
            }
        });
        this.setState({ value: event.target.value });

    }

    render() {
        let quiz = this.state.questions.map((questions, i) => {
            return(
            <tr key={i}>
                <td>{questions.q}</td>
                <td> {this.state.questions.m === true ? questions.a : null}</td>
            </tr>
            )
        }
        );

        return (
            <div>

                <div className="col-lg-1">
                </div>

                <div className="col-lg-10">
                    <h1>Quiz</h1>
                    <br/>
                    <input
                        type="text"
                        placeholder="Answer"
                        onChange={ this.onInputChange }>
                    </input>
                    <br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                        </tr>
                        </thead>
                            <tbody>
                                {quiz}
                            </tbody>
                    </table>
                    </div>
                <div className="col-lg-1">
                </div>
            </div>
    )
    }
}
const mapReduxStateToProps = state => {
    return {
        questions: state.questions.questions
    }
};

const mapDispatchToProps = dispatch => {
    return {
        findQuestions: () => dispatch(actions.findQuestions())
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Home);