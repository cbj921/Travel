
cc.Class({
    extends: cc.Component,

    properties: {
        startPos:cc.Vec2,
        endPos:cc.Vec2,
        backGround:cc.Node,
        moveDuration:5,
        bgFadeOutTime:3,
    },



    onLoad () {
        this.node.on('startGame',this.playAnim,this);
        this.node.position = this.startPos;
    },

    playAnim(){
        let walk = cc.moveTo(this.moveDuration,this.endPos); // 移动角色到相应位置
        // 使用渐隐效果来加载场景
        let loadScene = cc.callFunc(()=>{                    
            let fadeOut = cc.fadeOut(this.bgFadeOutTime);
            let loadScene = cc.callFunc(()=>{
                cc.director.loadScene('firstScene');
            });
            let seqLoad = cc.sequence(fadeOut,loadScene);
            this.backGround.runAction(seqLoad);
        });
        let seqWalk = cc.sequence(walk,loadScene);
        
        cc.director.preloadScene('firstScene',()=>{
            console.log('preload completed!');
        });
        this.node.runAction(seqWalk);
    },


    // update (dt) {},
});
