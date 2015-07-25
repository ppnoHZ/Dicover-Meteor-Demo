/**
 * Created by Administrator on 2015/7/24.
 */
Template.postItem.helpers({
    domain: function () {
        var a=document.createElement('a');
        a.href=this.url;
        return a.hostname;
    }
})