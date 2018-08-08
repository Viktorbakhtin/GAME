import { Meteor } from 'meteor/meteor';
import { halfdb } from '../both/collection.js'

Meteor.startup(() => {
//     halfdb.insert({ text: 'Hello, world!', dsdw: 231 });
//
// const halftext = halfdb.find({ dsdw: 231}).fetch();
//
// console.log(halftext[0]);
// // code to run on server at startup
});

Meteor.publish("half.all", function () {
    return halfdb.find();
});

halfdb.allow({
    insert: function (userId, doc) { // добавление новых записей
        return true;
    },
    update: function (userId, doc, fields, modifier) { // изменение записей
        return false;
    },
    remove: function (userId, doc) { // удаление записей
        return false;                  // запрещено
    },
});

halfdb.deny({
});


Meteor.methods({
    creategame() {
        var userid = Meteor.user()._id;
        var data = halfdb.findOne({player2: ''});
        var notPlayer = halfdb.findOne({$or:[{player1: userid}, {player2: userid}]});
        if(notPlayer){
            return false;
        }
        if (data == undefined) {

            return halfdb.insert({player1: userid, player2: ""});

        } else {
            //console.log(data.player1 ,userid, data.player1 !== userid)
           return halfdb.update({_id: data._id}, {$set: {player2: userid}});

        }
    }

});