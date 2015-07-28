/**
 * Created by Administrator on 2015/7/24
 *
 * 路由
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
//发布文章的路由
Router.route('/submit', {name: 'postSubmit'});
//当url不合法，没有匹配到对于路由，跳转到指定的错误页面
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
//修改文章的路由
//name 是模板的名称
//data 是数据上下文
Router.route('/posts/:_id/edit',{
    name:'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});


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
//发布文章之前检测用户是否登录
Router.onBeforeAction(requirLogin, {only: 'postSubmit'});

