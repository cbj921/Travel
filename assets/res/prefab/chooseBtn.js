
cc.Class({
    extends: cc.Component,

    properties: {
        _optionData:null,
        labelText:cc.Label,
    },
    
    btnInit(talkSys,text,talkTarget,option){
        // 得到talkSys节点
        this.talkSys = talkSys;
        this.btn = this.node.getComponent(cc.Button);
        this.labelText.string = text;
        // 监听按钮点击事件
        cc.director.on('btnPress',()=>{
            this.btn.interactable = false;
        },this);
        // 获取选项信息
        this._optionData = {
            target:talkTarget,
            option:option,
        }
    },

    // 按钮按下
    btnPress(){
        // 让其他的按钮都变成不可点击
        cc.director.emit('btnPress'); 
        // 发送选择完成事件,并且发送选择信息
        this.talkSys.emit('finishSelect',this._optionData);
    },

    // update (dt) {},
});
