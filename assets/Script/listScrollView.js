
// 挂载在 talkSys 下面
cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        stateMentPrefab:cc.Prefab,
        spacing: 0, // space between each item
        stateMentX:0,
        _stateMentCount:0, // 生成语句的数量，用来确定content的高度
    },


    onLoad () {
        this.content = this.scrollView.content;
        this.content.height = 0;
    },

    makeStateMentPrefab(){
        this._stateMentCount++;
        let stateMent = cc.instantiate(this.stateMentPrefab);
        this.content.addChild(stateMent);
        let contentHeight = this._stateMentCount *(this.spacing + stateMent.height);
        let stateMentPos = cc.v2(this.stateMentX,-this._stateMentCount*(this.spacing + 0.5*stateMent.height));
        this.content.height = contentHeight;
        stateMent.position = stateMentPos;
        this.scrollView.scrollToOffset(cc.v2(0,-(stateMent.y+this.spacing+100)),0.5);
        return stateMent;
    },

    initStateMent(stateMent,headSprite,stateMentText){
        let stateMentScript = stateMent.getComponent('stateMent');
        stateMentScript.changeHeadSprite(headSprite);
        stateMentScript.playTextLabel(stateMentText);
    },

    // update (dt) {},
});
