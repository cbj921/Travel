
cc.Class({
    extends: cc.Component,

    properties: {
        // 正在对话标志位，每次只进行一个对话
        _talkingFlag:false,
    },

    onLoad () {
        // 添加为常驻节点
        cc.game.addPersistRootNode(this.node);
        // 监听对话触发事件
        cc.director.on('talkStart',this.playTalk,this);
    },

    playTalk(roleName){
        if(!this._talkingFlag){
            this._talkingFlag = true;
            //TODO: 播放对话
            cc.log(roleName);
        }
    },
});
