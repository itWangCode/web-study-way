/**
 * Created by wangyang on 2019-05-06.
 * itwangyang@gmail.com
 * http://www.itwangyang.xyz
 */

/**
 * 类的继承
 *
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

class Child extends Parent {
    constructor(name, age) {
        //super父类的构造函数
        super(name);
        this.age = age;
    }

    getAge() {
        console.log(this.age());
    }
}


//------------------------解析原理---------------------------------

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    //如果父类不是函数，并且父类不等于null
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    //给子类的构造函数重写原型prototype
    subClass.prototype = new superClass();
    //让子类的prototype 等于父类的一个实例。另外还要覆盖constructor,让constructor指向subClass,否则 constructor会指向superClass
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        //重定constructor
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    //subClass.__proto__ = superClass
    //让子类的__proto__等于父类，这一步是为了让子类继承父类的静态属性
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);

        this.name = name; //实例的私有属性
    }

    //静态属性是类的属性


    _createClass(Parent, [{
        key: 'getName',

        //属于实例的公有属性，也就是相当于原型上的属性
        value: function getName() {
            console.log(this.name);
        }
    }], [{
        key: 'hello',
        value: function hello() {
            console.log('hello');
        }
    }]);

    return Parent;
}();

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
        //进行类调用检查，保证只能new
        _classCallCheck(this, Child);

        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));
        //super指的是父类的构造函数


        _this.age = age;
        return _this;
    }

    _createClass(Child, [{
        key: 'getAge',
        value: function getAge() {
            console.log(this.age);
        }
    }]);

    return Child;
}(Parent);

//---------------------------------------------------------


Object.create = function (prototype) {
    //    先创建一个空的函数
    function Fn() {

    }

    Fn.prototype = prototype;

    //    返回这个函数的实例
    return new Fn();//__proto__
};


//---------------------------------------------------------
/**
 *
 * @这样子写是有问题的
 * 会把Parent继承过来
 *
 */

function Parent(name) {
    this.name = name;
}

//静态属性，不需要实例化，不需要通过是来来调用，所有的实例共享，类级别
Parent.hello = 'hello';

function Child() {

}

// Child.prototype = new Parent();
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
let child = new Child();
console.log(child.name);

// __proto__   setPrototypeOf  和  prototype 有区别么？？？
//继承是通过__proto__ 来关联的
//setPrototypeOf其实就是给__proto__赋值


/**
 * 类和类的实例
 * 一个属性如果放在原型上的话，是可通过实例来调用的
 * 但是放在类上的，不能用过实例来调用，只能用类名来调用的
 *
 * 实例是私有的
 *
 */


/**
 * 生成器和迭代器
 * 它是你理解KOA的基础，另外也是现代异步解决方案async await的基础
 *
 */

/**
 *
 * @read 是一个迭代器
 *
 */

function read(books) {
    let index = 0;
    return {
        next() {
            let done = index === books.length - 1;
            let value = books[index++];
            return {
                value,
                done
            }
        }
    }
}

//迭代器可以不停的调用next方法得到一个结果
let it = read(['js', 'node', 'mysql']);
// let r1 = it.next();
// console.log(r1);
//
// let r2 = it.next();
// console.log(r2);

//可以写循环
let result;
do {
    result = it.next();
    console.log(result);
} while (!result.done) ;


/**
 * 生成器的函数和普通函数长得不一样,返回迭代器
 * 执行的时候也不一样
 */
//------------ES6写法
function* read(books) {
    console.log('开始');
    for (let i = 0; i < books.length; i++) {
        //yield 放弃屈服的意思
        yield books[i];
    }
    console.log('结束');
}

let it = read(['js', 'node', 'vue']);
let result;
do {
    result = it.next();
    console.log(result);
} while (!result.done) ;











