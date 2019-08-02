
// 绑定在除主角之外需要触发对话的角色上

cc.Class({
    extends: cc.Component,

    properties: {
        _talkFlag:false,
        roleName:cc.String,
    },

    onLoad () {
        // 监听点击事件
        this.node.on('touchstart',this.sendTrigger,this);
        // 获取提示标签组件，初始状态不可见
        this.nodeLabel = this.node.getChildByName('attention');
        this.nodeLabel.active = false;
    },

    sendTrigger(){
        if(this._talkFlag){
            cc.director.emit('talkStart',this.roleName);
            this.nodeLabel.active = false;
            this._talkFlag = false; 
        }
    },

    // 当碰撞产生的时候调用
    onCollisionEnter: function (other, self) {
        this.nodeLabel.active = true;
        this._talkFlag = true;
    },
    // 当碰撞结束的时候调用
    onCollisionExit: function (other, self) {
        this.nodeLabel.active = false;
        this._talkFlag = false;
        // 隐藏聊天框
        cc.director.emit('textBoxHide');
    },

});
