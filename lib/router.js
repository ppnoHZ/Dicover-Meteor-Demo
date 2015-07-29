/**
 * Created by Administrator on 2015/7/24
 *
 * 路由
 *
 * loadingTemplate  .
 *
 * waitOn 用户第一次访问的时候发生一次
 *
 *
 * 疑问：
 * 帖子排序的路由中使用 name: 'bestPosts'
 * 这个name是模板的名称，但是实际上这个是不存在的。
 */


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('notifications');//,Meteor.subscribe('comments')];
    }
});
//列表路由,和分页的重复
//Router.route('/', {name: 'postsList'});
//详情路由
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    },
    waitOn: function () {
        return [Meteor.subscribe('comments', this.params._id), Meteor.subscribe('singlePost', this.params._id)];
    }
});
//发布文章的路由
Router.route('/submit', {name: 'postSubmit'});
//修改文章的路由
//name 是模板的名称
//data 是数据上下文
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    },
    waitOn: function () {
        return Meteor.subscribe('singlePost', this.params._id);
    }
});

//分页，如果没有传分页条数，则默认5条
/*
 Router.route('/:postsLimit?', {
 name: 'postsList',
 waitOn: function () {
 var limit = parseInt(this.params.postsLimit) || 5;
 return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
 }, data: function () {
 var limit = parseInt(this.params.postsLimit) || 5;
 return {
 posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
 }
 }
 });
 */
//分页，如果没有传分页条数，则默认5条
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function () {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function () {
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function () {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function () {
        return Posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.postsLimit();
        //nexPath 在子类中指定
    /*    var nextPath = this.route.path({
            postsLimit: this.postsLimit(
            ) + this.increment
        });*/
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    }
    /*    ,
     waitOn: function () {
     return Meteor.subscribe('posts', this.findOptions());
     }*/
})
//最新的帖子
NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.newPosts.path({
            postsLimit: this.postsLimit() + this.increment
        })
    }
});
//票数最多的帖子排序
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.bestPosts.path({
            postsLimit: this.postsLimit() + this.increment
        })
    }
});
Router.route('/', {
    name: 'home',
    controller: NewPostsController
});
Router.route('/new/:postsLimit?', {
    name: 'newPosts'
});
Router.route('/best/:postsLimit?', {
    name: 'bestPosts'
});

/*Router.route('/:postsLimit?', {
    name: 'postsList'
});*/


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

//当url不合法，没有匹配到对于路由，跳转到指定的错误页面
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

//发布文章之前检测用户是否登录
Router.onBeforeAction(requirLogin, {only: 'postSubmit'});


