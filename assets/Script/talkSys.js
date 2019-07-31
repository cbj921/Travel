
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        // 添加为常驻节点
        cc.game.addPersistRootNode(this.node);
        // 监听对话触发事件
        cc.director.on('talkStart',this.playTalk,this);
    },

    playTalk(roleName){
        cc.log(roleName);
    },
});
