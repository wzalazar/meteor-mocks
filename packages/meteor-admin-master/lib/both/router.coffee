Router.map -> 
  @route "adminDashboard",
    path: "/admin"
    template: "AdminDashboard"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe 'adminUsers',Meteor.subscribe 'adminAllCollections', Meteor.subscribe 'adminUser']
    action: ->
      Session.set 'admin_title', 'Dashboard'
      Session.set 'admin_collection', ''
      Session.set 'admin_collection_page', ''
      @render()
    # onBeforeAction: ->
      # AccountsEntry.signInRequired this
  @route "adminDashboardUsersNew",
    path: "/admin/Users/new"
    template: "AdminDashboardUsersNew"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe 'adminUsers', Meteor.subscribe 'adminUser']
    action: -> 
      Session.set 'admin_title', 'Users'
      Session.set 'admin_subtitle', 'Create new user'
      Session.set 'admin_collection_page', 'New'
      Session.set 'admin_collection', 'Users'
      @render()

  @route "adminDashboardUsersView",
    path: "/admin/Users/"
    template: "AdminDashboardUsersView"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe 'adminUsers', Meteor.subscribe 'adminUser']
    data: -> { users : Meteor.users.find({},{sort: {createdAt: -1}}).fetch() }
    action: -> 
      Session.set 'admin_title', 'Users'
      Session.set 'admin_subtitle', 'View users'
      Session.set 'admin_collection_page', ''
      Session.set 'admin_collection', 'Users'
      @render()

  @route "adminDashboardUsersEdit",
    path: "/admin/Users/:_id/edit"
    template: "AdminDashboardUsersEdit"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe 'adminUsers', Meteor.subscribe 'adminUser']
    data: ->
      user : Meteor.users.find({_id:@params._id}).fetch()
      roles: Roles.getRolesForUser @params._id
      otherRoles: _.difference _.map( Meteor.roles.find().fetch(), (role)-> role.name), Roles.getRolesForUser(@params._id)
    action: ->
      Session.set 'admin_title', 'Users'
      Session.set 'admin_subtitle', 'Edit user ' + @params._id
      Session.set 'admin_collection_page', 'edit'
      Session.set 'admin_collection', 'Users'
      Session.set 'admin_id', @params._id
      Session.set 'admin_doc', Meteor.users.findOne({_id:@params._id})
      @render()

  @route "adminDashboardView",
    path: "/admin/:collection/"
    template: "AdminDashboardView"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe('adminCollection', @params.collection), Meteor.subscribe('adminAuxCollections', @params.collection), Meteor.subscribe('adminUsers'), Meteor.subscribe 'adminUser']
    data: -> { documents : window[ @params.collection ].find({},{sort: {createdAt: -1}}).fetch() }
    action: -> 
      Session.set 'admin_title', AdminDashboard.collectionLabel(@params.collection)
      Session.set 'admin_subtitle', 'View '
      Session.set 'admin_collection_page', ''
      Session.set 'admin_collection', @params.collection.charAt(0).toUpperCase() + @params.collection.slice(1)
      @render()
    # onBeforeAction: ->
      # AccountsEntry.signInRequired this
  @route "adminDashboardNew",
    path: "/admin/:collection/new"
    template: "AdminDashboardNew"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe('adminAuxCollections', @params.collection), Meteor.subscribe('adminUsers'), Meteor.subscribe 'adminUser']
    action: ->
      Session.set 'admin_title', AdminDashboard.collectionLabel(@params.collection)
      Session.set 'admin_subtitle', 'Create new'
      Session.set 'admin_collection_page', 'new'
      Session.set 'admin_collection', @params.collection.charAt(0).toUpperCase() + @params.collection.slice(1)
      @render()
    # onBeforeAction: ->
      # AccountsEntry.signInRequired this
  @route "adminDashboardEdit",
    path: "/admin/:collection/:_id/edit"
    template: "AdminDashboardEdit"
    layoutTemplate: "AdminLayout"
    waitOn: ->
      [Meteor.subscribe('adminCollection', @params.collection), Meteor.subscribe('adminAuxCollections', @params.collection), Meteor.subscribe('adminUsers'), Meteor.subscribe 'adminUser']
    action: ->
      Session.set 'admin_title', AdminDashboard.collectionLabel(@params.collection)
      Session.set 'admin_subtitle', 'Edit ' + @params._id
      Session.set 'admin_collection_page', 'edit'
      Session.set 'admin_collection', @params.collection.charAt(0).toUpperCase() + @params.collection.slice(1)
      Session.set 'admin_id', @params._id
      Session.set 'admin_doc', window[@params.collection].findOne _id : @params._id
      @render()
    # onBeforeAction: ->
      # AccountsEntry.signInRequired this

Router.onBeforeAction AdminDashboard.checkAdmin, {only: AdminDashboard.adminRoutes}
Router.onBeforeAction AdminDashboard.clearAlerts, {only: AdminDashboard.adminRoutes}