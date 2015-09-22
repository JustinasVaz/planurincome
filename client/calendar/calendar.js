CalEvents = new Mongo.Collection('calevents');
Session.setDefault('editing_calevent', null);
Session.setDefault('creating_calevent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('showAddEvent', false);

var updateCalendar = function () {
    $('#calendar').fullCalendar('refetchEvents');
};

Template.calendar.helpers({
    'showEditEvent': function () {
        return Session.get('showEditEvent');
    },
    'showAddEvent': function () {
        return Session.get('showAddEvent');
    }
});

Template.calendar.rendered = function () {

    if (Meteor.userId()) {
        $('#calendar').fullCalendar('refetchEvents');
        $('#calendar').fullCalendar({
            dayClick: function (date, allDay, jsEvent, view) {
                Session.set('showAddEvent', true);
                Session.set('creating_calevent', date);
            },
            eventClick: function (calEvent, jsEvent, view) {
                Session.set('showEditEvent', true);
                Session.set('editing_calevent', calEvent.id);
            },
            eventDrop: function (calEvent) {
                var item = {
                    _id: calEvent.id,
                    start: calEvent.start,
                    end: calEvent.end
                };
                Meteor.call('changeDate', item, function (error, result) {
                    if (error) {
                        alert(error);
                    }
                });
            },
            events: function (start, end, callback) {
                var events = [];
                calEvents = CalEvents.find({"user": Meteor.userId()});
                calEvents.forEach(function (evt) {
                    events.push({
                        id: evt._id,
                        title: evt.title,
                        start: evt.start,
                        end: evt.end
                    })
                });
                callback(events);
            },
            eventRender: function (event, element) {
                var events = CalEvents.find({
                    start: {$lte: event.start},
                    user: Meteor.userId()
                });
                var sum = 0;
                events.forEach(function (evt) {
                    sum = sum + parseInt(evt.amount);
                });
                if (sum > 0) {
                    sum = '<span class="positive">' + sum + '</span>';
                } else {
                    sum = '<span class="negative">' + sum + '</span>';
                }
                return '<div class="event">' + event.title + ' ' + sum + '</div>';
            },
            editable: true
        });
        updateCalendar();
    }else{
        alert('Please login.');
        Router.go('home');
    }
};
