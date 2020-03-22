## JS对象基本用法

### 声明对象的两种语法

* ` var obj = new Object({name: 'Junyu', gender: 'male'})`

* ` var obj2 = {name: 'Junyu', gender: 'male'}`

  > Note:
  > 1. 键名 key 是字符串
  > 2. 引号若省略，则后只能写标识符
  > 3. 就算引号省略了，键名也还是字符串
  > 4. 变量做属性名，要加 [] 
  > 
  > eg: ` let p1 = 'name'`
  >
  > ` let obj = {[p1]: 'Junyu'}    //属性名为'name'` 
  
  ### 删除对象的属性
  ```javaScript
    let obj = {name: 'frank', age: 19}
    
    obj.name = undefined    //删除了属性的值
    //{name: undefined, age: 18}
    
    /*记住属性名和属性值区别*/
    
    delete obj.name         //删除了属性名
    //{age: 18}
  ```
  
  #### 判断 key 是否存在于 obj 中
  ` 'gender' in obj`
  
  每个 key 都是对象的属性名，每个 value 都是对象的属性值
  
  > Note：
  >
  > 使 ` obj.name = undefined`并不能删除属性，也不能以此为依据判断 key 是否在 obj 中
  
  ### 查看对象的属性
  
  ` obj['key']`
  
  ` obj.key`
  
  ` obj[key]   //这里的 key 是变量`
  
  ` obj['na'+'me'] = 'Junyu' //会先运算 [] 里变量`
  
  #### 查看自身的所有的 key
  ` Object.keys(obj)`
  
    ` // ["name", "gender"]` 
    
#### 查看自身所有属性

` console.dir(obj)`

#### 判断属性是自身的还是共有的
```javaScript
    obj.hasOwnProperty('name')
    // 是，返回 true
    obj.hasOwnProperty('toString')
    // 否，返回 false
```

#### 批量赋值

```javaScript
    Object.assign(obj, {age: '18', height: '180', hobby: 'reading'})
    // {name: "Junyu", gender: 'male', height: '180', age: '18', hobby: 'reading'}
```

### 修改原型共有属性
1. 无法直接修改共有属性
```javaScript
    obj.toString = 'hello'
    // 这将只能修改自身的 toString 属性
```

2. 通过原型修改
```javaSript
    obj.__proto__.toString = 'hello'  //不推荐
    obj.prototype.toString = 'hello'  //推荐
```
一般来说工作中不要修改原型，会出 BUG ，自己练手即可

### ‘name’ in obj 和 obj.hasOwnProperty(‘name’) 的区别

'name' in obj 无论 name 是自身属性还是原型中的属性都会检测，如果任何地方有都会显示 true。

obj.hasOwnProperty('name') 只检查自身有没有 name 属性，如果没有则为 false，不管原型上是否有该属性。