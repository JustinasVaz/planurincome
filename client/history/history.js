Template.history.helpers({
    'Events': function () {
        return CalEvents.find();
    }
});

Template.history.events({
    'click #reset': function (evt, tmpl) {
        Meteor.call('removeAllEvents');
    }
});

Template.history.rendered = function(){
  if(!Meteor.userId()){
      alert('Please login');
      Router.go('home');
  }

};

