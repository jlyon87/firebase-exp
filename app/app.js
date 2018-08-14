var app = (function App(app, fb) {
  console.log('app', app);
  console.log('app', firebase);


  var createRoom = function() {
    var input = document.getElementById('roomName');
    var name = input.value;
    if(/[a-zA-Z]{2,}/.test(name)) {
      app.fb.createRoom(name);
    } else {
      alert('bad name');
    }
  };


  var init = function() {
    var roomBtn = document.getElementById('newRoom');
    roomBtn.addEventListener('click', createRoom);

    app.fb.monitorRooms();
  };
  init();

  return app;
})(app || {}, firebase);