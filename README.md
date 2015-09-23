# Plan Your Income
[Live!](http://planurincome.meteor.com/)
##Meteor js calendar app using fullcalendar

### Packages:

* iron:router
* accounts-password
* accounts-ui
* jquery
* twbs:bootstrap
* mrt:fullcalendar
* zimme:active-route

### Routes:

```javascript
Router.map(function () {
    this.route('home', {
        path: '/',
        layoutTemplate: 'home'
    });
    this.route('calendar', {
        path: '/calendar',
        layoutTemplate: 'calendar'
    });
    this.route('history', {
        path: '/history',
        layoutTemplate: 'history'
    });
});
```

### FullCalendar part:
```javascript
Template.calendar.rendered = function () {
    if (Meteor.userId()) {
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
                return '<div class="event">' + event.title + ' - Left with: ' + sum + '</div>';
            },
            editable: true
        });
        updateCalendar();
    } else {
        Router.go('home');
    }
};
```


