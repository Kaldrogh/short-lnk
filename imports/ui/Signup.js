import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 9) {
            return this.setState({error: "Your password is too short. Must be more than 8 characters."});
        }
        Accounts.createUser({
            email,
            password
        }, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                  <h1>Join Short Lnk</h1>

                  {this.state.error
                      ? <p className="boxed-view__box__error">{this.state.error}</p>
                      : undefined}

                  <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                      <input type="email" ref="email" name="email" placeholder="Email"/>
                      <input type="password" ref="password" name="password" placeholder="password"/>
                      <button className="button">Create an account</button>
                  </form>
                  <Link to="/">Already have an account ?</Link>
                </div>
            </div>
        );
    }
}
