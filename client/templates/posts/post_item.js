/**
 * Created by Administrator on 2015/7/24.
 */
Template.postItem.helpers({
    domain: function () {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    ownPost: function () {
        //比较文章的所有者是否和当前登录有的Id是否相等。
        //console.log(this.userId);
        return this.userId === Meteor.userId();
        //return true;
    }
});
Template.postItem.events({
    'click span': function (e) {
        console.log(e.currentTarget.innerHTML);
        e.stopPropagation();//防止冒泡事件产生，备注
    }
});