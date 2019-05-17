/**
 * Created by wangyang on 2019-05-03.
 * itwangyang@gmail.com
 * http://www.itwangyang.xyz
 */


//补全---->可以用到时间补全，就是说：比如：7：01，可以补全
let str5 = 'abc';
console.log(str5.padStart(5, '0'));
console.log(str5.padEnd(5));


/**
 * 函数
 */


//1。默认函数,a.必填项不填写报错，b.有些参数没有传参的话，可以有默认值
//以前的写法
function ajax(url, method, dataType) {
    console.log(url);
    console.log(method);
    console.log(dataType);
    if (typeof url == 'undefined') throw Error('url不能为空');
    method = method ? method : 'GET';
}

//现在的写法（目前，后面还有新的）
function ajax(url = new Error('url不能为空'), method = 'GET', dataType = 'json') {
    console.log(url);
    console.log(method);
    console.log(dataType);
}

ajax('/user', '/POST');

//解析--
function ajax() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('url不能为空');
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'json';
    console.log(url);
    console.log(method);
    console.log(dataType);
}

ajax('/user', '/POST');


//循环求和-----forEach
function sum(prefix, ...rest) {
    let result = 0;
    rest.forEach(function (item) {
        result += item;
    });
    return prefix + (result);
}

sum('$', 1, 2, 3, 4, 5);


//reduce  计算 汇总 收敛你 吧一个数组中的一堆值计算出来的一个值
function sum(prefix, ...rest) {
    let result = rest.reduce(function (val, item) {
        return val + item;
    });
    return prefix + (result);
}

sum('$', 1, 2, 3, 4, 5);


//reduce---讲解
let arr4 = [1, 2, 3];
//可以传一个参数，也可以传两个参数
//第二个参数表示初始值
//上一次执行结果会成为下一次的初始追
//如果没有给初始追的话，第一次执行函数的时候，val=第一个元素，item=第二元素
//reduce从左往后算

/**
 *
 * @type {*|number}
 *
 */
let result = arr4.reduce(function (val, item, index, origin) {
    console.log(val, item);
    // 0 1
    // 1 2
    // 3 3

    let sum = val + item;//返回值会成为下一次函数执行的时候的val
    if (index == origin.length - 1) {
        return sum / origin.length;
    } else {
        return sum;
    }
    return sum;
}, 0);
console.log(result);


//reduce---原理
let arr4 = [1, 2, 3];
Array.prototype.reduce = function (reducer, initiaVal) {
    for (let i = 0; i < this.length; i++) {
        initiaVal = reducer(initiaVal, this[i]);
    }
    return initiaVal;

};
let result = arr4.reduce(function (val, item) {
    return val + item;
}, 0);
console.log(result);


/**
 *
 * 展开运算符:--相当于把数组中的每个元素一次取出放在这
 *
 * */
//以前的写法
let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
let arr7 = [].concat(arr5, arr6);
console.log(arr7);


//现在的写法-----相当于把数组中的每个元素一次取出放在这
let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
let arr7 = [...arr5, ...arr6];
console.log(arr7);


let arr6 = [4, 5, 6];
// let max = Math.max(1,2,3);//方法一
// let max = Math.max.apply(null,arr6);//方法二
let max = Math.max(...arr6);//方法三--推荐用这个
console.log(max);


//拷贝-浅拷贝>---如何吧obj1 ,obj2的值拷贝到obj3中
let obj1 = {name: '1'};
let obj2 = {age: 2};
let obj3 = {};

/**
 * 1.方法一：循环赋值
 * @type {{key in}}
 */
for (let key in obj1) {
    obj3[key] = obj1[key];
}
for (let key in obj2) {
    obj3[key] = obj2[key];
}
console.log(obj3);

/**
 * 2.方法二：assign
 * 1.参数是target，后面都是来源对象
 * @type {{assign}}
 */
Object.assign(obj3, obj1, obj2);
console.log(obj3);

/**
 * 3.方法三：对象解析
 *
 * @type {{...}}
 */
obj3 = {...obj1, ...obj2};
console.log(obj3);


//深拷贝
let obj5 = {
    name: 'wangyang', home: {
        city: 'sichuang'
    }
};
// let obj6 = {};
// obj6 = Object.assign(obj6,obj5);

//真正的深拷贝--这个会浪费空间的
// let obj6 = JSON.parse(JSON.stringify(obj5));


//推荐写这种深拷贝---这个才是牛气的代码
function clone(origin) {
    let newObj = {};
    for (let key in origin) {
        if (typeof origin[key] == 'object') {
            newObj[key] = clone(origin[key]);
        } else {
            newObj[key] = origin[key];
        }
    }
    return newObj;
}

let obj6 = clone(obj5);

obj6.home.city = "guangzhou";
console.log(obj6);
console.log(obj5);


/**
 * 箭头函数
 *
 */
//以前的写法
let sum = function (a, b) {
    return a + b;
};
console.log(sum(1, 2));

//现在的写法
let sum = (a, b) => {
    return a + b;
};
console.log(sum(1, 2));


//如果有且只有一个参数，可以省略小括号
//如果只有返回值，没有的函数体代码，可以省略{}
let double = num => num*2;
console.log(double(2));


//箭头函数this
let obj = {
    name:'wang',
    getName(){
        // setTimeout(function () {
        //     console.log(this.name);
        // },1000)

        //箭头函数没有自己的this，他会使用上层的this
        setTimeout(()=> {
            console.log(this.name);
        },1000)
    }
};
obj.getName();


//解析
let obj = {
    name:'wang',
    getName(){
        let self = this;
        setTimeout(()=> {
            console.log(self.name);
        },1000)
    }
};
obj.getName();














