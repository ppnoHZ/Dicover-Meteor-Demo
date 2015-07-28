/**
 * Created by Administrator on 2015/7/28.
 */
Comments = new Mongo.Collection('comments');
Meteor.methods({
    commentInsert: function (commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        if (!post) {
            throw  new Meteor.Error('invalid-comment', '必须输入内容');
        }
        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        //更新文章评论数自加 1
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});
        comment._id = Comments.insert(comment);
        //创建评论通知，
        createCommentNotification(comment);

        return comment._id;
    }
})