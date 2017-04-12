import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function() {
        return Links.find({userId: this.userId});
    });
}

Meteor.methods({
    'links.insert' (url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not logged in.');
        }

        new SimpleSchema({
            url: {
                min: 4,
                max: 200,
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({_id: shortid.generate(),url, userId: this.userId, visible: true, visitedCount: 0, lastVisitedAt: null, createAt: new Date().getTime()});
    },
    'links.setVibility'(_id, visible) {
        if(!this.userId) {
            throw new Meteor.Error("not-authorized", "You are not authorized to hide or unhide links.");
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({_id: _id, visible: visible});

        Links.update({ _id: _id, userId: this.userId}, {$set: {visible: visible}});
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id});

        Links.update({_id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    },
    'links.remove'(_id) {
      if(!this.userId) {
        throw new Meteor.Error("not-authorized", "you are not allowed to remove a link.");
      }
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({_id});
      Links.remove({_id});
    }
});
