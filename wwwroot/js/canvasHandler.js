class Point {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}
class CanvasHandler {
    constructor(_canv) {
        this._canv = _canv;
        this._isMouseDown = false;
        this._prevX = -1;
        this._prevY = -1;
        this._ctx = _canv.getContext("2d");
        this._ctx.lineWidth = 4;
        this._ctx.strokeStyle =
            this._ctx.fillStyle = "rgba(11,11,11,0.7)";
    }
    handleMouseDown() {
        this._isMouseDown = true;
    }
    handleMouseUp() {
        this._isMouseDown = false;
        this._prevX = -1;
    }
    handleMouseMove(conn, ev) {
        if (!this._isMouseDown)
            return;
        const point = this.getCanvasCoords(this._canv, ev);
        console.log("sending", point.X, point.Y);
        conn.invoke("SendCoordinates", point.X, point.Y);
    }
    handleReceiveCoords(x, y) {
        const ctx = this._ctx;
        if (this._prevX > 0) {
            ctx.beginPath();
            ctx.moveTo(this._prevX, this._prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        this._prevX = x;
        this._prevY = y;
    }
    getCanvasCoords(canv, ev) {
        const rect = canv.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        return new Point(x, y);
    }
}
//# sourceMappingURL=canvasHandler.js.map