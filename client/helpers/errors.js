/**
 * Created by Administrator on 2015/7/27.
 */
//创建本地（客户端）集合
/*

 };*/
Errors = new Mongo.Collection(null);

throwError= function (message) {
    Errors.insert({message:message});
}