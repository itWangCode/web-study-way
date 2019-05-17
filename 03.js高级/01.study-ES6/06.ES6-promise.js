/**
 * Created by wangyang on 2019-05-12.
 * itwangyang@gmail.com
 * http://www.itwangyang.xyz
 */

//构造函数的参数是一个异步任务
function Promise(task) {
    task();
}
module.exports = Promise;