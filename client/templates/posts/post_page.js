/**
 * Created by Administrator on 2015/7/28.
 */
Template.postPage.helpers({
    comments: function () {
        return Comments.find({postId: this._id});
    }
})