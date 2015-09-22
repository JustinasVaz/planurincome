var updateCalendar = function () {
    $('#calendar').fullCalendar('refetchEvents');
};

Template.addEvent.events({
    'click #save': function (evt, tmpl) {
        if(Meteor.userId()){
            var item = {
                user: Meteor.userId(),
                title: tmpl.find('#title').value,
                start: Session.get('creating_calevent'),
                end: Session.get('creating_calevent'),
                amount: tmpl.find('#amount').value
            };
            Meteor.call('addNewEvent', item, function (error, result) {
                if (error) {
                    alert(error);
                }
                updateCalendar();
            });
            Session.set('editing_calevent', null);
            Session.set('showAddEvent', false);
        }else{
            alert('Please login.');
            Router.go('home');
        }
    },
    'click #cancel': function (evt, tmpl) {
        Session.set('showAddEvent', false);
    },
    'click .close': function (evt, tmpl) {
        Session.set('showAddEvent', false);
    }
});