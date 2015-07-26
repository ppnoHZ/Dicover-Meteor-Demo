/**
 * Created by Administrator on 2015/7/24.
 */
Template.postItem.helpers({
    domain: function () {
        var a=document.createElement('a');
        a.href=this.url;
        return a.hostname;
    }
});
Template.postItem.events({
    'click span': function (e) {
        console.log(e.currentTarget.innerHTML);
        e.stopPropagation();//防止冒泡事件产生，备注
    }
})