// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Mongo.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    players: function () {
      return Players.find({}, { sort: { score: -1, name: 1 } });
    },
    selectedName: function () {
      var player = Players.findOne(Session.get("selectedPlayer"));
      return player && player.name;
    }
  });

  Template.leaderboard.events({
    'click .inc-mile': function () {
      Players.update(Session.get("selectedPlayer"), {$inc: {score: 1}});
    },
    'click .dec-mile': function () {
      Players.update(Session.get("selectedPlayer"), {$inc: {score: -1}});
    },
    'click .inc-half': function () {
      Players.update(Session.get("selectedPlayer"), {$inc: {score: .5}});
    },
    'click .dec-half': function () {
      Players.update(Session.get("selectedPlayer"), {$inc: {score: -.5}});
    },
    'click .add-player': function() {
      Players.insert({
      	name: $('.player-name').val(),
        score: 0
      });
      $('.player-name').val("");
    }
  });

  Template.player.helpers({
    selected: function () {
      return Session.equals("selectedPlayer", this._id) ? "selected" : '';
    },
    playerwins: function(score){
      return this.score > 50;
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selectedPlayer", this._id);
    }
  });
}
