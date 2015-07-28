/**
 * Created by Administrator on 2015/7/24.
 *
 * 先执行拒绝回调，后执行允许回调
 * 通过：所有的拒绝为false，只要有一个允许为true就可以通过
 * 不通过：只有一个拒绝为true (后面的验证都不会走了)，
 *        所有的都为false
 *
 */
Posts = new Mongo.Collection('posts');
//允许客户端调用insert方法
//只要客户端拥有userId就允许插入帖子
//允许：只有返回true的时候才是允许进行操作
//当Post.insert被调用的时候会逐个调用定义的允许的回调函数⽆论是在我们 app 的客户端代码调⽤，还是在浏览器控制台调⽤

Posts.allow({
    //insert: function (userId, doc) {
    //    return !! userId;
    //}

    //更新和删除都进行验证
    update: function (userId, post) {
        console.log('文章更新验证');
        return ownsDocument(userId, post);
    },
    remove: function (userId, post) {
        console.log('文章删除验证');
        return ownsDocument(userId, post);
    }
});
/*限制用户只能更新指定字段
 使⽤ Underscore 的 without() ⽅法返回
 ⼀个不包含 url 和 title 字段的⼦数组。

 */
//拒绝
//限制更新只能更新指定字段
Posts.deny({
    update: function (userId, post, fieldNames) {
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});
Posts.deny({
    update: function (userId, post, fieldName, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
})

validatePost = function (post) {
    var errors = {};
    if (!post.title) {
        errors.title = '请填写标题';
    }
    if (!post.url) {
        errors.url = '请填写URL';
    }
    return errors;
}

//使用内置的方法提交帖子（ Meteor Methods 在服务端执行）
Meteor.methods({
    postInsert: function (postAttributes) {
        //检查Meteor.userId() 是否是个字符串
        check(Meteor.userId(), String);
        //检查postAttributes 是否包含title和url字符串
        check(postAttributes, {
            title: String,
            url: String
        });
        // begin 服务端验证
        var errors = validatePost(postAttributes);
        if (errors.title || errors.url) {
            throw new Meteor.Error('invalid-post', '你必须输入标题和URL');
        }
        // end 服务端验证

        //begin 测试延迟补偿
        /*    if (Meteor.isServer) {
         postAttributes.title += '(Server)';
         Meteor._sleepForMs(5000);

         } else {
         postAttributes.title += '(Client)';
         }*/
        //end 测试延迟补偿

        //检查是否存在相同url的帖子，如果存在返回相应帖子的id，界面跳转到帖子的页面
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        //._extend()将一个对象的属性传递到另外一个对象
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    }
});

