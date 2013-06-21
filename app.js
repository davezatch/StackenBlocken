$(document).ready(function() {
    var $container = $(".container");
    var scores = {
        "rotate1": 0,
        "rotate2": 0,
        "rotate3": 0,
        "rotate4": 0
    }
  // the same as yours.
  function rotateOnMouse(e, pw) {
    // console.log(e.target);
      var offset = pw.offset();
      var center_x = (offset.left) + ($(pw).width() / 2);
      var center_y = (offset.top) + ($(pw).height() / 2);
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
      var degree = Math.round((radians * (180 / Math.PI) * -1) + 180);
      // if (degree < 0) { degree = 360 + degree; }

      var calibratedScore = 0;

      calibratedScore = -(degree - 360) + 180;

      calibratedScore = (calibratedScore >= 360) ? calibratedScore - 360 : calibratedScore;

      console.log(calibratedScore);

      scores[pw[0].id] = calibratedScore;

      $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');

      // $("#angle").text(degree);
  }

  function handleMouse() {
      $('.rotateme').mousedown(function(e) {
        e.preventDefault();
          var target = $(e.originalEvent.target);
        $(document).bind('mousemove.rotate', function(e2) {
          // console.log($('.rotateme'));
          if (target.hasClass("rotateme")) {
            rotateOnMouse(e2, target);
            
          }
        });
      });
  }

  function reportScore() {
    var finalScore = 0;
    $.each(scores, function(key, value) {
      // tweak score because we're actually centering at 180, not 0 degrees
      if (value >= 180) {
        finalScore = finalScore + value - 180;
      } else {
        finalScore = finalScore + 180 - value;
      }
    });
    finalScore = finalScore - 720;
    $("#score").text(finalScore);
    // return finalScore;
  }

  $(".score").click(function(e) {
    e.preventDefault();
    reportScore();
  });

  function startGame() {
    handleMouse();
    setTimeout(function() {
        $(document).unbind('mousemove.rotate');
        $(".rotateme").unbind('mousedown');
        reportScore()
    }, 10000);
        var count=10;

        var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

        function timer()
        {
          count=count-1;
          if (count <= 0)
          {
             clearInterval(counter);
             return;
          }

          $("#timer").text(count);
        }
    }

  $(".start").click(function(e) {
    e.preventDefault();
    startGame();
  });

  // $(".start").click();

  $(document).mouseup(function(e) {
    $(document).unbind('mousemove.rotate');
  });

  function randomColor() {
    var color = 'rgb(' + Math.floor(Math.random()*255) + ',' +
                            Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
    color = toHex(color);
    return "#" + color;
  }

  function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(rgbArr) {
    var result = "";
    for (var i = 0; i < rgbArr.length; i++) {
        result += componentToHex(parseInt(rgbArr[i]));
    }
    return result;
  }

  function toHex(rgb) {
    rgb = rgb.slice(4, -1);
    rgb = rgb.split(",");
    return rgbToHex(rgb);
  }

  // var shapeOffset = 40;

  function createShape(shapeOffsetX, shapeOffsetY) {
    var shape = $("<div class='rotateme'></div>");

    var randomWidth = Math.floor(Math.random() * 50) + 50;
    var randomHeight = randomWidth + Math.floor(Math.random() * 3) + 50;

    var rotateAmt = Math.floor(Math.random() * 300) + 60;

    shape.css({
      width: randomWidth,
      height: randomHeight,
      "background-color": randomColor(),

      "left": function() {
        return Math.floor(Math.random()*100) + shapeOffsetX;
      },

      "top": function() {
        return Math.floor(Math.random()*100) + shapeOffsetY;
      },

      '-moz-transform': 'rotate(' + rotateAmt + 'deg)',
      '-webkit-transform': 'rotate(' + rotateAmt + 'deg)',
      '-o-transform': 'rotate(' + rotateAmt + 'deg)',
      '-ms-transform': 'rotate(' + rotateAmt + 'deg)'
      // "transform": "rotate(" + rotateAmt + ")"
    });

    var zoneBox = $("<div class='zone'></div>");

    zoneBox.css({
      width: shape.width() + 6,
      height: shape.height() + 6,
      left: parseInt(shape.css("left")) - 3,
      top: parseInt(shape.css("top")) - 3
    });

    $container.append(zoneBox);

    $container.append(shape);
  }

  $(".reset").click(function() {
    createBoard();
  });

  function createBoard() {
    $container.empty();
    createShape(50, 50);
    createShape(50, 300);
    createShape(300, 50);
    createShape(300, 300);
  }

  createBoard();

});