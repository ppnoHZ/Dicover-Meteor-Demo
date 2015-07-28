/**
 * Created by Administrator on 2015/7/28.
 */
Template.notifications.helpers({
    notifications: function () {
        //查找当前登录用户下，没有阅读的通知
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationCount: function () {
        //查找未阅读的次数
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});
//生成链接
Template.notificationItem.helpers({
    notificationPostPath: function () {
        //return Router.routes.postPage.path({_id: this.postId});
        return Router.routes.postPage.path({_id: this.postId});
    }
});
//处理阅读事件，更新字段
Template.notificationItem.events({
    'click a': function () {
        Notifications.update(this._id, {$set: {read: true}});
    }
})