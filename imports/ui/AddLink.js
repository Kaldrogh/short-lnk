import React from 'react';
import BindFactory from '../api/BindFactory';
import Modal from 'react-modal';

export default class AddLink extends BindFactory {
    constructor(props) {
        super(props);
        this._bind('onSubmit', 'onChange', 'handleModalClose');
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
    }
    onChange(e) {
        this.setState({url: e.target.value})
    }
    onSubmit(e) {
        const {url} = this.state;
        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({error: err.reason});
            }
        });

    }
    handleModalClose() {
        this.setState({isOpen: false, url: '', error: ''});
    }
    render() {
        return (
            <div>
                <button className="button "onClick={() => this.setState({isOpen: true})}>+ Add a link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add a link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add a Link</h1>
                    {this.state.error ? <p className="boxed-view__box__error">{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange}/>
                        <button className="button">Submit</button>
                        <button type="button" className="button  button--secondary" onClick={this.handleModalClose}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}
