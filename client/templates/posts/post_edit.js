/**
 * Created by Administrator on 2015/7/27.
 */
Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();
        var currentPostId = this._id;
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        //验证修改是否合法，和添加文章的验证是一个方法
        var errors = validatePost(postProperties);
        if (errors.title || errors.url) {
            return Session.set('postEditErrors', errors);
        }
        //$set只更新指定字段的值，保留其他字段的值。
        Posts.update(currentPostId, {$set: postProperties}, function (error) {
            if (error) {
                throwError(error.reason);
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        })
    },
    'click .delete': function (e) {
        e.preventDefault();
        if (confirm('是否删除？')) {
            var currentPostId = this._id;
            //操作之前会去执行权限验证。
            Posts.remove(currentPostId, function (error) {
                if (error) {
                    throwError(error.reason);
                } else {
                    Router.go('home');
                }
            });

        }
    }
})
Template.postEdit.created = function () {
    Session.set('postEditErrors', {});
};
Template.postItem.helpers({
    errorMessage: function (field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    }
});
