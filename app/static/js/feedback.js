var UPDATE_FREQ = 250;
var SEND_FREQ = 1000;

$(document).ready(function () {

  var path = window.location.pathname;
  path = path.split('/');
  path = path[path.length-1];

  var socket = io.connect('/c/' + path);
  socket.on('average', function (data) {
    onDataChange(data);
  });

  var posPoints = [];
  var negPoints = [];
  var lastPoint = null;

  var posOptions = {
    chartRangeMin: 0,
    chartRangeMax: 100,
    lineColor: "#00bf00",
    fillColor: "#aaffaa",
    minSpotColor: "#0000f0",
    maxSpotColor: "#0000f0",
    height: "200px"
  };
  var negOptions = {
    chartRangeMin: -100,
    chartRangeMax: 0,
    lineColor: "#ff0000",
    fillColor: "#eee",
    minSpotColor: "#0000f0",
    maxSpotColor: "#0000f0",
    height: "200px"
  };

  var drawPos = function(point) {
    posPoints.push(point);
    var maxWidth = $("#feedback-graph-positive").parent().width();
    if (posPoints.length * 3 > maxWidth) {
      posPoints.splice(0, 1);
    }
    $("#feedback-graph-positive").sparkline(posPoints, posOptions);
  };

  var drawNeg = function(point) {
    negPoints.push(point);
    var maxWidth = $("#feedback-graph-negative").parent().width();
    if (negPoints.length * 3 > maxWidth) {
      negPoints.splice(0, 1);
    }
    $("#feedback-graph-negative").sparkline(negPoints, negOptions);
  };

  drawPos(0);
  drawNeg(0);

  var onDataChange = function(val) {
    lastPoint = val;
    if (val < 0) {
      drawNeg(val);
      drawPos(0);
    } else {
      drawPos(val);
      drawNeg(0);
    }
  };

  var fakeDraw = function() {
    if (lastPoint != null) {
      onDataChange(lastPoint);
    }
  }

  var sendSliderVal = function() {
    var val = $("#control").slider("value");
    val -= 50;
    val *= 2.0;
    socket.emit("value", val);
  };

  var $control = $("#control");
  $control.slider();
  $control.slider("value", 50);

  $("#btn-reset").click(function () {
    $("#control").slider("value", 50);
  });

  setInterval(sendSliderVal, SEND_FREQ);
  setInterval(fakeDraw, UPDATE_FREQ);
});