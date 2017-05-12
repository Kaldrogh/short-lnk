import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      error: ''
    };
  }
   componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.push("/links");
    }
  }
  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if(err) {
        this.setState({error: 'Unable to login. Check your credentials.'});
      } else {
        this.setState({error: ''});
        this.props.history.push("/links");
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>

          {this.state.error ? <p className="boxed-view__box__error">{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Not registered yet?</Link>
        </div>
      </div>
    );
  }
}

const LoginWithRouter = withRouter(Login);
export default LoginWithRouter;
