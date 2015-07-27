/**
 * Created by Administrator on 2015/7/24
 *
 *
 *
 * loadingTemplate  .
 *
 * waitOn 用户第一次访问的时候发生一次
 */


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('posts');
    }
});
//列表路由
Router.route('/', {name: 'postsList'});
//详情路由
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});
//添加的路由
Router.route('/submit', {name: 'postSubmit'});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});


var requirLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}
Router.onBeforeAction(requirLogin, {only: 'postSubmit'});

