
var usergrid_request = {
  username:"demo",
  password:"user123",
  orgName:"wesleyhales",
  appName:"sandbox",
  endpointName:"users",
  grant_type: "password"
};

window.UserGrid = Ember.Application.create();

UserGrid.deferReadiness();

jQuery.getJSON('https://api.usergrid.com/'+ usergrid_request.orgName +'/'+ usergrid_request.appName +'/token?username=' + usergrid_request.username + '&password=' + usergrid_request.password + '&grant_type=password', function(token) {
  console.log('token',token);
  UserGrid.token = token;
  UserGrid.advanceReadiness();
});

UserGrid.User = DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  title: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string')
});

UserGrid.Entities = DS.Model.extend({
  users: DS.hasMany(UserGrid.User)
});

var get = Ember.get, set = Ember.set, merge = Ember.merge;
UserGrid.RESTAdapter = DS.RESTAdapter.extend({
  url: 'https://api.usergrid.com/'+ usergrid_request.orgName +'/'+ usergrid_request.appName,
  ajax: function(url, type, hash) {
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;
    hash.data = {token:UserGrid.token.access_token};

    hash.url = url.replace('users',plurals.entity);

    jQuery.ajax(hash);
  },
  findAll: function(store, type, since) {
    var root = this.rootForType(type);
    this.ajax(this.buildURL(root), "GET", {
      data: this.sinceQuery(since),
      success: function(json) {
        atemp = {};
        atemp[plurals.entity] = json.entities;
        json = atemp;
        this.serializer.configurations.set('plurals',plurals);
        Ember.run(this, function(){
          this.didFindAll(store, type, json);
        });
      }
    });
  },
  deleteRecord: function(store, type, record) {
    var id = get(record, 'id');
    var root = this.rootForType(type);
    //added uuid manually after url build
    this.ajax(this.buildURL(root, id) + '/' + record._data.attributes.uuid, "DELETE", {
      context: this,
      success: function(json) {
        Ember.run(this, function(){
          this.didSaveRecord(store, type, record, json);
        });
      }
    });
  },
  createRecord: function(store, type, record) {
    console.log('+++++++',store, type, record)
    var root = this.rootForType(type);

    var data = {};
    data[root] = this.serialize(record, { includeId: true });
    console.log('+++++++',data)
    this.ajax(this.buildURL(root), "POST", {
      data: data.user,
      context: this,
      success: function(json) {
        Ember.run(this, function(){
          this.didCreateRecord(store, type, record, json);
        });
      },
      error: function(xhr) {
        this.didError(store, type, record, xhr);
      }
    });
  }

});

var plurals = {entity: 'users'};

UserGrid.RESTAdapter.configure('plurals',plurals);

UserGrid.RESTAdapter.map('UserGrid.User', {
  primaryKey: 'uuid'
});


UserGrid.Store = DS.Store.extend({
  revision: 12,
  adapter: UserGrid.RESTAdapter.create({
    bulkCommits: false
  })
});

UserGrid.Router.map(function() {
    this.resource("users", { path: '/' }, function(){
      this.route("user", { path: "/user/:user_id" });
    });
});

UserGrid.data = null;


UserGrid.UsersRoute = Ember.Route.extend({

});

UserGrid.UsersIndexRoute = Ember.Route.extend({
  model: function() {
    return UserGrid.User.find();
  },
  setupController: function(controller,model) {
    plurals = {entity: 'users'};
//    var users = UserGrid.User.find();
    this.controllerFor('users').set('users', model);
  }
});

UserGrid.UsersController = Ember.ArrayController.extend({
  endPointName : '',
  passed : false,
  content: [],
  addUser: function() {

   UserGrid.User.createRecord({
      name: "testuser",
      username: "auser2",
      password: "test"
    });
    console.log('-==-=-' + this.get('store'))
    // Save the new model
    this.get('store').commit();
  }
});

UserGrid.UserController = Ember.ObjectController.extend({
  content: [],
  removeUser: function() {
    var user = this.get('model');
    console.log('---user',user._data.attributes.uuid);
    user.deleteRecord();
    user.get('store').commit();
    this.get('target').transitionTo("users",UserGrid.User.find());
  }
});

UserGrid.MyTextField = Ember.TextField.extend({
  change: function() {
    var value = this.get('value');
    console.log(value,this.get('controller').get('endPointName'))
    this.get('controller').set('endPointName',value)
    if (!Ember.isEmpty(value)) {
//      this.get('controller').lookupData();
    }
  }.observes('value')
});

