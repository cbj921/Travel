
cc.Class({
    extends: cc.Component,

    properties: {
        train1:cc.Node,
        train2:cc.Node,
        bg:cc.Node,
        moveSpeed:30,
        _count:1,
        _moveFlag:true,
    },

    onLoad(){
        this.train1.position = cc.v2(0,-6);
        this.train2.position = cc.v2(3642,-6);
    },

    update (dt) {
        this.trainMove(dt);
    },

    trainMove(dt){
        if(this._moveFlag){
            this.train1.x += dt*this.moveSpeed;
            this.train2.x += dt*this.moveSpeed;
            let remain = this._count % 2;
            if(remain == 1){
                if(this.train1.x > this.bg.width / 2){
                    this.train2.x = -2675;
                    this._count ++;   //count的值就在 1 和 2之间反复 
                }
            }else{
                if(this.train2.x >this.bg.width / 2){
                    this.train1.x = -2675;
                    this._count -- ;
                }
            }
        }
    },

});
