var noseX = 0;
var noseY = 0;
var difference = 0;
var rightWristX = 0;
var leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(500, 450);

    canvas = createCanvas(500, 450);
    canvas.position(560, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("#969A97");
    document.getElementById("square_side").innerHTML = "Width and Height of the Square will be " + difference + " px";
    fill("#F90093");
    stroke("#F90093");
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + ", noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX = " + leftWristX + ", rightWristX = " + rightWristX + ", difference = " + difference);
    }
}