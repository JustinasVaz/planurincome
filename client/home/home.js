Template.home.helpers({
    'days': function () {
        var today = new Date();

        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();

        var days = [];
        for (var i = 0; i < 30; i++) {
            var day = new Date(year, month - 1, date + i);
            var events = CalEvents.find({
                start: {$lte: day},
                user: Meteor.userId()
            });
            var sum = 0;
            events.forEach(function (evt) {
                sum = sum + parseInt(evt.amount);
            });

            var item = {
                day: day,
                amount: sum
            };
            days.push(item);
        }
        return days;
    },
    'User': function () {
        return Meteor.user();
    }

});