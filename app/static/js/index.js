$(document).ready(function () {
  var joinChannel = function(channel) {
    window.location = "/f/" + channel;
  };
  var submitJoin = function () {
    joinChannel($("#join-modal input").val());
  };
  $("#btn-join").click(function () {
    $("#join-modal").modal();
    $("#join-modal .btn-primary").click(function () {
      submitJoin();
    });
    $("#join-modal input").keypress(function (e) {
      if (e.which == 10 || e.which == 13) {
        submitJoin();
      }
    });
  });
});