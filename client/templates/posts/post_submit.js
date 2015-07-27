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
            //post._id = Posts.insert(post);//入库1
            //入库2
            Meteor.call('postInsert', post, function (error, result) {
                if (error) {
                    return alert(error.reason);
                }

                if (result.postExists) {
                    alert('链接已经存在');
                }
                //Router.go('postsList');//测试延迟补偿

                Router.go('postPage', {_id: result._id});//跳转
            })
        }
    }
)