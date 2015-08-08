/**
 * 创建一个全局的Helper方法
 *
 * 调用：{{pluralize votes "Vote"}}
 * votes 对应 参数n  由于这个字段已经在{{}}里面了，所以这里没有再次使用
 * “vote” 对应参数 thing
 *
 * Created by Administrator on 2015-07-28.
 *
 *
 */

UI.registerHelper('pluralize', function (n, thing) {
    if (n === 1) {
        return '1' + thing;
    } else {
        return n + '' + thing + 's';
    }
});