/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-31 11:14:28
 * @LastEditTime: 2019-08-09 16:19:57
 * @LastEditors: Please set LastEditors
 */

cc.Class({
    extends: cc.Component,

    properties: {
        // 正在对话标志位，每次只进行一句对话，完整执行完一句后，才进行下一句
        _talkingFlag: false,
        // 对话选择标志位
        _chooseFlag:false,
        // 文本序号
        _textIndex:0,
        // 储存当前对话对象的名字
        _talkTarget:cc.String,
        // 储存选择数据
        _optionData:null,
        // 用一个数组来储存选择的内容
        _optionSaveArray:[],
        // json文本
        textJson: cc.JsonAsset,
        // 聊天语句预制体资源
        stateMentPrefab:cc.Prefab,
        // 选择按钮预制体资源
        optionPrefab:cc.Prefab,
        // 游戏结束预制体
        gameOverPrefab:cc.Prefab,
        // 主角节点
        player:cc.Node,

        // 以下是 scrollView 的属性
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        spacing: 0, // space between each item
        stateMentX:0,
        _stateMentCount:0, // 生成语句的数量，用来确定content的高度

    },

    onLoad() {
        // 添加为常驻节点
        cc.game.addPersistRootNode(this.node);
        // 监听对话触发事件
        cc.director.on('talkStart', this.playTalk, this);
        // 监听聊天框隐藏事件
        cc.director.on('textBoxHide',this.hideTextBox,this);
        // 监听聊天框点击事件,用来播放对话
        this.node.on('touchstart',this.nextTalk,this);
        // 监听选择按钮点击事件
        this.node.on('finishSelect',this.saveOptionData,this);
        // 加载文本文件
        this._textJson = this.textJson.json;
        // 初始化触摸框中的提示语
        this._attentionLabel = this.node.getChildByName('attention').getComponent(cc.Label);
        this._attentionLabel.string = "点击该区域进行下一句对话";
        // 初始化文本框位置
        this.node.position = cc.v2(250,2500);
        // scrollView 初始化
        this.content = this.scrollView.content;
        this.content.height = 0;
        // 得到背景节点
        this.canvas = cc.find('Canvas');
    },
  
    playTalk(roleName) {
        if (!this._talkingFlag) {
            this._talkingFlag = true;
            this._talkTarget = roleName;
            this.roleText = this._textJson[roleName].content;
            let textLength = this._textJson[roleName].length;
            // 当角色开始对话的时候，角色是不能移动的,向moveCtl脚本发送lockMove事件
            cc.director.emit('lockMove');
            // 让endLabel隐藏
            if(this._textIndex < 1){
                this._attentionLabel.string = "点击该区域进行下一句对话";
            }
            // 弹出聊天框
            this.node.x = this.player.x ;
            this.node.y = 746;
            let stateMent = this.makeStateMentPrefab(this.stateMentPrefab);

            if(this._textIndex < textLength){
                if (this.roleText[this._textIndex].role == "other") {
                    this.initStateMent(stateMent,roleName,this.roleText[this._textIndex].text); 
                } else {
                    this.initStateMent(stateMent,'player',this.roleText[this._textIndex].text); 
                }
                
                // 存在choose属性的时候
                if (this.roleText[this._textIndex].choose != undefined) {
                    this._chooseFlag = false;       // 每次进入选择，都要复位标志位
                    for (let i in this.roleText[this._textIndex].choose) {
                        if (i != undefined) {
                            // 这一步中生成按钮预制体，将数据写入按钮的对象中，点击后就可以得到相应数据了
                            let optionBtn = this.makeStateMentPrefab(this.optionPrefab);
                            this.initOptionBtn(optionBtn,this.roleText[this._textIndex].choose[i].text,roleName,i);
                            //cc.log("choose " + i + ":"+roleText[this._textIndex].choose[i].text);
                        }
                    }

                    // 关闭对进行下一句的监听
                    this.node.off('touchstart',this.nextTalk,this);
                    this.node.on('finishSelect',(optionData)=>{
                        if(!this._chooseFlag){
                            // bug已修复
                            //cc.log("callBack:"+this._textIndex);
                            //cc.log(this.roleText);
                            //cc.log(this.roleText[this._textIndex]);
                            if(this.roleText[this._textIndex].choose != undefined){
                                this._textIndex = Number(this.roleText[this._textIndex].choose[optionData.option].link);
                            }
                            this._chooseFlag = true;
                            this.node.on('touchstart',this.nextTalk,this);
                            this._talkingFlag = false; // 这一句一定不要忘了，否则无法再进入
                            //cc.log("now: "+this._textIndex);
                            this.nextTalk();
                            //cc.log('rset:'+this._textIndex);
                        }
                    },this);

                    return;

                }
                // 这个用来判断是否加载下一个场景
                if(this.roleText[this._textIndex].nextScene !=undefined){
                    // TODO:进行渐隐场景切换
                    this.loadSceneAnim(this.roleText[this._textIndex].nextScene);
                    cc.log(this.roleText[this._textIndex].nextScene);
                }
                // 用来判断是否游戏结束
                if(this.roleText[this._textIndex].gameOver !=undefined){
                    // TODO:弹出游戏结束界面，并且回到开始场景
                    this.gameOver();
                    cc.log('gameOver');
                    return;
                }

                if (this.roleText[this._textIndex].end != true ) {
                    this._textIndex++;
                }else{
                    // 重置文本标志位
                    this._textIndex = 0;
                    // 让对话对象为null
                    this._talkTarget = null;
                    // 恢复角色移动
                    cc.director.emit('restartMove');
                    // 改变触摸框内容
                    this._attentionLabel.string = "对话结束";
                }
                this._talkingFlag = false;
            }
        }
    },
    nextTalk(){
        if(this._talkTarget == null){
            return;
        }
        this.playTalk(this._talkTarget);
    },

    hideTextBox(){
        this.node.position = cc.v2(250,2500);
    },

    // 用来保存选择的数据
    saveOptionData(optionData){
        this._optionSaveArray.push(optionData);
        cc.log(this._optionSaveArray);
    },

    loadSceneAnim(SceneName){
        this.canvas = cc.find('Canvas');
        let walk = cc.moveTo(2,cc.v2(3960,208)); // 移动角色到相应位置
        // 使用渐隐效果来加载场景
        let loadScene = cc.callFunc(()=>{                    
            let fadeOut = cc.fadeOut(4);
            let loadScene = cc.callFunc(()=>{
                cc.director.loadScene(SceneName,()=>{
                    this.player.position = cc.v2(146,208);
                    cc.director.emit('action','stop');
                });
            });
            let seqLoad = cc.sequence(fadeOut,loadScene);
            this.canvas.runAction(seqLoad);
        });
        let seqWalk = cc.sequence(walk,loadScene);
        
        cc.director.preloadScene(SceneName,()=>{
            console.log('preload completed!');
        });
        this.player.runAction(seqWalk);
        cc.director.emit('action','right');
    },

    gameOver(){
        this.canvas = cc.find('Canvas');
        this._attentionLabel.node.color = cc.color(255,0,0);
        this._attentionLabel.string = "游戏结束！";
        let fadeOut = cc.fadeOut(3);
        let loadScene = cc.callFunc(()=>{
            cc.director.loadScene('startScene',()=>{
                this.player.destroy();
                this.node.destroy();
            });
        });
        let seqLoad = cc.sequence(fadeOut,loadScene);

        cc.director.preloadScene("startScene",()=>{
            console.log('preload completed!');
        });
        this.canvas.runAction(seqLoad);
        //this.player.runAction(fadeOut);
        //this.node.runAction(fadeOut);
    },

    // scrollView函数
    makeStateMentPrefab(prefab){
        this._stateMentCount++;
        let stateMent = cc.instantiate(prefab);
        this.content.addChild(stateMent);
        let contentHeight = this._stateMentCount*(stateMent.height + this.spacing)+this.spacing;
        let stateMentPos = cc.v2(this.stateMentX,-this._stateMentCount*(stateMent.height+this.spacing));
        this.content.height = contentHeight;
        stateMent.position = stateMentPos;
        if(prefab == this.optionPrefab){
            // 如果生成的是按钮，我们就把按钮居中
            stateMent.x = -192.5;
        }
        this.scrollView.scrollToOffset(cc.v2(0,this._stateMentCount*(stateMent.height+this.spacing)+this.spacing),0.5);
        //this.scrollView.scrollToPercentVertical(0.6,0.5);
        return stateMent;
    },

    initStateMent(stateMent,roleName,stateMentText){
        let stateMentScript = stateMent.getComponent('stateMent');
        stateMentScript.changeHeadSprite(roleName);
        stateMentScript.playTextLabel(stateMentText);
    },

    initOptionBtn(optionBtn,text,target,option){
        let optionScript = optionBtn.getComponent('chooseBtn');
        optionScript.btnInit(this.node,text,target,option);
    },


});
