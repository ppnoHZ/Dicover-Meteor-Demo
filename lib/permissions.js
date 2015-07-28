/**
 * Created by Administrator on 2015/7/27.
 */
ownsDocument = function (userId, doc) {
    console.log('权限验证');
    return doc && doc.userId === userId;
}