/**
 * Created by Administrator on 2015/7/27.
 */
Template.postSubmit.events(
    {
        'submit form': function (e) {
            console.log('提交');
            e.preventDefault();//确保浏览器不会再继续尝试提交表单
            var post = {
                url: $(e.target).find('[name=url]').val(),
                title: $(e.target).find('[name=title]').val()
            };
            //验证是否输入合法，不合法就往Session里写
            var errors = validatePost(post);
            if (errors.title || errors.url) {
                return Session.set('postSubmitErrors', errors);
            }
            //post._id = Posts.insert(post);//入库1
            //调用服务端方法，里面会有验证是否重复
            Meteor.call('postInsert', post, function (error, result) {
                if (error) {
                    //return alert(error.reason);
                    return throwError(error.reason);
                }
                if (result.postExists) {
                    throwError('链接已经存在');
                }
                //Router.go('postsList');//测试延迟补偿
                Router.go('postPage', {_id: result._id});//跳转
            })
        }
    }
);
Template.postSubmit.created = function () {
    Session.set('postSubmitErrors', {});
};
Template.postSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
