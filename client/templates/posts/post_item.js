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
    },
    upvotedClass: function () {
        var userId = Meteor.userId();
        //如果用户登录且没有评论过该帖子
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
    //,
    //commentsCount: function () {
    //    return Comments.find({postId: this._id}).count();
    //}
});
Template.postItem.events({
    //'click span': function (e) {
    //    console.log(e.currentTarget.innerHTML);
    //    e.stopPropagation();//防止冒泡事件产生，备注
    //}
    'click .upvotable': function (e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});