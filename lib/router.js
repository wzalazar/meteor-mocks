Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    onRuningTemplate: 'loading',
    routeControllerNameConverter: "camelCase",
    waitOn: function() {

    }
});


Router.map(function() {
    this.route('website', {
        path: '/'
    });

    this.route('dashboard', {
        path: '/dashboard',
        yieldTemplates: {
            'listMock': {
                to: 'content'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('mocks');
        },
        data: function() {
        }
    });

    this.route('newMock', {
        path: 'dashboard/mock/new',
        layoutTemplate: 'dashboard',
        template:'newMock',
        yieldTemplates: {
            'newMock': {
                to: 'content'
            }
        },
        waitOn: function() {
            return [
               
            ];
        },
        data: function() {
            return {
              
            }
        },
        onRun: function() {
            
        }
    });

    this.route('editMock', {
        path: '/mock/:_id',
        layoutTemplate: 'dashboard',
        template:'editMock',
        yieldTemplates: {
            'editMock': {
                to: 'content'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('idMock',this.params._id);
        },
        data: function() {
            return {
                mock: Mocks.findOne({'_id':this.params._id})
            }
        }
    });

    this.route('newCron', {
        path: '/mock/:_id/newCron',
        layoutTemplate: 'dashboard',
        template:'newCron',
        yieldTemplates: {
            'newCron': {
                to: 'content'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('idMock',this.params._id);
        },
        data: function() {
            var mock= Mocks.findOne({'_id':this.params._id});
            console.log("mock ",mock);
            console.log(mock.responseBody);
            console.log(_.isObject(mock.responseBody));
            console.log(JSON.parse(mock.responseBody));
            var keys= _.keys(JSON.parse(mock.responseBody));
            return {
                keys:keys,
                mock: Mocks.findOne({'_id':this.params._id})
            }
        }
    });

    this.route('editCron', {
        path: '/mock/:_id/edit/:_idCron',
        layoutTemplate: 'dashboard',
        template:'editCron',
        yieldTemplates: {
            'editCron': {
                to: 'content'
            }
        },
        waitOn: function() {
            console.log("this.params._idCron ",this.params._idCron);
            return [Meteor.subscribe('idCron',this.params._idCron),Meteor.subscribe('idMock',this.params._id)];
        },
        data: function() {
            var mock= Mocks.findOne({'_id':this.params._id});
            console.log("mock ",mock);
            console.log(mock.responseBody);
            console.log(_.isObject(mock.responseBody));
            console.log(JSON.parse(mock.responseBody));
            var keys= _.keys(JSON.parse(mock.responseBody));
            return {
                keys:keys,
                cron: Crons.findOne({'_id':this.params._idCron})
            }
        }
    });

    this.route('crons', {
        path: '/mock/:_id/crons',
        layoutTemplate: 'dashboard',
        template:'listCrons',
        yieldTemplates: {
            'listCrons': {
                to: 'content'
            }
        },
        waitOn: function() {
            return [
                        Meteor.subscribe('idMock',this.params._id),
                        Meteor.subscribe('crons')
                   ];
        },
        data: function() {
            return {
                mock: Mocks.findOne({'_id':this.params._id}),
                crons: Crons.find({'mockId':this.params._id})
            }
        }
    });


 

});

var mustBeSignedIn = function(pause) {
    AccountsEntry.signInRequired(this);
};

Router.onBeforeAction(mustBeSignedIn, {
     except: ['entrySignIn','entrySignUp','entryForgotPassword','website']
});


