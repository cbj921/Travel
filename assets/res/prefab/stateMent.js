
cc.Class({
    extends: cc.Component,

    properties: {
        headSprite:cc.Sprite,
        textLabel:cc.Label,
    },
    

    onLoad () {
        this.playTextLabel('你好');
    },

    // 由 talkSys 传递sprite，然后赋值给头像精灵
    changeHeadSprite(spriteFrame){
        this.headSprite.spriteFrame = spriteFrame;
    },

    // 播放文本内容
    playTextLabel(text){
        this.textLabel.string = text;
    },
    
});
