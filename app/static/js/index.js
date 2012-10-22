$(document).ready(function () {
  $("#btn-join").click(function () {
    $("#join-modal").modal();
    $("#join-modal .btn-primary").click(function () {
      window.location = "/f/" + $("#join-modal input").val();
    });
  });
});