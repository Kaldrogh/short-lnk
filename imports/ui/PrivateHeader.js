import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import {withRouter} from "react-router-dom";

class PrivateHeader extends Component {
  constructor(props) {
    super(props);
    this.LogOut = this.LogOut.bind(this);
  }
  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.push("/");
    }
  }
  LogOut() {
    Accounts.logout(() => {
      this.props.history.push("/");
    });
  }
  render() {
    return (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">{this.props.title}</h1>
          <button className="button button--link-text" onClick={() => this.LogOut()}>Logout</button>
        </div>
      </div>
    );
  }
}


PrivateHeader.propTypes = {
title: React.PropTypes.string.isRequired
}

const PrivateHeaderWithRouter = withRouter(PrivateHeader);
export default PrivateHeaderWithRouter;
