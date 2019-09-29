// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const CONN = new signalR.HubConnectionBuilder().withUrl("/drawHub").build();
const canv = document.querySelector("#main-canv");
const canvasHandler = new CanvasHandler(canv);

CONN.start()
    .then((e) => {
        console.log('Connection established', e);
    })
    .catch((e) => {
        console.error(e);
    });

CONN.on("ReceiveMessage", (user, msg) => {
    console.log(user,msg);
});

CONN.on("ReceiveCoordinates", (x, y) => {
    canvasHandler.handleReceiveCoords(x,y);
});

CONN.on("ReceivePathStop", () => {
    canvasHandler.handleMouseUp();
})

canv.addEventListener("mousedown", (e) => {
    canvasHandler.handleMouseDown();
});

canv.addEventListener("mouseup", (e) => {
    canvasHandler.handleMouseUp();
    CONN.invoke("SendPathStop");
});

canv.addEventListener("mousemove", (e) => {
    canvasHandler.handleMouseMove(CONN, e);
});
