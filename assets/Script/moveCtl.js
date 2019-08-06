
cc.Class({
    extends: cc.Component,

    properties: {
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // 主角水平方向速度
        _xSpeed:0, 
        // 各方向移动标志位
        _accLeft:false,
        _accRight:false,
        _accUp:false,
        // 发送事件标志位
        _lastEventFlag:false,
        _nowEventFlag:false,
    },

    onLoad () {
        this.initVar();
        this.addKeyEventListen();
        this.listenStopOrRestartEvent(); // 等把聊天框做出了就可以开启
    },

    update (dt) {
        this.playerMove(dt);
    },

    // 添加键盘事件监听
    addKeyEventListen(){
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    removeKeyEventListen(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.initVar();
    },

    initVar(){
        // init var
        this._xSpeed = 0;
        this._accLeft = false;
        this._accRight = false;
        this._jumpFlag = false; 
        this._nowEventFlag = false;
        this._lastEventFlag = false;
        this._jumpAction = undefined;
    },

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = true;
                this._nowEventFlag = true;
                this.sendKeyEvent('action','left');
                break;
            case cc.macro.KEY.d:
                this._accRight = true;
                this._nowEventFlag = true;
                this.sendKeyEvent('action','right');
                break;
            case cc.macro.KEY.w:
                this._accUp = true;
                this._nowEventFlag = true;
                this.sendKeyEvent('action','up');
        }
    },
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = false;
                this._accRight = false;
                this._nowEventFlag = false;
                this._lastEventFlag = false;
                this._xSpeed = 0;
                this.sendKeyEvent('action','stop');
                break;
            case cc.macro.KEY.d:
                this._accLeft = false;
                this._accRight = false;
                this._nowEventFlag = false;
                this._lastEventFlag = false;
                this._xSpeed = 0;
                this.sendKeyEvent('action','stop');
                break;
            case cc.macro.KEY.w:
                this._accUp = false;
                this._nowEventFlag = false;
                this._lastEventFlag = false;
                break;
        }
    },

    sendKeyEvent(eventName,state){
        if(state == 'stop'){
            cc.director.emit(eventName,state);
        }
        // 用两个标志位来记录上一个状态和下一个状态，确保在按住按键时，只发送一个事件
        if(!this._lastEventFlag && this._nowEventFlag ){ 
            cc.director.emit(eventName,state);
            this._lastEventFlag = true;
        }
    },


    playerMove(dt){
        // 根据当前加速度方向每帧更新速度
        if (this._accLeft) {
            this._xSpeed -= this.accel * dt;
        } else if (this._accRight) {
            this._xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this._xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this._xSpeed = this.maxMoveSpeed * this._xSpeed / Math.abs(this._xSpeed);
        }
        // 根据当前速度更新主角的位置
        this.node.x += this._xSpeed * dt;
    },

    listenStopOrRestartEvent(){
        // 监听停止或恢复走动事件
        cc.director.on('lockMove',this.removeKeyEventListen,this);
        cc.director.on('restartMove',this.addKeyEventListen,this);
    },

});
