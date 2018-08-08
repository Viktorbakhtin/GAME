import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {halfdb} from '../both/collection.js'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.subscribe("half.all");
});

Template.hello.helpers({
    counter() {
        console.log(halfdb.find().fetch())
        return halfdb.find().fetch().length;
    },
});

Template.hello.events({
    'click button'(event, instance) {

        Meteor.call("creategame")

    },


});
