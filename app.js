$(document).ready(function() {
    var $container = $(".game-board");

    // initialize with scores at 0
    var scores = {
        "rotate1": 0,
        "rotate2": 0,
        "rotate3": 0,
        "rotate4": 0
    };

    function rotateOnMouse(e, shape) {

        // all the stuff we need to capture our mouse, locate it on the page, and calculate the degree of rotation
        var offset = shape.offset();
        var center_x = (offset.left) + ($(shape).width() / 2);
        var center_y = (offset.top) + ($(shape).height() / 2);
        var mouse_x = e.pageX;
        var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = Math.round((radians * (180 / Math.PI) * -1) + 180);

        // update the score in real time
        calculateScore(degree, shape);

        // rotate the shape by the mouse's degree to the center
        $(shape).css("-moz-transform", "rotate(" + degree + "deg)");
        $(shape).css("-webkit-transform", "rotate(" + degree + "deg)");
        $(shape).css("-o-transform", "rotate(" + degree + "deg)");
        $(shape).css("-ms-transform", "rotate(" + degree + "deg)");

    }

    var calibratedScore = 0;

    // run the score through a little magic to calculate
    function calculateScore(degree, shape) {

        calibratedScore = -(degree - 360) + 180;

        calibratedScore = (calibratedScore >= 360) ? calibratedScore - 360 : calibratedScore;

        scores[shape[0].id] = calibratedScore;
    }

    // capture mouse on click of one of our shapes and call the rotateMouse function
    function handleMouse() {
        $(".rotateme").mousedown(function(e) {
            e.preventDefault();
            var target = $(e.originalEvent.target);
            $(document).bind("mousemove.rotate", function(e2) {
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

        storeScores(finalScore);

        $("#score").text(finalScore);

        return;
    }

    function startGame() {
        // createBoard();
        handleMouse();

        // number of 'seconds' to display
        var count = 5;
        $("#timer").text(count);

        var counter = setInterval(timer, 1000); //1000 will run it every 1 second

        function timer() {
            count--;
            if (count <= 0) {
                clearInterval(counter);

                $(document).unbind("mousemove.rotate");
                $(".rotateme").unbind("mousedown");

                reportScore();

                $("#timer").text(0);

                return;
            }

            $("#timer").text(count);
        }
    }

    $(".start").click(function(e) {
        e.preventDefault();
        startGame();
    });

    $(document).mouseup(function() {
        $(document).unbind("mousemove.rotate");
    });

    var uberallColors = [
        "#3580f0",
        "#7c4080",
        "#ff4d4d",
        "#00a656",
        "#ffdd00"
    ];

    function randomUberallColor() {
        return uberallColors[Math.floor(Math.random()*uberallColors.length)];
    }

    function createShape(shapeOffsetX, shapeOffsetY, id) {
        var shape = $("<div class='rotateme' id='" + id + "'></div>");

        var randomWidth = Math.floor(Math.random() * 50) + 50;
        var randomHeight = randomWidth + Math.floor(Math.random() * 3) + 50;

        var rotateAmt = Math.floor(Math.random() * 300) + 60;

        shape.css({
            width: randomWidth,
            height: randomHeight,
            "background-color": randomUberallColor(),

            "left": function() {
                return Math.floor(Math.random()*100) + shapeOffsetX;
            },

            "top": function() {
                return Math.floor(Math.random()*100) + shapeOffsetY;
            },

            "-moz-transform": "rotate(" + rotateAmt + "deg)",
            "-webkit-transform": "rotate(" + rotateAmt + "deg)",
            "-o-transform": "rotate(" + rotateAmt + "deg)",
            "-ms-transform": "rotate(" + rotateAmt + "deg)",
            "transform": "rotate(" + rotateAmt + "deg)"
        });

        calculateScore(rotateAmt, shape);

        $container.append(shape);
    }

    $("#explanation-link").click(function() {
        $(".instructions").slideToggle();
    });

    $(".reset").click(function() {
        createBoard();
    });

    $(document).keypress(function(event) {
        if (event.target.tagName === "BODY") {
            switch(event.which)
            {
                // key: "g"
                case 103:   
                    startGame();
                    break;
                // key: "r"
                case 114:   
                    createBoard();
                    break;
            }

        }
    });

    function createBoard() {
        $container.empty();

        createShape(50, 50, 1);
        createShape(50, 300, 2);
        createShape(200, 200, 3);
        createShape(300, 50, 4);
        createShape(300, 300, 5);
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    function storeScores(newScore) {

        var currentScores = localStorage.getItem("score");

        currentScores = currentScores.split(",");


        for (var i = currentScores.length; i > 0; i--) {
            if (newScore < currentScores[i] && newScore !== currentScores[i]) {
                currentScores[i] = newScore;
                break;
            }
        }

        currentScores.sort(compareNumbers);

        displayScores(currentScores);

        localStorage.setItem("score", currentScores);

    }

    function displayScores(currentScores) {
        for (var j = currentScores.length; j > 0; j--) {
            $("#score" + j).text(currentScores[j - 1]);
        }
    }

    if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", [900, 900, 900]);
    }

    var scoresOnLoad = localStorage.getItem("score");

    scoresOnLoad = scoresOnLoad.split(",");

    displayScores(scoresOnLoad);

    createBoard();

});