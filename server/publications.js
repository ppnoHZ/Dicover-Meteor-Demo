/**
 * Created by Administrator on 2015/7/24.
 */
Meteor.publish('posts', function () {
    return Posts.find();
})