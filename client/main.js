import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './../imports/routes/Routes';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
    injectTapEventPlugin();
    Session.set('showVisible', true);
    ReactDOM.render(<Routes/>, document.getElementById('app'));
});
