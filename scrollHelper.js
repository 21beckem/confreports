var canvas = document.getElementById("scrollHelper");
canvas.width = 12;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}

//setScrollbarHelper([0, 2500, 5000, 7500], 'rgb(255, 255, 255)', 'rgb(0, 0, 0)');

function setScrollbarHelper(his, startColor, endColor) {
    let fullH = document.body.scrollHeight;
    let m = canvas.height / fullH;
    let colors = interpolateColors(startColor, endColor, his.length);
    for (let i = 0; i < his.length; i++) {
        ctx.fillStyle = 'rgb(' + colors[i].join(',') + ')';
        ctx.fillRect(0, his[i]*m, canvas.width, canvas.height);
    }
}

function generateScrollHelper(thisContainerElementId='sessionContainer', thisStartColor='rgb(255, 255, 255)', thisEndColor='rgb(0, 0, 0)') {
    let sessions = document.getElementsByClassName(thisContainerElementId);
    var his = Array();
    //console.log(sessions);
    for (let i = 0; i < sessions.length; i++) {
        his.push(sessions[i].getBoundingClientRect().top + window.pageYOffset);
    }
    his[0] = 0;
    //console.log(his);
    setScrollbarHelper(his, thisStartColor, thisEndColor);
}