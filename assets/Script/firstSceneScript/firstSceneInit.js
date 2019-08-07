
cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        playerStartPos:cc.Vec2,
        //queen:cc.Node,
        //queenStartPos:cc.Vec2,
    },

    onLoad () {
        // 初始化碰撞系统
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // 初始化人物位置
        this.initPeoplePos();
    },

    initPeoplePos(){
        this.player.position = this.playerStartPos;
        //this.queen.position = this.queenStartPos;
    },

    // update (dt) {},
});
