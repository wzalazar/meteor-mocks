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
            console.log(Mocks.findOne({'_id':this.params._id}));
            return {
                mock: Mocks.findOne({'_id':this.params._id})
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


