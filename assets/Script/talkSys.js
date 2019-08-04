
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
        // json文本
        textJson: cc.JsonAsset,
        // 聊天语句预制体资源
        stateMentPrefab:cc.Prefab,
        // 文本框弹出位置
        textBoxPos:cc.Vec2,

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
        // 加载文本文件
        this._textJson = this.textJson.json;
        // 初始化结束提示标签
        this._endLabel = this.node.getChildByName('endLabel');
        this._endLabel.active = false;
        // 初始化文本框位置
        this.node.position = cc.v2(250,2500);
        // scrollView 初始化
        this.content = this.scrollView.content;
        this.content.height = 0;
    },

    playTalk(roleName) {
        if (!this._talkingFlag) {
            this._talkingFlag = true;
            this._talkTarget = roleName;
            let roleText = this._textJson[roleName].content;
            let textLength = this._textJson[roleName].length;
            // 当角色开始对话的时候，角色是不能移动的,向moveCtl脚本发送lockMove事件
            cc.director.emit('lockMove');
            // 让endLabel隐藏
            if(this._textIndex < 1){
                this._endLabel.active = false;
            }
            // 弹出聊天框
            this.node.position = this.textBoxPos;
            let stateMent = this.makeStateMentPrefab();

            if(this._textIndex < textLength){
                // 暂且用cc.log来代替聊天框
                if (roleText[this._textIndex].role == "other") {
                    this.initStateMent(stateMent,1,roleText[this._textIndex].text); // 注意第二个参数，等有头像资源时修正
                } else {
                    this.initStateMent(stateMent,2,roleText[this._textIndex].text); // 注意第二个参数，等有头像资源时修正
                }
                
                // 存在choose属性的时候
                if (roleText[this._textIndex].choose != null) {
                    this._chooseFlag = false;       // 每次进入选择，都要复位标志位
                    for (let i in roleText[this._textIndex].choose) {
                        if (i != undefined) {
                            // 这一步中生成按钮预制体，将数据写入按钮的对象中，点击后就可以得到相应数据了
                            cc.log("choose " + i + ":"+roleText[this._textIndex].choose[i].text);
                        }
                    }

                    //cc.director.on('choose',(link)=>{textIndex = link;this._chooseFlag = true;},this)
                    // 关闭对进行下一句的监听，this.node.off('touchstart',this.nextTalk,this);
                    // 进行选项的选择，如果不选，则会一直停留在该界面，直到选择结束
                    // 在做完选择后，textIndex = choose[i].link
                    // cc.director.off('choose');
                    // 开启对进行下一句的监听，this.node.on('touchstart',this.nextTalk,this);

                }
                if (roleText[this._textIndex].end != true) {
                    this._textIndex++;
                }else{
                    // 重置文本标志位
                    this._textIndex = 0;
                    // 让对话对象为null
                    this._talkTarget = null;
                    // 恢复角色移动
                    cc.director.emit('restartMove');
                    // 在聊天框底部的提示，让玩家知道对话结束
                    this._endLabel.active = true;
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

    // scrollView函数
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
        //stateMentScript.changeHeadSprite(headSprite);// 暂时注释，等有头像资源时恢复
        stateMentScript.playTextLabel(stateMentText);
    },

});
