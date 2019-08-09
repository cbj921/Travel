/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 12:13:46
 * @LastEditTime: 2019-08-09 10:22:52
 * @LastEditors: Please set LastEditors
 */

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
            case "guide1":
                headSprite = this.headTextures[4];
                break;
            case "guide2":
                headSprite = this.headTextures[4];
                break;
            case "secretMan1":
            case "secretMan2":
                headSprite = this.headTextures[5];
                break;
            case "solider1":
            case "solider2":
            case "solider3":
                headSprite = this.headTextures[6];
                break;
            
        }
        this.headSprite.spriteFrame = headSprite;
    },

    // 播放文本内容
    playTextLabel(text){
        this.textLabel.string = text;
    },
    
});
