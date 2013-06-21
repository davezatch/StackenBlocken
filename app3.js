$(document).ready(function() {
    var finalScore = 0;
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
      var degree = Math.round((radians * (180 / Math.PI) * -1) + 100);
      // if (degree < 0) { degree = 360 + degree; }

      scores[pw[0].id] = degree;

      console.log(scores);

      $.each(scores, function(item) {
        finalScore += item.score;
        // console.log(finalScore);
      })

      $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');

      $("#angle").text(degree);
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

  

  function startGame() {
    handleMouse();
    setTimeout(function() {
        $(document).unbind('mousemove.rotate');
        $(".rotateme").unbind('mousedown');
    }, 100000);
        var count=100;

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

  $(document).mouseup(function(e) {
    $(document).unbind('mousemove.rotate');
  });
});