/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 12:13:46
 * @LastEditTime: 2019-08-09 15:34:29
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
            case "maid1":
            case "maid2":
                headSprite = this.headTextures[7];
                break;
            case "wuzetian":
                headSprite = this.headTextures[8];
                break;
            case "guard1":
            case "guard2":
            case "guard3":
                headSprite = this.headTextures[9];
                break;
            case "trump":
                headSprite = this.headTextures[10];
                break;
            case "starfish":
                headSprite = this.headTextures[11];
                break;
            case "crab":
                headSprite = this.headTextures[12];
                break;
            case "kaisa":
                headSprite = this.headTextures[13];
                break;
    
        }
        this.headSprite.spriteFrame = headSprite;
    },

    // 播放文本内容
    playTextLabel(text){
        this.textLabel.string = text;
    },
    
});
