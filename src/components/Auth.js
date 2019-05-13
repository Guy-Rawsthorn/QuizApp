import React from 'react'
import * as actions from "../store/actions";
import {connect} from "react-redux";

class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleInputChanged = this.handleInputChanged.bind(this);

    }

    onSubmit = (event) => {
        console.log('1');
        const auth = 'auth';
        this.props.onAuth('t@t.com', 'test','Guy', auth);
        event.preventDefault();
    };

    handleInputChanged(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {
        console.log(this.props);
        // const { params } = this.props.match;
        return (
            <div id="homeWrapper">
                <div className="container">
                    <form onSubmit={this.onSubmit} className="text-white">
                        {/* Email Section*/}
                        <div className="form-group">
                            <div className="form-label-group">
                                <input
                                    type="email"
                                    name="email"
                                    id="inputEmail"
                                    value={this.state.email}
                                    onChange={this.handleInputChanged}
                                    className="form-control text-center"
                                    placeholder="Email address"
                                    required="required"
                                    autoFocus="autoFocus"
                                />
                            </div>
                        </div>
                        {/* Password Section */}
                        <div className="form-group">
                            <div className="form-label-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChanged}
                                    id="inputPassword"
                                    className="form-control text-center"
                                    placeholder="Password"
                                    required="required"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="checkbox"/>
                        </div>
                        {/* <div className=""> */}
                        {/* <Link to="/dashboard"> */}
                        <input
                            className="btn btn-primary btn-block "
                            type="submit"
                            value="Login"
                            id="submit"
                        />
                        {/* </Link> */}
                        {/* </div> */}

                        {/* <a className="btn btn-primary btn-block" type="submit" value="Login" id="submit">Login</a> */}
                    </form>
                    <div className="text-center">
                        <a className="d-block small mt-3" href="register.html">
                            Register an Account
                        </a>
                        <a className="d-block small" href="forgot-password.html">
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>

        )
    }
}
const mapReduxStateToProps = state => {
    return {
        userId: state.auth.userId,
        name: state.auth.name,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name, isSignUp) => dispatch(actions.auth(email, password, name, isSignUp))
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Auth);