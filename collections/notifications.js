/**
 * Created by Administrator on 2015/7/28.
 */
Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    //限制用户只能更新一个字段，且文章是自己的。
    update: function (userId, doc, fieldNames) {
        return ownsDocument(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});
createCommentNotification = function (comment) {
    //根据文章id 查询到文章
    var post = Posts.findOne(comment.postId);
    //自己评论自己的不通知
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        })
    }
}
