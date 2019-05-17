/**
 * Created by wangyang on 2019-05-05.
 * itwangyang@gmail.com
 * http://www.itwangyang.xyz
 */


//箭头函数的this是定死的，指向外层的this
//箭头函数虽然好，但是不能应用到所有的情况
let obj8 = {
    name: 'wang',
    getName: () => {
        console.log(this.name);//这里的this是当前模块的this（这类需要node知识）
    }
};

let obj9 = {
    name: '9',
    gn: obj8.getName()
};
obj9.gn();


let arr1 = [23, 4, 54, 6, 100];
//filter,返回true此元素保留在新数组，返回false则删除
let arr2 = arr1.filter(function (item) {
    return item >= 60;
});
console.log(arr2);

//解析原理
Array.prototype.filter = function (fn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        let flag = fn(this[i]);
        flag && newArr.push(this[i]);
    }
    return newArr;
};


let arr3 = Array(3);
console.log(arr3);
arr3.fill(1);
console.log(arr3);

//map reduce  reducerRight  filter  foeEach
//some find findIndex every


//find
let arr4 = [1, 2, 3];
let result = arr4.find(function (item) {
    return item == 2;
});
console.log(result);

//解析原理
let arr4 = [1, 2, 3];
Array.prototype.find = function (fn) {
    for (let i = 0; i < this.length; i++) {
        let flag = fn(this[i]);
        if (flag) {
            return this[i];
        }
    }
};
let result = arr4.find(function (item) {
    return item == 2;
});
console.log(result);


//findIndex

let arr4 = [1, 2, 3];
let result = arr4.findIndex(function (item) {
    return item == 2;
});
console.log(result);

//解析原理
let arr4 = [1, 2, 3];
Array.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.length; i++) {
        let flag = fn(this[i]);
        if (flag) {
            return this[i];
        }
    }
};
let result = arr4.findIndex(function (item) {
    return item == 2;
});
console.log(result);


/**
 *
 * 把一个类数组转成数组
 *
 */

//这个是以前的写法
function print(a, b) {
    let arr = Array.prototype.slice.call(arguments);
    arr.forEach(function (item) {
        console.log(item);
    })
}

print('a', 'b', 'c');


//改进的写法
function print(a, b) {
    Array.prototype.forEach.call(arguments, function (item) {
        console.log(item);
    })
}

print('a', 'b', 'c');

//现在流行的写法
function print(a, b) {
    Array.from(arguments).forEach(function (item) {
        console.log(item);
    })
}

print('a', 'b', 'c');


let arr6 = Array(6);
let arr7 = Array.of(3);
console.log(arr6);
console.log(arr7);


/**
 * 对象
 *
 */

let name = 'wang';
let age = 10;
//如果对象的属性名和变量名如果一样的话，可以二合一
// let obj = {name:name,age:age};
let obj = {name, age};
console.log(obj);


let obj1 = {age: 1};
let obj2 = {age: 2};
let obj3 = {};
//设置obj3的原型为obj1
Object.setPrototypeOf(obj3, obj1);//这句话的原理：obj3.__proto__ = obj1;
console.log(obj3);
console.log(obj3.age);

//原理还可以这样子写
let obj1 = {age: 1};
let obj2 = {age: 2};
let obj3 = {
    __proto__: obj1
};
console.log(obj3.age);

let obj1 = {
    age: 1, getFood() {
        return '面包';
    }
};
let obj2 = {age: 2};
let obj3 = {
    __proto__: obj1,
    getFood() {
        //super可以调用父级的方法
        return '牛奶' + super.getFood();
    }
};
console.log(obj3.getFood());


/**
 * class
 * 以前js里类和构造函数是一体的
 * 类里可以定义构造函数,当你创建一个类的实例的时候就会调用构造函数
 */

//定义一个类
class Parent {
    constructor(name) {
        this.name = name;//实例的私有属性
    }

    //属于实例的公有属性，也就是相当于原型上的属性
    getName() {
        console.log(this.name);
    }
}

let p = new Parent('wang');
p.getName();


//解析原理
var _createClass = function () {
    //target目录  props是属性对象数组
    function defineProperties(target, props) {
        //循环每个元素
        for (var i = 0; i < props.length; i++) {
            //取出每个属性描述器
            var descriptor = props[i];
            //可枚举 for in 能循环出来
            descriptor.enumerable = descriptor.enumerable || false;
            //可配置 可以通过delete 删除此属性
            descriptor.configurable = true;
            //可修改值
            if ("value" in descriptor) descriptor.writable = true;
            //真正的向Parent类的原型对象上增加属性
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    //1参数是构造函数 原型上的属性 静态属性(类上的属性)
    return function (Constructor, protoProps, staticProps) {
        //如果有原型属性的话
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

//类的调用检查 1参数是类的实例 2参数构造函数
function _classCallCheck(instance, Constructor) {
    //如果这个实例不是这个构造函数的实例的话，就报错了Cannot call a class as a function.不能把一个类当成普通函数来调用
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent(name) {
        //为了保证这个类只能用来new对象
        _classCallCheck(this, Parent);

        this.name = name; //实例的私有属性
    }

    //属于实例的公有属性，也就是相当于原型上的属性


    _createClass(Parent, [{
        key: "getName",
        value: function getName() {
            console.log(this.name);
        }
    }]);

    return Parent;
}();


































