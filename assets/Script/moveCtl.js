
cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        //jumpHeight: 0,
        // 主角跳跃持续时间
        //jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,

        // 主角水平方向速度
        _xSpeed:0, 
        _accLeft:false,
        _accRight:false,
        //_jumpFlag:false,
        //_jumpAction:undefined,
    },

    onLoad () {
        this.initVar();
        //this.initJumpAction();
        this.addKeyEventListen();
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

    initVar(){
        // init var
        this._xSpeed = 0;
        this._accLeft = false;
        this._accRight = false;
        this._jumpFlag = false; 
        this._jumpAction = undefined;
    },

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = true;
                //cc.log('leftDown');
                break;
            case cc.macro.KEY.d:
                this._accRight = true;
                //cc.log('rightDown');
                break;
            /*case cc.macro.KEY.up:
                this._jumpFlag = true;
                this.playJump();
                break;*/
        }
    },
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this._accLeft = false;
                this._xSpeed = 0;
                //cc.log('leftUp');
                break;
            case cc.macro.KEY.d:
                this._accRight = false;
                this._xSpeed = 0;
                //cc.log('rightUp');
                break;
            /*case cc.macro.KEY.up:
                this._jumpFlag = false;
                break;*/
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

    /*initJumpAction(){
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        this._jumpAction = cc.sequence(jumpUp,jumpDown);
    },
    playJump(){
        this.node.runAction(this._jumpAction);
    },*/

});
