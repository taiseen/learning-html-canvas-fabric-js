// 21 - Sep - 2022

const fabricCanvas = document.getElementById('fabricCanvas');
const addLine = document.getElementById('addLine');

// fabric library will help us to convert this HTML canvas element into a fabric canvas.
// & inside this fabric canvas, we can add objects.
const canvas = new fabric.Canvas(fabricCanvas, {
    width: window.innerWidth,     // width control
    height: window.innerHeight,    // height control
});

const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 200,
    height: 200,
    // angle: 45,
    // opacity: .5,
    // selectable: false,
});
// canvas.add(rect);


addLine.addEventListener('click', () => {
    // fabric canvas have their own event listeners 
    // their own way of writing event listeners...
    canvas.on('mouse:down', startAddLine);
    canvas.on('mouse:move', startDrawingLine);
    canvas.on('mouse:up', stopDrawingLine);

    canvas.selection = false;
});

let line;
let mouseDown = false;

const startAddLine = o => {

    mouseDown = true;

    // how can i tell the fabric canvas, that my cursor is over here...
    let pointer = canvas.getPointer(o.e); // 1st get the mouse pointer -> x , y position number

    // x1 + y1 == where is the mouse pointer right now
    // x2 + y2 == where is the mouse pointer going to stop
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'red',
        strokeWidth: 5,
    });

    canvas.add(line);               // Just draw 2 point, start & end
    canvas.requestRenderAll();
}


const startDrawingLine = o => {

    if (mouseDown) {
        let pointer = canvas.getPointer(o.e);

        // drawing line...
        line.set({
            x2: pointer.x,
            y2: pointer.y,
        });

        canvas.requestRenderAll();
    }
}

const stopDrawingLine = () => {
    mouseDown = false;
}