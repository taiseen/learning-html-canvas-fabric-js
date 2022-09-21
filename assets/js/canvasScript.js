// 21 - Sep - 2022

const mainCanvas = document.getElementById('mainCanvas');
const htmlObject = mainCanvas.getContext('2d')                  // builtin HTML Object


const draw_rectangle = () => {

    htmlObject.fillStyle = 'tomato';      // background Color
    htmlObject.fillRect(0, 0, 150, 200);  // x , y , width, height  // Draws a "filled" rectangle
}


const draw_line = () => {

    htmlObject.moveTo(0, 0);      // starting point
    htmlObject.lineTo(300, 150);  // ending point | x==width , y==height
    htmlObject.stroke();          // line drawing method
}


const draw_circle = () => {

    htmlObject.beginPath();
    htmlObject.arc(150, 75, 50, 0, 2 * Math.PI);   // x , y , width , ... ...
    htmlObject.stroke();
}


const create_linear_gradient = () => {

    const gradient = htmlObject.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "green");

    // Fill with gradient
    htmlObject.fillStyle = gradient;
    htmlObject.fillRect(60, 60, 150, 80);
}


const create_radial_gradient = () => {

    const gradient = htmlObject.createRadialGradient(50, 50, 5, 90, 60, 100);  // x1 , y1, r1, x2, y2, r2
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "green");

    // Fill with gradient
    htmlObject.fillStyle = gradient;
    htmlObject.fillRect(60, 60, 150, 80);
}


const draw_text = () => {

    htmlObject.font = "30px Arial";
    htmlObject.fillStyle = 'red'
    htmlObject.textAlign = 'center'
    // htmlObject.fillText("Hello World", 150, 85); // text, x , y
    htmlObject.fillText("Hello World", mainCanvas.width / 2, mainCanvas.height / 2);
}


const draw_stroke_text = () => {

    // Normal Stroke Text
    htmlObject.font = "30px Arial";
    htmlObject.strokeText("Hello World", 50, 50);
}


const draw_gradient_stroke_text = () => {

    // Create gradient
    const gradient = htmlObject.createLinearGradient(0, 0, mainCanvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    // Fill with gradient
    htmlObject.strokeStyle = gradient;
    htmlObject.font = "30px Arial";
    htmlObject.strokeText("Hello World", 50, 50);
}


const draw_simple_stroke_rectangle = () => {

    htmlObject.strokeStyle = 'red';
    htmlObject.strokeRect(10, 10, 100, 80);
}


const draw_gradient_stroke_rectangle = () => {

    const gradient = htmlObject.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(.1, "magenta");
    // gradient.addColorStop(.1, "red");
    // gradient.addColorStop(.3, "blue");
    // gradient.addColorStop(.3, "white");
    gradient.addColorStop(1, "red");

    htmlObject.strokeStyle = gradient;
    htmlObject.lineWidth = 5;
    htmlObject.strokeRect(10, 10, 100, 80);
}


const create_shadow = () => {

    htmlObject.shadowBlur = 10;            // all side
    // htmlObject.shadowOffsetY = 10;      // bottom
    // htmlObject.shadowOffsetY = -10;     // top
    // htmlObject.shadowOffsetX = 10;      // right
    // htmlObject.shadowOffsetX = -10;     // left 
    htmlObject.shadowColor = 'black';
    htmlObject.fillStyle = 'tomato';
    htmlObject.fillRect(20, 20, 100, 100);
}


const draw_img = () => {
    // window.onload = function () {
    // }
    const man = document.getElementById("manImg");
    htmlObject.drawImage(man, 0, 0);
}


// call from HTML file, when user click at button...
const draw_pattern_with_image = (direction) => {

    htmlObject.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    const plus = document.getElementById("plusImg");

    const pattern = htmlObject.createPattern(plus, direction);

    htmlObject.fillStyle = pattern;
    htmlObject.rect(0, 0, 150, 100);
    htmlObject.fill();
}


const draw_new_line = () => {

    htmlObject.beginPath();

    htmlObject.lineWidth = 5;
    htmlObject.lineJoin = 'round';
    htmlObject.lineCap = 'round';

    // htmlObject.lineJoin = 'miter';
    // htmlObject.miterLimit = 5;

    htmlObject.moveTo(20, 20);
    htmlObject.lineTo(100, 50);
    htmlObject.lineTo(20, 100);

    // htmlObject.lineTo(200, 20);

    htmlObject.stroke();
}


const draw_double_rectangle = () => {

    htmlObject.fillStyle = 'red';
    htmlObject.beginPath();
    htmlObject.rect(20, 20, 150, 100);
    htmlObject.fill();                  // important method for printing

    htmlObject.fillStyle = 'blue';
    htmlObject.beginPath();
    htmlObject.rect(40, 40, 150, 100);
    htmlObject.fill();                  // important method for printing
}


const draw_line_path_stroke = () => {

    htmlObject.beginPath();
    htmlObject.moveTo(20, 20);          // x , y
    htmlObject.lineTo(20, 100);
    htmlObject.lineTo(120, 100);

    htmlObject.closePath()

    htmlObject.strokeStyle = 'red';
    htmlObject.stroke();                // important method for printing

}


const draw_double_rectangle_with_stroke = () => {

    htmlObject.beginPath();
    htmlObject.rect(50, 50, 200, 80);
    htmlObject.stroke();

    htmlObject.clip();

    htmlObject.fillStyle = 'red'
    htmlObject.fillRect(0, 0, 150, 100);

}


const draw_curve_line_1_control_point = () => {

    htmlObject.beginPath();
    htmlObject.moveTo(20, 20);

    htmlObject.quadraticCurveTo(20, 100, 200, 20);      // 1 control point 

    htmlObject.stroke();
}


const draw_curve_line_2_control_point = () => {

    htmlObject.beginPath();
    htmlObject.moveTo(20, 20);

    htmlObject.bezierCurveTo(20, 100, 200, 100, 200, 20);      // 2 control point 

    htmlObject.stroke();
}


const draw_curve_line_rounded = () => {

    htmlObject.beginPath();
    htmlObject.moveTo(20, 20);
    htmlObject.lineTo(100, 20);

    htmlObject.arcTo(150, 20, 150, 70, 50);   // x , y , ... ...

    htmlObject.lineTo(150, 120);
    htmlObject.stroke();
}


const draw_stroke_line_box_by_checking = () => {

    htmlObject.beginPath();
    htmlObject.rect(20, 20, 150, 100);

    if (htmlObject.isPointInPath(100, 100)) {
        htmlObject.stroke();
    }
}











// function call...
// ###############################################################


// 1
// draw_rectangle();

// 2
// draw_line();

// 3
// draw_circle();

// 4
// create_linear_gradient();

// 5
// create_radial_gradient();

// 6
// draw_img();

// 7
// draw_text();

// 8
// draw_stroke_text();

// 9
// draw_gradient_stroke_text()

// 10
// draw_simple_stroke_rectangle();

// 11
// draw_gradient_stroke_rectangle();

// 12
// create_shadow();

// 13
// draw_new_line();

// 14
// draw_double_rectangle();

// 15
// draw_line_path_stroke();

// 16
// draw_double_rectangle_with_stroke();

// 17
// draw_curve_line_1_control_point();

// 18
// draw_curve_line_2_control_point();

// 19
// draw_curve_line_rounded();

// 20
// draw_stroke_line_box_by_checking();