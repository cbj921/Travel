
cc.Class({
    extends: cc.Component,

    properties: {
        headSprite:cc.Sprite,
        textLabel:cc.Label,
        headTextures:[cc.SpriteFrame],
    },
    

    onLoad () {
        this.playTextLabel('你好');
    },

    // 由 talkSys 传递sprite，然后赋值给头像精灵
    changeHeadSprite(roleName){
        let headSprite = null;
        switch(roleName){
            case "player":
                headSprite = this.headTextures[0];
                break;
            case "cactus":
                headSprite = this.headTextures[1];
                break;
            case "queen":
                headSprite = this.headTextures[2];
                break;
            case "cat":
                headSprite = this.headTextures[3];
                break;
            case "guide":
                headSprite = this.headTextures[4];
                break;
        }
        this.headSprite.spriteFrame = headSprite;
    },

    // 播放文本内容
    playTextLabel(text){
        this.textLabel.string = text;
    },
    
});
