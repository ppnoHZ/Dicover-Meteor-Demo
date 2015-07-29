/**
 * Created by Administrator on 2015/7/29.
 *----------------------------------------------------------
 * 模板的helper可以带参数
 * helper通过 arguments访问
 *----------------------------------------------------------
 * Array.property.slice.call(arguments, 0)
 * 从0开始循环arguments，返回一个新的数组。
 * ---------------------------------------------------------
 * active && 'active'
 * 当 false && myString 返回 false , 当 true && myString 返回
 * myString 。
 *----------------------------------------------------------
 */
Template.header.helpers({
        activeRouteClass: function () {
            var args = Array.prototype.slice.call(arguments, 0);
            //console.log(args);
            //args.forEach(function (name) {
            //    console.log(name);
            //});

            args.pop();
            var active = _.any(args, function (name) {
                return Router.current() && Router.current().route.getName() === name;
            });
            //当 false && myString 返回 false , 当 true && myString 返回myString 。
            return active && 'active';
        }
    }
)