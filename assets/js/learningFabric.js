// 21 - Sep - 2022

const fabricCanvas = document.getElementById('fabricCanvas');
const addLine = document.getElementById('addLine');
const disableLine = document.getElementById('disableLine');


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

let line;
let mouseDown = false;
let addLineBtnClick = false;

addLine.addEventListener('click', () => {

    // only 1 click apply...
    if (addLineBtnClick === false) {

        // remaining click don't work...
        addLineBtnClick = true;

        // fabric canvas have their own event listeners 
        // their own way of writing event listeners...
        canvas.on('mouse:down', startAddLine);
        canvas.on('mouse:move', startDrawingLine);
        canvas.on('mouse:up', stopDrawingLine);

        canvas.selection = false;
        canvas.hoverCursor = 'auto'

        objectSelectable('added-line', false);
    }
});

const startAddLine = o => {

    mouseDown = true;

    // how can i tell the fabric canvas, that my cursor is over here...
    let pointer = canvas.getPointer(o.e); // 1st get the mouse pointer -> x , y position number

    // x1 + y1 == where is the mouse pointer right now
    // x2 + y2 == where is the mouse pointer going to stop
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        id: 'added-line',
        stroke: 'red',
        strokeWidth: 5,
        selectable: false,
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
    // Fabric know where the line is, to select again...
    line.setCoords();

    mouseDown = false;
}



disableLine.addEventListener('click', () => {

    // the way to disable Fabric event listener...
    canvas.off('mouse:down', startAddLine);
    canvas.off('mouse:move', startDrawingLine);
    canvas.off('mouse:up', stopDrawingLine);

    objectSelectable('added-line', true);

    // open click btn for, next click...
    addLineBtnClick = false;

})



const objectSelectable = (id, status) => {

    // get all the object, that are present inside Fabric Canvas
    canvas.getObjects().forEach(obj => {

        if (obj.id === id) {
            obj.set({
                selectable: status
            });

            // when hover on these object, pointer change
            if (status) {
                canvas.hoverCursor = 'all-scroll'
            } else {
                canvas.hoverCursor = 'auto'
            }
        };
    });
}