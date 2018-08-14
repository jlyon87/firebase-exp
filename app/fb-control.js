var app = (function FirebaseAPI(app, fb) {
  var appUser = null;

  fb.initializeApp(app.config);

  fb.auth().onAuthStateChanged(function (user) {
    if (user) {
      appUser = user;
      console.log(appUser);
    } else {
      console.log('Signed out.');
      appUser = null;
    }
  });

  var db = fb.database();

  var signin = function () {
    fb.auth().signInAnonymously()
      .catch(function (err) {
        console.error('Error signing in: ', err);
      });
  };

  var createRoom = function(roomName) {
    var newRoom = {
      name: roomName,
      uid: appUser.uid
    };
    db.ref('rooms/').push(newRoom);
  };

  var monitorRooms = function() {
    db.ref('rooms/').on('value', function(snapshot) {
      console.log('rooms snap', snapshot.val());
    });
  };

  app.fb = {
    signin: signin,
    createRoom: createRoom,
    monitorRooms: monitorRooms
  };
  return app;
})(app || {}, firebase);