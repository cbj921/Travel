/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 20:12:10
 * @LastEditTime: 2019-08-10 09:57:23
 * @LastEditors: Please set LastEditors
 */

cc.Class({
    extends: cc.Component,

    properties: {
        endText: cc.JsonAsset,
        textLabel:cc.Label,
        endTextIndex:0,
        restartBtn:cc.Node,
    },

    onLoad () {
        this.textLabel.node.opacity = 0;
        this.restartBtn.active = false;
        this.text = this.endText.json;
        this.textLabel.string = this.text[this.endTextIndex].text;
        let fadeIn = cc.fadeIn(5);
        let callBack = cc.callFunc(()=>{
            this.restartBtn.active = true;
        });
        let seqAction = cc.sequence(fadeIn,callBack);
        this.textLabel.node.runAction(seqAction);
    },

    restartGame(){
        this.restartBtn.active = false;
        this.canvas = cc.find('Canvas');
        this.talkSys = cc.find('talkSys');
        this.player = cc.find('player');
        this.bgm = cc.find('BGM');
        this.player.destroy();
        
        let fadeOut = cc.fadeOut(3);
        let loadScene = cc.callFunc(()=>{
            cc.director.loadScene('startScene',()=>{
                this.talkSys.destroy();
                this.bgm.destroy();
            });
        });
        let seqLoad = cc.sequence(fadeOut,loadScene);

        cc.director.preloadScene("startScene",()=>{
            console.log('preload completed!');
        });
        this.canvas.runAction(seqLoad);
    },

});
