// *****************************    let const  ************************************************

/**
 * var
 * 1.可以重复声明
 * 2.不能定义常量 var PI = 3.14
 * 3.不支持块级作用域 if(true){var a = 10},那么这个a也是会定义在全局下面的
 *
 */

let a = 10;
let a = 20; //let 变量名 不能重复声明

const PI = 3.14;
//  试图给一个常量赋值，这里是错误的
PI = 3.15;

if (true) {
    let a = 10;
}
console.log(a); //a没有定义

//以前闭包的写法，//以前js只有两个作用域，一个全局，一个函数级
(function () {
})();

// 现在的闭包写法

// 这样子可以形成一个封闭的作用域

let a = 20;
{
    //let 没有预解析，let没有提升
    console.log(a);
    let a = 10;
}

for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}

// 以前的写法
for (var i = 0; i < 3; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 1000);
    })(i);
}

const PI = 3.14;
console.log(PI);

//虽说常量不能再引用别的对象了，但是他的值，如果是一个引入类型的话，引用对象的属性，还是可以改的。
// const 不能声明两次，需要重复声明需要 {const PI 3.15};
const USER = {name: "wang"};
USER.name = "wangCoder";
console.log(USER);

// *****************************    解构    *****************************************************

/**
 *  解构：分解一个对象的结构
 *
 *
 */

let arr = [1, 2, 3];
// 结构的时候， 等号的两边结构类似，右边还必须是一个真实的值
let [a, b, c] = arr;
console.log(a, b, c);

let arr2 = [{name: 'wang', age: 20}, [1, 2], 3];
// let [{name,age},[d,e],f] = arr2;
// console.log({ name, age }, [d, e], f);
let [json, arr3, f] = arr2;
console.log(json, arr3, f);


//名字不一样的写法
let arr4 = {name: 'wang1', age: 23};
let {name: myName, age: myAge} = arr4;
console.log(myAge, myName);


//默认结构
let obj2 = {name: 'wang', age: 9};
let {name, age = 23} = obj2;
console.log(name, age);


//省略赋值
let arr5 = [1, 2, 3];
let [, , j] = arr5;
console.log(j);


// *****************************    模板字符串    *****************************************************
let name = 'wang', age = 9;
let desc = name + "今年" + age + "岁了";
console.log(desc);

let name = 'wang', age = 9;
//``字符串里可以嵌套变量
let desc = `${name}今年${age}岁了`;
console.log(desc);

//解析原理
let name = 'wang', age = 9;
//``字符串里可以嵌套变量
//``可以换行的
//模板语言很多就是这样的原理---》可以延伸到模板引擎
let desc = `${name}今年${age}岁了`;

function replace(desc) {
    return desc.replace(/\$\{([^]})+\}/g, function (matched, key) {
        console.log(arguments);
        return eval(key);
    });
}

console.log(desc);

let users = [{id: 1, name: 'wang'}, {id: 2, name: 'wangCoder'}, {id: 3, name: 'wangyang'}];
//map()映射，把老数组里面的每一个元素映射为新数组的每一个元素
//join()，把数组连接在一起
let newList = users.map(function (user, index) {
    return `<li>${user.id}:${user.name}</li>`;
}).join('');
let ul = (
    `
    <ul>
      ${newList}
    </ul>
    `
);
console.log(ul);


//带标签的模板字符串就像一个函数调用，
//d=第一个参数，string 就是文本的数组
function desc(strings,name,age){
    console.log(strings);
    console.log(name);
    console.log(age);
}
let str = desc`${name}今年${age}岁了`;


//其他运算符
let strings = {name: 'wang', age: 9};
function desc(strings,...rest){
    console.log(strings);
    console.log(rest);
    let result = '';
    for (let i = 0;i<rest.length;i++){
        result += (strings[i]+rest[i]);
    }
    result += strings[i];
    return result;
}
let str = desc`${name}今年${age}岁了`;
console.log(str);


//startWith
let address1 = 'http://www.baidu.com';
let address2 = 'ftp://www.baidu.com';
if(address1.startsWith('http')){
    console.log("http");
}else if(address2.startsWith('ftp')){
    console.log("ftp");
}


//endWith
let fileName = "avatar.jsp";
if (fileName.endsWith('jpg')||fileName.endsWith('png')){
    console.log("是一张图片");
}


//includes
//判断一个度支持是否包含另外一个字符串
let content = 'abc';
console.log(content.includes('b'));
// console.log(content.indexOf('b') != -1);//这个是以前的方法


//repeat 出现几次
let x = 'x';
console.log(x.repeat(3));






















