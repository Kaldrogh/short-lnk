import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Links} from '../api/links';
import LinkListItem from './LinkListItem';
import {Session} from 'meteor/session';
import SearchLink from './SearchLink';
import Fuse from 'fuse.js';
import FlipMove from 'react-flip-move';
import BindFactory from './../api/BindFactory';

export default class LinkList extends BindFactory {
    constructor(props) {
        super(props);
        this.state = {
            initialLinks: [],
            links: [],
            inputValue: ''
        };
        this._bind('onChange', 'cleanInput');
    }
    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');

            const links = Links.find({visible: Session.get('showVisible')}, { sort: {createAt: -1}}).fetch();
            this.setState({links: links, initialLinks : links});
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if (this.state.links.length === 0) {
                return (
                    <div>
                        <h2 className="link">{Session.get('showVisible') ? 'No links found' : 'No hidden links found'}</h2>
                    </div>
                );
        }
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
    }
    onChange(e) {
            this.setState({links: this.state.initialLinks});
        if(e.target.value === "") {
            return;
        }
        var fuse = new Fuse(this.state.links, { keys: ["url"]});
        var result = fuse.search(e.target.value);
        this.setState({
            inputValue: e.target.value,
            links: result
        });
    }
    cleanInput(e) {
        this.setState({
            inputValue: ''
        });
        e.target.value = "";
    }
    render() {
        return (
            <div>
              <div>
                  <SearchLink onChange={this.onChange} value={this.state.inputValue} onBlur={this.cleanInput}/>
              </div>
              <div>
                  <FlipMove maintainContainerHeight={true}>
                      {this.renderLinksListItems()}
                  </FlipMove>
              </div>
            </div>
        );
    }
}
