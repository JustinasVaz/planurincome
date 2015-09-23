Template.history.helpers({
    'Events': function () {
        return CalEvents.find();
    },
    'User': function(){
        return Meteor.user();
    }
});

Template.history.events({
    'click #reset': function (evt, tmpl) {
        Meteor.call('removeAllEvents');
    },
    'click .deleteEvent': function (evt, tmpl) {
        Meteor.call('removeEvent', this._id, function (error, result) {
            if (error) {
                alert(error);
            }
        });
    }
});

Template.history.rendered = function(){
  if(!Meteor.userId()){
      alert('Please login');
      Router.go('home');
  }

};

