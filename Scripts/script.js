/// <reference path="./jquery-2.1.0-vsdoc.js" />
/// <reference path="./functions.js" />
$.ajax({
    url: "./home.html",
    cache: false,
    success: function (xData) {
        sleep(2000);
        $("div.container").empty().prepend(xData);
        init();
        homeLoaded();
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh')
        })
    }
});
var noOfTimesSubmitButtonClicked = 0;
var invalidEmail = false;
function homeLoaded() {
    $downloadLink = $("#downloadResume");
    var timerId = setInterval(function () {
        $downloadLink.addClass("active");
        setTimeout(function () {
            $downloadLink.removeClass("active");
        }, 500);
    }, 4000);
    $downloadLink.click(function () {
        clearInterval(timerId);
        $downloadLink.removeClass("active");
    });
    $("div#successSubmission").hide();
    $("div#failureSubmission").hide();
    $("div#invalidEmail").hide();
    $("div#onceSubmission").hide();

}
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
//$("#sendMsgBtn").click(function () {
function sendMsg() {
    invalidEmail = !(validateEmail($("#email").val()));
    if ($("#email").val() == "") { invalidEmail = false }
    noOfTimesSubmitButtonClicked++;
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>\
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
            <soap:Body>\
              <InsertIntoContacts xmlns="http://tempuri.org/">\
                <name>'+ $("#name").val() + '</name>\
                <email>' + $("#email").val() + '</email>\
                <message>' + $("#message").val() + '</message>\
             </InsertIntoContacts>\
           </soap:Body>\
       </soap:Envelope>';
    if (noOfTimesSubmitButtonClicked > 1) {
        $("div#onceSubmission").show();
        $("div#successSubmission").hide();
        $("div#failureSubmission").hide();
        $("div#invalidEmail").hide();
    }
    else if (invalidEmail) {
        $("div#invalidEmail").show();
        noOfTimesSubmitButtonClicked--;
    }
    else {
        $("div#invalidEmail").hide();
        $.ajax({
            url: "../WebService/contacts.asmx",
            type: "POST",
            data: soapRequest,
            contentType: "text/xml; charset=utf-8",
            dataType: "xml",
            processData: false,
            error: function (xData, status) { $("#failureSubmission").show(); },
            success: function (xData, status) { $("#successSubmission").show(); }
        });
    }
}

///Script for drawing canvas starts here
var angle = 0;
function drawCanvas() {
    var canvas = document.getElementById("canvas");
    //var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth = 5;
    context.lineCap = "round";
    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(250, 250);
        context.lineTo(((200 - 0) * Math.cos(Math.PI * angle / 180)) + 250, ((200 - 0) * Math.sin(Math.PI * angle / 180)) + 250);

        if (angle == 359) {
            angle = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
        }
        context.stroke();
        angle = angle + 1;
    }, 10);
}

///End of script for canvas

// animation globals
var t = 0;
var frameInterval = 25; // in ms
var canvas = null; // canvas DOM object
var context = null; // canvas context

// ball globals
var ballRadius = 10;

// physics globals
var collisionDamper = 0.3;
var floorFriction = 0.0005 * frameInterval;
var mouseForceMultiplier = 1 * frameInterval;
var restoreForce = 0.002 * frameInterval;

var mouseX = 99999;
var mouseY = 99999;

var balls = null;

function Ball(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;

    this.origX = x;
    this.origY = y;
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.font = "120px Comic Sans MS";
    initStageObjects();
    setInterval(updateStage, frameInterval);
}

function updateStage() {
    t += frameInterval;
    clearCanvas();
    updateStageObjects();
    drawStageObjects();
}

function initStageObjects() {
    balls = new Array();

    var blue = "#0000FF";
    var red = "#EF2B36";
    var yellow = "#CC6600";
    var green = "#02A817";

    //K
    balls.push(new Ball(70, 30, 0, 0, blue));
    balls.push(new Ball(70, 50, 0, 0, blue));
    balls.push(new Ball(70, 70, 0, 0, blue));
    balls.push(new Ball(70, 90, 0, 0, blue));
    balls.push(new Ball(70, 110, 0, 0, blue));
    balls.push(new Ball(70, 130, 0, 0, blue));
    balls.push(new Ball(70, 150, 0, 0, blue));
    balls.push(new Ball(90, 90, 0, 0, blue));
    balls.push(new Ball(100, 80, 0, 0, blue));
    balls.push(new Ball(110, 70, 0, 0, blue));
    balls.push(new Ball(120, 60, 0, 0, blue));
    balls.push(new Ball(130, 50, 0, 0, blue));
    balls.push(new Ball(140, 40, 0, 0, blue));
    balls.push(new Ball(100, 100, 0, 0, blue));
    balls.push(new Ball(110, 110, 0, 0, blue));
    balls.push(new Ball(120, 120, 0, 0, blue));
    balls.push(new Ball(130, 130, 0, 0, blue));
    balls.push(new Ball(140, 140, 0, 0, blue));

    //i
    balls.push(new Ball(420, 60, 0, 0, yellow));
    balls.push(new Ball(420, 100, 0, 0, yellow));
    balls.push(new Ball(420, 120, 0, 0, yellow));
    balls.push(new Ball(420, 140, 0, 0, yellow));

    //k
    balls.push(new Ball(460, 60, 0, 0, red));
    balls.push(new Ball(460, 80, 0, 0, red));
    balls.push(new Ball(460, 100, 0, 0, red));
    balls.push(new Ball(460, 120, 0, 0, red));
    balls.push(new Ball(460, 140, 0, 0, red));
    balls.push(new Ball(480, 100, 0, 0, red));
    balls.push(new Ball(490, 90, 0, 0, red));
    balls.push(new Ball(500, 80, 0, 0, red));
    balls.push(new Ball(510, 70, 0, 0, red));
    balls.push(new Ball(520, 60, 0, 0, red));
    //
    balls.push(new Ball(470, 110, 0, 0, red));
    balls.push(new Ball(490, 110, 0, 0, red));
    balls.push(new Ball(500, 120, 0, 0, red));
    balls.push(new Ball(510, 130, 0, 0, red));
    balls.push(new Ball(520, 140, 0, 0, red));
}

function drawStageObjects() {
    for (var n = 0; n < balls.length; n++) {
        context.beginPath();
        context.arc(balls[n].x, balls[n].y, ballRadius,
			0, 2 * Math.PI, false);
        context.fillStyle = balls[n].color;
        context.fill();
    }
    var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("0.5", "yellow");
    gradient.addColorStop("1.0", "red");
    context.fillStyle = gradient;
    context.fillText("arth", 160, 140);

}

function updateStageObjects() {
    for (var n = 0; n < balls.length; n++) {

        // set ball position based on velocity
        balls[n].y += balls[n].vy;
        balls[n].x += balls[n].vx;

        // restore forces



        if (balls[n].x > balls[n].origX) {
            balls[n].vx -= restoreForce;
        }
        else {
            balls[n].vx += restoreForce;
        }
        if (balls[n].y > balls[n].origY) {
            balls[n].vy -= restoreForce;
        }
        else {
            balls[n].vy += restoreForce;
        }



        // mouse forces
        var distX = balls[n].x - mouseX;
        var distY = balls[n].y - mouseY;

        var radius = Math.sqrt(Math.pow(distX, 2) +
			Math.pow(distY, 2));

        var totalDist = Math.abs(distX) + Math.abs(distY);

        var forceX = (Math.abs(distX) / totalDist) *
			(1 / radius) * mouseForceMultiplier;
        var forceY = (Math.abs(distY) / totalDist) *
			(1 / radius) * mouseForceMultiplier;

        if (distX > 0) { // mouse is left of ball
            balls[n].vx += forceX;
        }
        else {
            balls[n].vx -= forceX;
        }
        if (distY > 0) { // mouse is on top of ball
            balls[n].vy += forceY;
        }
        else {
            balls[n].vy -= forceY;
        }


        // floor friction
        if (balls[n].vx > 0) {
            balls[n].vx -= floorFriction;
        }
        else if (balls[n].vx < 0) {
            balls[n].vx += floorFriction;
        }
        if (balls[n].vy > 0) {
            balls[n].vy -= floorFriction;
        }
        else if (balls[n].vy < 0) {
            balls[n].vy += floorFriction;
        }

        // floor condition
        if (balls[n].y > (canvas.height - ballRadius)) {
            balls[n].y = canvas.height - ballRadius - 2;
            balls[n].vy *= -1;
            balls[n].vy *= (1 - collisionDamper);
        }

        // ceiling condition
        if (balls[n].y < (ballRadius)) {
            balls[n].y = ballRadius + 2;
            balls[n].vy *= -1;
            balls[n].vy *= (1 - collisionDamper);
        }

        // right wall condition
        if (balls[n].x > (canvas.width - ballRadius)) {
            balls[n].x = canvas.width - ballRadius - 2;
            balls[n].vx *= -1;
            balls[n].vx *= (1 - collisionDamper);
        }

        // left wall condition
        if (balls[n].x < (ballRadius)) {
            balls[n].x = ballRadius + 2;
            balls[n].vx *= -1;
            balls[n].vx *= (1 - collisionDamper);
        }
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function handleMouseMove(evt) {
    mouseX = evt.clientX - canvas.offsetLeft;
    mouseY = evt.clientY - canvas.offsetTop;
}

function handleMouseOut() {
    mouseX = 99999;
    mouseY = 99999;
}