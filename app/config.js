var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;


Tree.prototype.BFSelect = function(filter, depth) {
  var queue = new Queue();
  this.depth = depth || 0;
  var ans = [], current;
  queue.enqueue(this);

  while (current = queue.dequeue()) {
    if (filter(current.value, current.depth)) {
      ans.push(current.value);
    }
    for (var i = 0; i < current.children.length; i++) {
      var node = current.children[i];
      node.depth = current.depth + 1;
      queue.enqueue(node); 
    }
  }
  return ans;
};


var asyncMap = function(tasks, callback){
  var results =[];
  var runTasks = function(taskIndex) {
    tasks[taskIndex](function(thing) {
      results.push(thing);
      if (tasks[taskIndex + 1]) {
        runTasks(taskIndex + 1);
      } else {
        callback(results);
      }
    });
  }
  runTasks(0);
};  
