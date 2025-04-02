### 1. javascript 的数据类型有哪些？

基本数据类型：Number、String、Boolean、Null、Undefind、Symbol、BigInt
引用类型：Object、Array、Function  
基础类型存放于栈，变量记录原始值；引用 类型存放于堆，变量记录地址；

### 2. ==和===的区别？

== 先隐式类型转换，于丹判断值是否相等。  
=== 直接判断类型+值是否相等。

### 3. 如何判断 javascript 的数据类型？

1. **typeof 操作符：** 可以用来确定一个的基本数据类型，返回一个表示灵气类型的字符串。
2. **Object.prototype.toString:** 用于获取更详细的数据类型信息。
3. **instanceof 操作符：** 用于检查对象是否属于某个类的实例。
4. **Array.isArray:** 用于检查一个出发去看是否是数组。

### 4. ES 每个版本引入了什么内容？

ECMAScript 是一种用于编写 javascript 的标准化脚本语言。下面是每个版本一些重要特性和区别：

1. ES6（ECMAScript 2015）

- 引入 let 和 const 关键字，用于声明块级作用域的变量
- 引入箭头函数
- 添加了模板字符串
- 引入解构赋值
- 引入了类和模块
- 引入了 Promise

2. ES7（ECMAScript 2016）

- 引入 Array.prototype.includes()方法，用于检查数组是否包含特定元素。
- 引入了指数操作符

3. ES8（ECMAScript 2017）

- 引入异步函数（async/await）
- 添加了 Object.values()和 Object.entries()方法，用于遍历吃饭确认值和键值对

4. ES9（ECMAScript 2018）

- 引入了一度迭代器
- 添加了 Promise.finally()方法，对于指定无论 Promise 状态如何都执行的回调函数。
- 引入了对象的扩展运算符

4. ES10（ECMAScript 2019）

- 引入了 Array.prototype.flat()和 Array.prototype.flatMap()方法，用于处理嵌套数组
- 添加了 String.prototype.trimStart()和 String.prototype.trimEnd()方法，用于去除字符中开头和结尾的空格。
- 引入了动态导入

5. ES11（ECMAScript 2010）

- 引入了可选链操作符
- 添加了空值合并操作符
- 引入 BigInt 类型，用于处理超出 Number 类型范围的整数

### 5. 变量提升&函数提升

- var 会有变量提升
- 优先级： 函数提升 > 变量提升

```javascript
console.log(s);
var s = 2;
function s() {}
console.log(s);
```

### 6. 说说你对闭包的理解？

闭包有三个特性：

1. 函数嵌套函数
2. 函数内部可以引⽤外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收,会永远留驻在内存中

使⽤闭包主要是为了设计私有的⽅法和变量。
**优点：** 是可以避免全局变量的污染，
**缺点：** 是闭包会常驻内存，会增⼤内存使⽤量，使⽤不当很容易造成内存泄露。

### 7. 如何理解 JS 的异步？

JS 是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。而浏览器主线程承担着诸多工作，渲染页面、执行 JS 都在其中运行。如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。

所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程高度执行。

在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

### 8. 阐述一下 JS 的事件循环？

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。  
在 chrome 中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适 的时候将任务加入到队列末尾即可。
过去把消息队列简单分为宏队列和微队列，这种说法目前已经无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。  
根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列，不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度任务。

### 9. JS 中的计时器能做到精确计时吗？为什么？

不行，因为：

1. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就是携带了这些偏差
2. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
3. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

### 10. 任务有优先级吗？

任务没有优先级，在消息队列中先进先出；

但消息队列是有优先极的

根据 W3C 的最新解释：

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。
- 浏览器必须准备好一个微队列，微队列的任务优先所有其他的任务。

  在目前的 chrome 的实现中，至少包含了下面的队列：

- 延时队列：用于存放计时器到达后的回调任务，优先级中
- 交互队列：用于存放用户操作后产生的事件处理处理，优先级高
- 微队列：用户存放需要最快执行的任务，优先级最高

### 11. 数组去重的方法？

- Set 只允许存储唯一的值，可以将数组转换为 Set，然后再将 Set 转换回数组以去重

```javascript
const arr = [1, 1, 2, 4, 4, 5];
console.log([...new Set(arr)]);
```

- 利用 filter 方法来遍历数组，只保留第一次出现的元素

```javascript
const arr = [1, 1, 2, 4, 4, 5];
const uniqueArr = arr.filter(
  (value, index, self) => self.indexOf(value) === index
);
```

- 使用 reduce 方法逐个遍历数组元素，构建一个新的数组，只添加第一次出现的元素。

```javascript
const arr = [1, 1, 2, 4, 4, 5];
const uniqueArr = arr.reduce((acc, current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);
```

- 使用 indexOf 方法，遍历数组，对于每个元素，检查其在数组中的索引，如果第一次出现，则添加到新数组

```javascript
const arr = [1, 1, 2, 4, 4, 5];
const uniqueArr = [];
arr.forEach((value) => {
  if (uniqueArr.indexOf(value) === -1) {
    uniqueArr.push(value);
  }
});
```

- 使用 includes 方法，类似于 indexOf 方法，只不过使用 includes 来检查元素是否已存在于新数组；

```javascript
const arr = [1, 1, 2, 4, 4, 5];
const uniqueArr = [];
arr.forEach((value) => {
  if (!uniqueArr.includes(value)) {
    uniqueArr.push(value);
  }
});
```

### 12. 原型、构造函数、实例、原型链

构造函数是可以通过 new 运算符来⽣成⼀个实例；  
构造函数也是函数；  
函数有⼀个 prototype 属性既原型对象  
构造函数.prototype.constructor === 构造函数  
每个实例都有⼀个 \_\_proto\_\_ 来指向原型对象  
即 实例.\_\_proto\_\_ === 构造函数.prototype  
判断是否直接由该构造函数⽣成的实例则使⽤实例.constructor 去对⽐查看

```javascript
var MM = function () {
  this.name = "o4";
}; // MM是构造函数, MM.prototype是原型对象;
var o4 = new MM(); // o4 是实例
console.log(MM.prototype === o4.__proto__); // true
console.log(MM.prototype.constructor === MM); // true
```

### 13. 提升⻚⾯的⽅法有那些？

1. 资源压缩合并，减少 HTTP 请求;
2. ⾮核⼼代码异步加载;
   **异步加载的⽅式**

   - 动态脚本加载
   - defer
   - async

   **异步加载的区别**

   - defer 是在 HTML 解析完之后才会执⾏，如果是多个，执照加载的顺序依次执⾏；
   - async 是在加载完之后⽴即执⾏，如果是多个，执⾏顺序与加载顺序⽆关；

3. 利⽤浏览器的缓存;
   **缓存的分类**
   - 强缓存:
     // 过期的绝对时间
     expires: Fri, 19 May 2023 04:44:54 GMT
     // 以客服端相对时间，拿⽂件 31536000 这么多时间以内使⽤缓存数据
     cache-control: max-age=31536000
   - 协商缓存:
     // 上次修改时间,是由服务器发送给客户端的 HTTP 请求头标签
     last-modified: Sat, 25 Dec 2021 12:21:26 GMT
     // 上次修改时间,则是由客户端发送给服务器的 HTTP 请求头标签
     if-modified-since: Sat, 25 Dec 2021 12:21:26 GMT
     //在你第⼆次发起同⼀个请求时，客户端会同时发送⼀个 If-None-Match，⽽它的
     值就是 Etag 的值,
     然后，服务器会⽐对这个客服端发送过来的 Etag 是否与服务器的相同，
     如果相同，就将 If-None-Match 的值设为 false，返回状态为 304，客户端继续使
     ⽤本地缓存，不解析服务器返回的数据（这种场景服务器也不返回数据，因为服务器
     的数据没有变化嘛）
     如果不相同，就将 If-None-Match 的值设为 true，返回状态为 200，客户端重新
     解析服务器返回的数据
     if-none-match:"3e86-410-3596fbbc"
     // 当你第⼀次发起 HTTP 请求时，服务器会返回⼀个 Etag
     etag: "3e86-410-3596fbbc"
4. 使⽤ CDN;
5. 预解析 DNS;
   // 强制打开 http 预解析

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<lik ref="dns-prefetch" href="//host_name_to_prefetch.com" />
```
