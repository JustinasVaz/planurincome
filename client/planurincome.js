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