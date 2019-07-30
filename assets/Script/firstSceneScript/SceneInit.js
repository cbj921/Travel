
cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        playerStartPos:cc.Vec2,
    },

    onLoad () {
        // 开启碰撞组件
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {

    },

    // update (dt) {},
});
