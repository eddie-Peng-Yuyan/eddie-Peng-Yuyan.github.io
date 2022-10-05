---
title: Ts
date: 2022-10-04
sidebar: auto
---

# Ts学习笔记 学会了就是自己的

## 1. 基础类型
```ts
const name: string = 'Eddie';
const age: number = 18;
let flag: boolean = true;
// 在ts中，数组有两种定义方式
// 一个数组在Ts的开发中，最好存放的都是同一种类型的数据
const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3]; // 不过这种写法和React中jsx的写法有点像会导致冲突，所以一般不用这种写法

// object可以用于描述一个对象
const obj1: object = { name: 'Eddie', age: 18 };

// 但是不能从这个对象中读取属性，因为这个对象的类型是object，而不是{ name: string, age: number }
obj1['name'] = 'Eddie'; // 这样写会报错
console.log(obj1['age']) // 这样写会报错
// 所以最好是不要这样写 object，而是用下面的这种写法
const obj2: { name: string, age: number } = { name: 'Eddie', age: 18 };
// 或者直接不写让Ts自己推断

// Symbol类型 可以定义相同的名称，但是值不一样 不过一般用不到
const s1: symbol = Symbol('name');
const s2: symbol = Symbol('name');

const person = {
    [s1]: 'Eddie',
    [s2]: '彭于晏'
}

// null 和 undefined
const n1: null = null;
const n2: undefined = undefined;

```
## 2. 数据类型
### 2.1 any类型的使用
```ts
// 某些情况下遇到一些无法确定的类型，可以使用any类型
let a: any = 'Eddie';
a = 18;
a = true;

const arr3: any[] = [1, 'Eddie', true];
```
### 2.2 unknown类型的使用
```ts
// unknown类型只能赋值给any和unknown类型,any类型可以赋值给任意类型
// unknown类型是安全的any类型
let a: unknown // 最好不要使用any类型，因为any类型可以赋值给任意类型，所以会导致一些不可预知的错误
let messge: string = a; // 会报错 因为a是unknown类型，不能赋值给string类型
let num: number = a; // 会报错 因为a是unknown类型，不能赋值给number类型
```
### 2.3 void类型的使用
```ts
// void类型表示没有任何类型，一般用于定义方法的时候方法没有返回值
function fn(): void {
    console.log('hello world');
}
```
### 2.4 never类型的使用
```ts
// never类型表示永远不会有返回值的类型
function fn(): never {
    throw new Error('报错了');
}
```
### 2.5 tuple元组类型的使用
```ts
// 元组类型表示一个已知元素数量和类型的数组，各元素的类型不必相同
const arr4: [string, number] = ['Eddie', 18];
// 元组类型的应用场景
function useState<T>(state: T) { // <T> 表示泛型
    let currentState = state
    const changeState = (newState: T) => {
        currentState = newState
    }
    // 可以定义返回的数据类型如果不用元组类型，那就只能用any类型那样是不安全的
    const tuple: [T, (newState: T) => void] = [currentState, changeState]
    return tuple
}

const [counter, setCounter] = useState<number>(10); // 这里的<number>表示泛型 传入一个类型 
setCounter(1000)
const [title, setTitle] = useState("abc") // 也可以不传入类型，让ts自己推断
```
## 3. 类型补充
### 3.1 函数的参数和返回值的类型
```ts
// 函数的参数和返回值的类型
// 如果函数没有返回值，那么就可以写成void类型
// 在开发中一般不会写返回值的类型，因为ts会自动推断出来
function add(a: number, b: number): number {
    return a + b;
}
// 通常定义一个函数时，都会给参数加上类型注解
// 但是如果是匿名函数，那么就不会给参数加上类型注解
const names = ['Eddie', '彭于晏', '胡歌'];
// item 是根据上下文推导出来的，这个时候可以不用加类型注解
names.forEach(function (item) {
    console.log(item);
})
```
### 3.2 对象类型的类型注解
```ts
function getPersonInfo(person: { name: string, age: number }) {
    console.log(person.name + '---' + person.age);
}
getPersonInfo({ name: 'Eddie', age: 18 });
```
### 3.3 可选类型
```ts
// 可选类型 ? 表示可选的
function getPersonInfo(person: { name: string, age?: number }) {
    console.log(person.name + '---' + person.age);
}
getPersonInfo({ name: 'Eddie' });
getPersonInfo({ name: 'Eddie', age: 18 }); // age是可选的，所以可以传入也可以不传入
```
### 3.4 联合类型
```ts
// 联合类型 number | string 表示number或者string类型
function getPersonInfo(age: number | string ) {
    // 使用联合类型需要特别注意的是，那么就不能直接使用age.length这样的属性或者方法，因为联合类型中的属性和方法是不一样的
    // 所以需要使用typeof判断类型 也就是类型缩小
    if (typeof age === 'string') {
        age.length
    } else {
        age.toFixed(2)
    }
    // 也可以使用类型断言 age as String  注意：这里的String是大写的
    const str = age as String;
    if (str.length) {
        console.log(str.toUpperCase());
    }
    getPersonInfo(18);
    getPersonInfo('28');
}
```
### 3.5 可选类型和联合类型的关系
```ts
// 一个参数是可选类型时就相当于是联合类型，类型 | undefined
function foo (a?: number) { // 相当于 a: number | undefined
    console.log(a);
}
```
### 3.6 类型别名
```ts
// type用于定义类型别名
type IDType = number | string;
type PersonType = { name: string, age: number };
function getPersonInfo(id: IDType, person: PersonType) {
    console.log(id + '---' + person.name + '---' + person.age);
}
getPersonInfo('彭于晏', { name: 'Eddie', age: 18 });
```
### 3.7 类型断言
```ts
// 类型断言
// 有时候需要将一个联合类型的变量指定为一个更加具体的类型
// 语法：将一个联合类型的变量，指定为一个类型断言
function getLength(input: string | number): number {
    // 类型断言的第一种写法
    const str = input as String; 
    if (str.length) {
        return str.length;
    } else {
        const number = input as Number;
        return number.toString().length;
    }
    // 类型断言的第二种写法
    if ((<string>input).length) {
        return (<string>input).length;
    } else {
        return input.toString().length;
    }
}
```
### 3.8 字面量类型
```ts
// "Hello World"也是可以作为类型的, 叫做字面量类型
const message: "Hello World" = "Hello World"

// 字面量类型的意义就是必须结合联合类型
type Alignment = 'top' | 'right' | 'bottom' | 'left';
let align: Alignment = 'top';
align = 'right';
align = 'bottom';
```
## 4 函数类型
### 4.1 函数类型的定义
```ts
// 函数类型的定义
// 1.函数声明
function add(a: number, b: number): number {
    return a + b;
}
// 2.函数表达式
const add2 = function (a: number, b: number): number {
    return a + b;
}
// 3.箭头函数
const add3 = (a: number, b: number): number => {
    return a + b;
}
// 案例 
function calc (n1:number, n2:number,fn:(a:number,b:number)=>number):number{
    return fn(n1,n2)
}
const result = calc(1,2,function (a,b){
    return a+b
})
```
### 4.2 函数类型的补充
```ts
// 1.函数的参数是可选的
// 可选类型必须放在必选类型的后面
function add(a: number, b?: number): number {
    return a + b;
}
// 2.函数的参数是默认值的
// 必传参数 - 有默认值的参数 - 可选参数  顺序不能变
function add(a: number, b: number = 10): number {
    return a + b;
}
// 3.函数的参数是剩余参数
// ...rest: number[]  rest是一个数组
function add(a: number, ...rest: number[]): number {
    return a + rest.reduce((prev, curr) => prev + curr);
}
add(1, 2, 3, 4, 5);
```
### 4.3 函数重载
```ts
// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载
function add(num1: number, num2: number): number; // 没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any { // 会根据参数自己去匹配重载
    return num1 + num2;
}
console.log(add(1, 2));
console.log(add('1', '2'));
console.log(add(true, false)); // 没有匹配到会报错
```
## 5 Ts中类的使用
### 5.1 类的定义
```ts
// 类的定义
class Person {
    // 属性
    name: string; // 在Ts中定义一个属性需要设置默认值或者在构造函数中初始化
    age: number;
    // 构造函数
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    // 方法
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    }
}

const person = new Person('Eddie', 18); // 实例化时会执行构造函数
console.log(person.name); // 调用对应的属性和方法
person.sayHello();
```
### 5.2 类的继承
```ts
// 类的继承
// 一些共有的属性和方法可以抽离出来，放到一个父类中，然后通过继承的方式实现
class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    }
}

class Student extends Person { // extends 关键字继承Person类
    school: string; 
    constructor(name: string, age: number, school: string) {
        super(name, age); // super 关键字调用父类的构造函数
        this.school = school;
    }
    study() {
        console.log('I am studying in ' + this.school);
    }
    sayHello() { // 子类也会继承父类的方法 如果不满意也可以重写 相当于替换了父类的方法
        // 当然也可以先调用父类的方法再调用子类的方法
        super.sayHello();
        console.log('Hello, my age is ' + this.age);
    }
}

const student = new Student('Eddie', 18, '清华大学');
console.log(student.name);
```
### 5.3 类的多态
```ts
// 多态是指父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现
class Animal {
    sayHello() {
        console.log('动物在叫');
    }
}

class Dog extends Animal {
    sayHello() {
        console.log('汪汪汪');
    }
}

class Cat extends Animal {
    sayHello() {
        console.log('喵喵喵');
    }
}

// 案例
function sayHello(animal: Animal[]) {
    animal.forEach(item => {
        item.sayHello();
    });
}
sayHello([new Dog(), new Cat()]);
```
### 5.4 类的修饰符
```ts
// public 公有的 在类的内部和外部都可以访问
// protected 保护类型 在类的内部和子类中可以访问
// private 私有的 在类的内部可以访问
// readonly 只读的 只能在声明的时候赋值 但是如果它是对象类型的话 可以修改对象的属性
class Person {
    public name: string; // 默认是public
    protected age: number;
    private height: number;
    readonly weight: number;
    
    constructor(name: string, age: number, height: number) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = 120;
    }
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    }
}

class Student extends Person {
    constructor(name: string, age: number, height: number) {
        super(name);
        super(age); // 保护类型只能在子类中访问
        super(height); // 私有类型只能在类的内部访问  所以会报错
    }
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    }
}

const person = new Person('Eddie', 18, 180);
console.log(person.age); // 保护类型只能在类的内部和子类中访问 所以会报错
console.log(person.height); // 私有类型只能在类的内部访问 所以会报错
person.weight = 130; // 只读属性只能在声明的时候赋值 所以会报错
```
### 5.5 访问器setter/getter
```ts
// 有时候需要对属性进行一些操作，比如对属性进行赋值的时候进行一些判断，或者对属性进行取值的时候进行一些操作
class Person {
    private _name: string; // 私有属性的规范是在属性名前面加上'_' 下划线
    constructor(name: string) {
        this._name = name;
    }
    // 访问器
    get name() {
        return this._name;
    }
    set name(name: string) {
        const realName = name.split(' ')[0];
        this._name = realName;
    }
    // 不建议写这种方式
    getName() {
        return this._name;
    }
}

const person = new Person('Eddie');
person.getName();
console.log(person.name); // 调用的方法是不同于函数的调用的
person.name = '彭于晏';
```
### 5.6 静态属性和静态方法
```ts
// 静态属性和静态方法是通过类来调用的，而不是通过实例来调用的
class Person {
    static age: number = 18;
    static sayHello() {
        console.log('Hello');
    }
}
console.log(Person.age); // 18
Person.sayHello(); // Hello
```
### 5.7 抽象类
```ts
// 抽象类是不允许被实例化的，只能被继承
// 抽象方法必须被子类实现，否则该类必须是抽象类
abstract class Animal {
    abstract sayHello(): void;
}

class Dog extends Animal {
    sayHello() {
        console.log('汪汪汪');
    }
}
```
### 5.8 类的类型
```ts
class Person {
    name: string = 'Eddie';
    age: number = 18;
}
const person = new Person();

const person1: Person = {
    name: '彭于晏',
    age: 18,
    height: 180 // 会报错
};

function sayHello(person: Person) {
    console.log('Hello, my name is ' + person.name);
}
sayHello({name: '彭于晏', age: 18});
```
## 6. Ts中接口的使用
### 6.1 接口的定义
```ts
// 接口是一种规范的定义，它定义了行为和动作的规范
// 接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要
interface Person { // 关键字interface 接口的命名规范是首字母大写
    name: string;
    age: number;
    sayHello(): void;
}
const person: Person = {
    name: 'Eddie',
    age: 18,
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    }
};
```
### 6.2 定义索引类型
```ts
// 索引类型是指通过索引值来访问对象的类型 如数组和对象
interface Person {
    [index: string]: number; // 索引类型的key是string类型，value是number类型
}
const person: Person = {
    name: 'Eddie', // 会报错
    age: 18,
    height: 180
};
```
### 6.3 函数类型
```ts
// 函数类型接口
interface CalcFn {
    (n1:number, n2:number ): number;
}

function calc(num1: number, num2: number, fn: CalcFn): number {
    return fn(num1, num2);
}

const add: CalcFn = (num1, num2) => {
    return num1 + num2;
};

calc(1, 2, add);
```
### 6.4 接口的继承
```ts
interface Grandfather {
    name: string;
    age: number;
}

interface Father {
    sayHello(): void;
}

interface Son extends Father, Grandfather { // 可以进行多个继承
    teach(): void;
}

const teacher: Son = { 
    name: 'Eddie',
    age: 18,
    sayHello() {
        console.log('Hello, my name is ' + this.name);
    },
    teach() {
        console.log('Hello, my name is ' + this.name);
    }
};
```
### 6.5 交叉类型
```ts
// 一种组合类型的方式：联合类型
type WhyType = string | number;
type Direction = 'left' | 'right' | 'center';

// 另外一种方式：交叉类型
type WType = string & number;

interface Person {
    name: string;
    age: number;
}

interface Teacher {
    teach(): void;
}

type  MyType = Person | Teacher; // 联合类型 代表或的意思
type  MyType1 = Person & Teacher; // 交叉类型 代表与的意思

const person: MyType = {
    name: 'Eddie',
    age: 18,
};

const person1: MyType1 = {
    name: 'Eddie',
    age: 18,
    teach() {
        console.log('Hello, my name is ' + this.name);
    }
};
```
### 6.6 接口的实现
```ts
interface Person {
    name: string;
    age: number;
}

interface Teacher {
    teach(): void;
}

// 类实现接口
class Animal {
}

// 继承：只能实现单继承
// 实现：可以实现多个接口 使用 implements 关键字
class Fish extends Animal implements Person, Teacher { 
    name: string = 'Eddie';
    age: number = 18;
    teach() {
        console.log('Hello, my name is ' + this.name);
    }
}


// 编写一些公共的API：面向接口编程
function sayHello(person: Person) {
    console.log('Hello, my name is ' + person.name);
}

// 所有实现了接口对应的类对应的对象都可以传入
sayHello(new Person());
sayHello(new Fish());
```
### 6.7 interface 和 type 的区别
```ts
// 1. interface 可以定义多个，type 只能定义一个
// 2. interface 可以继承，type 不能继承
// 3. interface 可以实现，type 不能实现
// 4. 如果是定义非对象类型，建议使用 type
interface Person {
    name: string;
}

interface Person { // 可以定义多个同名接口
    age: number;
}

const person: Person = { // 最终会合并这些属性
    name: 'Eddie',
    age: 18
};

type Person1 = {
    name: string;
};

type Person1 = { // 不能定义多个同名type 这样是会报错的
    age: number;
};
```
### 6.8 字面量赋值
```ts
interface Person {
    name: string;
    age: number;
}

const person = {
    name: 'Eddie',
    age: 18,
    height: 180
};

// freshness 擦除操作 会擦除多余的属性然后赋值给新的对象 但是如果少了属性就会报错
const person1: Person = person;  // 不会报错
console.log(person1); // {name: "Eddie", age: 18, height: 180}
```
### 6.9 枚举类型
```ts
// 枚举其实就是将一组可能出现的值，一个一个列举出来，定义在一个类型中，这个类型就是枚举类型
// 枚举允许开发者定义一组命名常量，这些常量的值可以是数字或字符串

enum Direction { // 枚举类型默认是有值的从0开始
    Up, // 0
    Down, // 1
    Left, // 2
    Right = 99 // 也可以自己指定值
}

function move(direction: Direction) {
    console.log(direction);
}

move(Direction.Up); // 0  
move(Direction.Right); // 99
```
## 7. Ts中泛型的使用
### 7.1 泛型的定义
```ts
// 泛型：在定义函数、接口或者类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
// 泛型的好处：可以支持不特定的数据类型，要求：传入的参数和返回的参数一致
function sum<Type>(num: Type): Type {
    return num
}

// 1.调用方式一: 明确的传入类型
sum<number>(20)
sum<{name: string}>({name: "Eddie"})
sum<any[]>(["abc"])

// 2.调用方式二: 利用类型推导
sum(50)
sum("abc")
```
### 7.2 泛型函数
```ts
function sum<T,E ,O>(num1: T,num2:E, num3?:O,...num4:T[]): Type {
    return (num1,num2,num3,num4)
}
console.log(sum<number,string, boolean>(18,'Eddie',true,1,2,3,4) ) // 18 Eddie true [1, 2, 3, 4]
```
### 7.3 泛型接口
```ts
interface ConfigFn <T1 = string, T2 = number>{
    name:T1
    age:T2
}

const person: ConfigFn = {
    name: 'Eddie',
    age: 18
}
```
### 7.4 泛型类
```ts
class Point<T,P> {
    x: T
    y: P
    z: T

    constructor(x: T, y: P, z: T) {
        this.x = x
        this.y = y
        this.z = z
    }
}

const p1 = new Point("1.33.2", "2.22.3", "4.22.1") // 会自动推导出类型
const p2 = new Point<string,number>("1.33.2",1, "4.22.1")
const p3: Point<string,string> = new Point("1.33.2", "2.22.3", "4.22.1") 

const names1: string[] = ["abc", "cba", "nba"]
const names2: Array<string> = ["abc", "cba", "nba"] // 不推荐(react jsx <>)
```
### 7.5 泛型约束
```ts
interface Length {
    length: number  // 有length属性的才可以
}

function sum<T extends Length>(num1: T, num2: T): number { // 继承Length接口 保证传入的参数有length属性且为number类型
    return num1.length + num2.length
}

sum([1, 2, 3], [4, 5, 6]) // 6
sum("abc", "cba") // 6
sum({length: 3}, {length: 4}) // 7
sum(1, 2) // 报错
```
## 8. Ts中其它内容的补充
* 在src同级目录中新建一个后缀为.d.ts的文件。这个文件就是声明文件，里面可以声明全局变量、函数、类、接口等等。
```ts
// 声明模块
declare module 'lodash' {
  export function join(arr: any[]): void
}

// 声明变量/函数/类
declare let name: string
declare let age: number
declare let height: number

declare function whyFoo(): void

declare class Person {
  name: string
  age: number
  constructor(name: string, age: number)
}

// 声明文件
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'

// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}
```
