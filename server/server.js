CalEvents = new Mongo.Collection('calevents');


if(Meteor.isServer){
    Meteor.methods({
        removeAllEvents: function (id) {
            return CalEvents.remove({user: id });
        },
        removeEvent: function (id) {
            return CalEvents.remove(id);
        },
        addNewEvent: function (item) {
            return CalEvents.insert(item);
        },
        updateEvent: function (item) {
            return CalEvents.update(item._id,{
                $set: {
                    title: item.title,
                    amount: item.amount
                }
            });
        },
        changeDate: function (item) {
            return CalEvents.update(item._id,{
                $set: {
                    start: item.start,
                    end: item.end
                }
            });
        }
    });
}



