/**
 * Created by Administrator on 2015/7/24.
 */
console.log('on server');
if(Posts.find().count()===0)
{
    console.log('create data');
    Posts.insert({
        title: 'Introducing Telescope',
        url: 'http://sachagreif.com/introducing-telescope/'
    });
    Posts.insert({
        title: 'Meteor',
        url: 'http://meteor.com'
    });
    Posts.insert({
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    });
}