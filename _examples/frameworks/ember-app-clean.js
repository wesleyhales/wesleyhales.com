//http://stackoverflow.com/questions/15220928/ember-data-find-by-id-and-using-filters

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

UserGrid.Entity = DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  title: DS.attr('string'),
  username: DS.attr('string')
});

UserGrid.Entities = DS.Model.extend({
  entities: DS.hasMany(UserGrid.Entity)
});


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
  }

});

var plurals = {entity: 'users'};

UserGrid.RESTAdapter.configure('plurals',plurals);

UserGrid.RESTAdapter.map('UserGrid.Entity', {
  primaryKey: 'uuid'
});


UserGrid.Store = DS.Store.extend({
  revision: 12,
  adapter: UserGrid.RESTAdapter.create({
    bulkCommits: false
  })
});

UserGrid.Router.map(function() {
  this.resource('entities', { path: '/' }, function() {
    this.route('active');
  });
});

UserGrid.data = null;

UserGrid.EntitiesIndexRoute = Ember.Route.extend({
  setupController: function(controller,model) {
    plurals = {entity: 'users'};
    var users = UserGrid.Entity.find();
    this.controllerFor('entities').set('entities', users);
  }
});

UserGrid.EntitiesController = Ember.ArrayController.extend({
  endPointName : '',
  passed : false,
  lookupData: function() {
    plurals.entity = this.endPointName;

    UserGrid.reset();

    //this.entities = UserGrid.Entity.find();
    //this.set('entities', this.entities)
  }

});

UserGrid.MyTextField = Ember.TextField.extend({
//would work if we weren't resetting the app
//  change: function() {
//    var value = this.get('value');
//    console.log(value,this.get('controller').get('endPointName'))
//    this.get('controller').set('endPointName',value)
//    if (!Ember.isEmpty(value)) {
//      this.get('controller').lookupData();
//    }
//  }.observes('value')
});

