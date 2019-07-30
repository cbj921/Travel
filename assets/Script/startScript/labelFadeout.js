
cc.Class({
    extends: cc.Component,

    properties: {
        fadeInTime:2,
        fadeOutTime:2,
        delayTime:5,
    },

    onLoad () {
        this.node.on('playAttention',this.playAnim,this);
        this.node.opacity = 0;
    },

    playAnim(){
        let fadeIn = cc.fadeIn(this.fadeInTime);
        let fadeOut = cc.fadeOut(this.fadeOutTime);
        let delay = cc.delayTime(this.delayTime);
        let fadeInOut = cc.sequence(fadeIn,delay,fadeOut);

        this.node.runAction(fadeInOut);
    },

    // update (dt) {},
});
