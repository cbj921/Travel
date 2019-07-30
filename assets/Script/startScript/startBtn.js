// 挂载在 开始 按钮下
cc.Class({
    extends: cc.Component,

    properties: {
        button:cc.Node,
        player:cc.Node,
        title:cc.Node,
        attentionLabel:cc.Node,
        disapperDuration:2,
        _sendEventCount:0,
    },

    onLoad () {
        this.button.on('touchstart',this.startGame,this);
        this._sendEventCount = 0;
    },

    startGame(){
        this.disappearAction(this.button);
        this.disappearAction(this.title);
    },

    disappearAction(node){
        // 在按键和标题消失后给player发送事件，让其播放动画
        let destroy = cc.callFunc(()=>{
            if(this._sendEventCount < 1){ // 让开始事件只触发一次
                this.player.emit('startGame');
                this.attentionLabel.emit('playAttention');
                this._sendEventCount ++;
            }
            this.node.destroy();
        });
        let fadeOut = cc.fadeOut(this.disapperDuration);
        let fadeSeq = cc.sequence(fadeOut,destroy);
        node.runAction(fadeSeq);
    },

});
