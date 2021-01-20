video="";
canvas="";
objects=""
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}


function setup(){

    canvas = createCanvas(620,480);
    canvas.center()
    
}

function draw(){
    image(video,0,0,620,480);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        
                for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects are:" + objects.length;
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting";
}




function modelLoaded(){
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}






function gotResults(error, results) {
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}