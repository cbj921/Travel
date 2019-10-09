/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 09:38:15
 * @LastEditTime: 2019-08-10 09:38:58
 * @LastEditors: Please set LastEditors
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        // 添加为常驻节点
        cc.game.addPersistRootNode(this.node);
    },
});
