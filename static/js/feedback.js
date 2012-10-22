$(document).ready(function () {
  var posPoints = [];
  var negPoints = [];

  var posOptions = {
    chartRangeMin: 0,
    chartRangeMax: 100,
    lineColor: "#00bf00",
    fillColor: "#aaffaa",
    height: "200px"
  };
  var negOptions = {
    chartRangeMin: -100,
    chartRangeMax: 0,
    lineColor: "#ff0000",
    fillColor: "#eee",
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

  var onSliderChange = function() {
    var val = $("#control").slider("value");
    val -= 50;
    val *= 2.0;
    if (val < 0) {
      drawNeg(val);
      drawPos(0);
    } else {
      drawPos(val);
      drawNeg(0);
    }
  };
  var $control = $("#control");
  $control.slider();
  $control.slider("value", 50);

  setInterval(onSliderChange, 10);
});