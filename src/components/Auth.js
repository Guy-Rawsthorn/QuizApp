import React from 'react'

class Auth extends React.Component {
    onSubmit = () => {
        this.props.history.push('/')
    }
    render() {
        console.log(this.props);
        const { params } = this.props.match;
        return (
            <div>
            <h1>Users</h1>
            <h3>{params.id}</h3>
                <form>
                    <input placeholder="name" type="name" />
                    <input placeholder="email" type="email" />
                    <button onClick={() => this.onSubmit()}>Submit</button>
                </form>
                </div>
        )
    }
}
export default Auth