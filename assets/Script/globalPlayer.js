
cc.Class({
    extends: cc.Component,

    properties: {
        _armatureDisPlay : null,
        _armature : null,
    },

    onLoad() {
        // 将该节点添加成常驻节点
        cc.game.addPersistRootNode(this.node);
        // 监听移动事件
        this.addListenMoveEvent();
        // 获取 ArmatureDisplay
        this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay);
        // 获取 Armatrue
        this._armature = this._armatureDisPlay.armature();
        // 初始化角色状态 : stand
        this._armatureDisPlay.timeScale = 0.1;
        this._armatureDisPlay.playAnimation('stand',0);
    },

    addListenMoveEvent(){
        cc.director.on('action',this.playMoveAnim,this);
    },

    playMoveAnim(event){
        if(event == 'right'){
            this.node.scaleX = 1;
            this._armatureDisPlay.timeScale = 1;
            this._armatureDisPlay.playAnimation('walk',0);
        }else if(event == 'left'){
            this.node.scaleX = -1;
            this._armatureDisPlay.timeScale = 1;
            this._armatureDisPlay.playAnimation('walk',0);
        }else if(event == 'up'){
            cc.log('up');
        }

        if(event == 'stop'){
            this._armatureDisPlay.timeScale = 0.1;
            this._armatureDisPlay.playAnimation('stand',0);
        }
    },

    // update (dt) {},
});
