/**
 * Created by Administrator on 2015/7/27.
 */
Template.layout.helpers({
    pageTitle: function () {
        return Session.get('pageTitle');//Session不在用户之间共享，甚至是浏览器标签之间
    }
});
Template.layout.rendered = function () {
    this.find('#main')._uihooks = {
        insertElement: function (node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn();
        },
        removeElement: function (node) {
            $(node).fadeOut(function () {
                $(this).remove();
            })
        }
    }
};