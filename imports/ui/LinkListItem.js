import React from 'react';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

export default class LinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonValue: "Copy",
            button: "button button--pill"
        };

    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({
                buttonValue: "Copied",
                button: "button button--pill button--pill--hasBeenClicked"
            });
            setTimeout(() => this.setState({buttonValue: "Copy", button: "button button--pill"}), 3000)
        }).on('error', () => {
            console.log('Unable to copy, please do it manually.');
            this.setState({
                buttonValue: "Copy"
            });
        })
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderVariousStats() {

        const hasBeenVisitedMessage = this.props.visitedCount < 2 ? 'vue' : 'vues';
        let hasBeenVisited = this.props.lastVisitedAt ? `Last visit : ${moment(this.props.lastVisitedAt).format('DD MMMM YYYY - HH:mm:ss').toString()}, ${moment(this.props.lastVisitedAt).fromNow()}` : null;

        return (
            <div className="stats-block">
                <p className="stats-block__visits">{this.props.visitedCount} {hasBeenVisitedMessage} <span className="stats-block__visits__last-visit">({hasBeenVisited})</span></p>
                <p>Creation date : {moment(this.props.createAt).format('DD MMMM YYYY - HH:mm').toString()},  {moment(this.props.createAt).fromNow()}</p>
            </div>
        );
    }
    render() {
        return (
            <div className="link">
                <h2 className="link__title">{this.props.url}</h2>
                <p key={this.props._id} className="link__short-url">{this.props.shortUrl}</p>
                {this.renderVariousStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target='_blank'>Visit</a>
                <button ref="copy" data-clipboard-text={this.props.shortUrl} className={this.state.button}>{this.state.buttonValue}</button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVibility', this.props._id, !this.props.visible)
                }}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
                <button className="button button--pill" onClick={() => {
                  Meteor.call('links.remove', this.props._id)
                }}>Remove</button>
            </div>
        );
    }
}

LinkListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    createAt: React.PropTypes.number.isRequired,
    visitedCount: React.PropTypes.number.isRequired
}
