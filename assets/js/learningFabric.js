// 21 - Sep - 2022
// 27 - Sep - 2022 

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
    fill: 'tomato',
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
let afterMoveNewLineCoords = {}


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
        hasControls: false,
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


const addControlPoints = o => {

    let doubleClickObject = o.target;

    if (!doubleClickObject) {
        return;
    } else {
        if (doubleClickObject.id === 'added-line') {

            doubleClickObject.set({ label: 'selected-line' });

            let controlPointer1 = new fabric.Circle({
                id: 'controlPointer1',
                radius: doubleClickObject.strokeWidth * 5,
                fill: 'blue',
                opacity: .5,
                top: afterMoveNewLineCoords.y1,
                left: afterMoveNewLineCoords.x1,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
            });

            let controlPointer2 = new fabric.Circle({
                id: 'controlPointer2',
                radius: doubleClickObject.strokeWidth * 5,
                fill: 'blue',
                opacity: .5,
                top: afterMoveNewLineCoords.y2,
                left: afterMoveNewLineCoords.x2,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
            });

            canvas.add(controlPointer1, controlPointer2);
            canvas.setActiveObject(controlPointer2);
            // canvas.discardActiveObject(); // disable line selection
            canvas.requestRenderAll();

            canvas.on('object:moving', endPointOfLineToFollowPointer);
            canvas.on('selection:cleared', removePointsOnSelectionCleared); // click outside & clear object event...
            canvas.on('selection:updated', removePointsOnSelectionUpdated); // click outside & clear object event...
        }
    }
}


const updateNewLineCoordinates = o => {

    // for each new line, reset previous value, for set new points value...
    afterMoveNewLineCoords = {}

    let doubleClickObject = o.target;

    if (doubleClickObject.id === 'added-line') {

        let centerX = doubleClickObject.getCenterPoint().x;
        let centerY = doubleClickObject.getCenterPoint().y;

        let x1offset = doubleClickObject.calcLinePoints().x1;
        let y1offset = doubleClickObject.calcLinePoints().y1;
        let x2offset = doubleClickObject.calcLinePoints().x2;
        let y2offset = doubleClickObject.calcLinePoints().y2;

        // moving calculation & update coordinates
        afterMoveNewLineCoords = {
            x1: centerX + x1offset - doubleClickObject.strokeWidth / 2,
            y1: centerY + y1offset - doubleClickObject.strokeWidth / 2,
            x2: centerX + x2offset - doubleClickObject.strokeWidth / 2,
            y2: centerY + y2offset - doubleClickObject.strokeWidth / 2,
        }

        // update objects, new screen position...
        doubleClickObject.set({
            x1: centerX + x1offset - doubleClickObject.strokeWidth / 2,
            y1: centerY + y1offset - doubleClickObject.strokeWidth / 2,
            x2: centerX + x2offset - doubleClickObject.strokeWidth / 2,
            y2: centerY + y2offset - doubleClickObject.strokeWidth / 2,
        });

        // for fabric js, manually set the coordinates
        doubleClickObject.setCoords();
    }

}


canvas.on({
    'object:moving': updateNewLineCoordinates,
    // 'selection:created': updateNewLineCoordinates,
    // 'selection:updated': updateNewLineCoordinates,
    'mouse:dblclick': addControlPoints,
})
// canvas.on('mouse:dblclick', addControlPoints)
// canvas.on('object:moving', updateNewLineCoordinates)


const endPointOfLineToFollowPointer = o => {

    let followLineObj = o.target;

    if (followLineObj.id === 'controlPointer1') {
        canvas.getObjects().forEach(item => {
            if (item.id === 'added-line' && item.label === 'selected-line') {
                item.set({
                    x1: followLineObj.left,
                    y1: followLineObj.top,
                });
                // where the object is now present at the canvas...
                item.setCoords();
            }
        })
    } else if (followLineObj.id === 'controlPointer2') {
        canvas.getObjects().forEach(item => {
            if (item.id === 'added-line' && item.label === 'selected-line') {
                item.set({
                    x2: followLineObj.left,
                    y2: followLineObj.top,
                });
                // where the object is now present at the canvas...
                item.setCoords();
            }
        })
    }
}

// event : click outside & 2 pointer will be remove...
// event : when click in line, control remove...

const removePointsOnSelectionCleared = _ => {

    // get all the objects from the canvas...
    canvas.getObjects().forEach(o => {

        // remove from canvas
        (o.id === 'controlPointer1' || o.id === 'controlPointer2') && canvas.remove(o)


        // reset label
        o.label === 'selected-line' && o.set({ label: '' });

    })

    canvas.requestRenderAll();

}

const removePointsOnSelectionUpdated = o => {

    let selectedObj = o.selected[0];

    if (selectedObj.id === 'added-line') {
        removePointsOnSelectionCleared();
    }
}