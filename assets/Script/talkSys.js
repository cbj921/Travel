
cc.Class({
    extends: cc.Component,

    properties: {
        // 正在对话标志位，每次只进行一句对话，完整执行完一句后，才进行下一句
        _talkingFlag: false,
        // 对话选择标志位
        _chooseFlag:false,
        // json文本
        textJson: cc.JsonAsset,
        // 文本序号
        _textIndex:0,
        // 储存当前对话对象的名字
        _talkTarget:cc.String,
        // 文本框弹出位置
        textBoxPos:cc.Vec2,
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
        // 初始化文本框位置
        this.node.position = cc.v2(250,2500);
    },

    playTalk(roleName) {
        if (!this._talkingFlag) {
            this._talkingFlag = true;
            this._talkTarget = roleName;
            let roleText = this._textJson[roleName].content;
            let textLength = this._textJson[roleName].length;
            // 当角色开始对话的时候，角色是不能移动的,向moveCtl脚本发送lockMove事件
            cc.director.emit('lockMove');
            // 弹出聊天框
            this.node.position = this.textBoxPos;
            
            if(this._textIndex < textLength){
                // 暂且用cc.log来代替聊天框
                if (roleText[this._textIndex].role == "other") {
                    cc.log(roleName + ' : ' + roleText[this._textIndex].text);
                } else {
                    cc.log('player' + ' : ' + roleText[this._textIndex].text);
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
                    // 进行选项的选择，如果不选，则会一直停留在该界面，直到选择结束
                    // 在做完选择后，textIndex = choose[i].link
                    // cc.director.off('choose');
                    // continue; //选择完直接开始下一轮

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
                    // 到时候在聊天框底部的提示，让玩家知道对话结束,这里暂时用 log 代替
                    cc.log('对话结束');
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

});
