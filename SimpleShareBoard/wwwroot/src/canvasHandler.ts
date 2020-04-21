class Point {
    constructor(public readonly X: number, public readonly Y: number) {}
}

class CanvasHandler {
    constructor(private readonly _canv: any) {
        this._ctx = _canv.getContext("2d");
        this._ctx.lineWidth = 4;
        this._ctx.strokeStyle = 
        this._ctx.fillStyle = "rgba(11,11,11,0.7)";
    }

    private _isMouseDown = false;
    private _prevX: number = -1;
    private _prevY: number = -1;
    private readonly _ctx;

    public handleMouseDown(): void {
        this._isMouseDown = true;
    }

    public handleMouseUp(): void {
        this._isMouseDown = false;
        this._prevX = -1;
    }

    public handleMouseMove(conn: any, ev: any): void {
        if(!this._isMouseDown)
            return;

        const point = this.getCanvasCoords(this._canv, ev);
        
        // console.log("sending", point.X, point.Y);
        conn.invoke("SendCoordinates", point.X, point.Y);
    }

    public handleReceiveCoords(x: number, y:number): void {
        const ctx = this._ctx;

        if(this._prevX > 0){
            ctx.beginPath();
            ctx.moveTo(this._prevX, this._prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        this._prevX = x;
        this._prevY = y;
    }

    private getCanvasCoords(canv: any, ev: any): Point {
        const rect = canv.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        return new Point(x,y);
    }
}