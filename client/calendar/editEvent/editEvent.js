var updateCalendar = function () {
    $('#calendar').fullCalendar('refetchEvents');
};

Template.editEvent.helpers({
    'evt': function () {
        return CalEvents.findOne({_id: Session.get('editing_calevent')});
    }
});

Template.editEvent.events({
    'click #save': function (evt, tmpl) {
        if(!Meteor.userId()){
            alert('Please login.');
            Router.go('home');
        }
        var item = {
            _id: Session.get('editing_calevent'),
            title: tmpl.find('#title').value,
            amount: tmpl.find('#amount').value
        };
        Meteor.call('updateEvent', item, function (error, result) {
            if (error) {
                alert(error);
            }
            updateCalendar();
        });
        Session.set('showEditEvent', false);
    },
    'click #cancel': function (evt, tmpl) {
        Session.set('showEditEvent', false);
    },
    'click .close': function (evt, tmpl) {
        Session.set('showEditEvent', false);
    },
    'click #delete': function (evt, tmpl) {
        Meteor.call('removeEvent', Session.get('editing_calevent'), function (error, result) {
            if (error) {
                alert(error);
            }
            updateCalendar();
        });
        Session.set('showEditEvent', false);
    }
});