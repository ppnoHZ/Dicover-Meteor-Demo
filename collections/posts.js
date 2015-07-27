/**
 * Created by Administrator on 2015/7/24.
 */
Posts = new Mongo.Collection('posts');
//允许客户端调用insert方法
//只要客户端拥有userId就允许插入帖子
//Posts.allow({
//    insert: function (userId, doc) {
//        return !! userId;
//    }
//});
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

        //begin 测试延迟补偿
    /*    if (Meteor.isServer) {
            postAttributes.title += '(Server)';
            Meteor._sleepForMs(5000);

        } else {
            postAttributes.title += '(Client)';
        }*/
        //end 测试延迟补偿

        //检查是否存在相同url的帖子
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
        })
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    }
})

