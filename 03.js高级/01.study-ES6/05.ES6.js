/**
 * Created by wangyang on 2019-05-06.
 * itwangyang@gmail.com
 * http://www.itwangyang.xyz
 */

/**
 * promise 是一个类，可以创建实例
 * 代码承诺，什么时候回用到承诺，一般是异步任务，就是需要很长时间执行的
 *
 *
 */
let Promise = require('./06.ES6-promise.js');
let p1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    let num = Math.random();//生成一个随机数
    if(num>.5){
      //如果这个promise成功了，会调用成功的回调 fulfilled
      resolve('大');
    }else{
      //如果这个promise失败了，会调用失败的回调 rejected
      reject('小');
    }
  }, 2000);
});

p1.then(function (value) {
  console.log('成功'+value);
},function (reason) {
  console.log('失败'+reason);
});
