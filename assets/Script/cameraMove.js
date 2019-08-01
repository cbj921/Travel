
// 该脚本挂在 camera 节点下面
cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        // 用一个数组来储存触发移动的点，假如不止两张图的时候
        limitPos:[cc.Vec2],
        // 储存摄像机移到的点,第一个为摄像机初始的位置
        moveToPos:[cc.Vec2],
        _limitIndex:0,
        _movePosIndex:0,
    },

    onLoad () {
        this._limitIndex = 0;
        this._movePosIndex = 0;
    },

    update (dt) {
        this.updateCameraPos();
    },

    updateCameraPos(){
        let playerX = this.player.x;
        // 摄像头右移
        if(this._limitIndex < this.limitPos.length){
            if(playerX >= this.limitPos[this._limitIndex].x){
                this.node.position = this.moveToPos[this._movePosIndex + 1];
                this._limitIndex ++;
                this._movePosIndex ++;
            }
        }
        // 摄像头左移
        if(this._limitIndex > 0 && playerX <= this.limitPos[this._limitIndex - 1].x){
            this.node.position = this.moveToPos[this._movePosIndex - 1];
            this._limitIndex --;
            this._movePosIndex --;
        }
    },
});
