
# React demos

Based on
- React Starter Kit 15.3.1
- [React 入门实例教程 - ruanyifeng](http://www.ruanyifeng.com/blog/2015/03/react.html)

重敲所有代码，发现其中属于自己的遗留点。

## Demo01 JSX in HTML

```html
// React 核心库
<script src="../build/react.js"></script>
// React DOM 操作相关
<script src="../build/react-dom.js"></script>
// JSX to JavaScript
<script src="../build/browser.min.js"></script>
```

`ReactDOM.render()` html渲染


```html
// 标识为JSX语法
<script type="text/babel">
  ReactDOM.render(
     <h1>Hello, world!</h1>,
     document.getElementById('example')
  );
</script>
```

## Demo02 JSX

- 无需引号
- HTML和JS混合使用
- **以`<`开头会以HTML渲染**
- **以`{`开头会以JS渲染**  （记住有助于对其他语法的写法）

```js
var names = ['a', 'b', 'c'];
ReactDOM.render(
  <div>
  {
    names.map((name) => {
      return <div>the letter is {name}</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

```
Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using <div>. See https://fb.me/react-warning-keys for more information.  in div
```

## Demo03 JSX

- HTML和JS的任意组合
- 可以批量添加到模板中

```js
var divs = [
  <div>the letter is a</div>,
  <div>the letteris b</div>
];
ReactDOM.render(
  <div>
    {divs}
  </div>,
  document.getElementById('example')
);
```

## Demo04 组件

- `React.createClass()` 创建组件类
- 组件必须有`render`方法
- 组件render类只能有一个顶层标签
- 标签必须闭合 `/>`
  - `<HelloMessage/>`
  - `<HelloMessage></HelloMessage>`
- 标签必须跟定义的组件类匹配
- `this.props` 获取组件上的属性
- JS关键字
  - `class`需要写成`className`
  - `for`需要写成`htmlFor`

```js
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}!</h1>;
  }
});
ReactDOM.render(
  <HelloMessage name="World!!!" />,
  document.getElementById('example')
);
```

## Demo05 this.props.children

- 组件的子节点可以通过`this.props.children`取到
- this.props.children`在当子节点
  - 没有 - `undefined`
  - 一个 - `object`
  - 多个 - `array`
- `React.Children` 工具类专门遍历 `this.props.children`

```js
var NoteList = React.createClass({
  render: function() {
    return <ol>
    {
      React.Children.map(this.props.children, function(child) {
        return <div>
          {
            <li>{child}</li>
          }
        </div>
      })
    }
    </ol>
  }
});
ReactDOM.render(
  <NoteList>
    <span>hello</span>
    <span>world</span>
  </NoteList>,
  document.getElementById('example')
);
```

## Demo06 [PropTypes](https://facebook.github.io/react/docs/reusable-components.html)

- `propTypes` 类型校验集合
  - {属性：属性类型}
  - 注意此处小写
  - 同样可以作用于 `this.props.children`
- `React.PropTypes` 字面意思
  - `React.PropTypes.string.isRequired`
- getDefaultProps
  - 为属性设置初始值


```js
var HelloMessage = React.createClass({
  getDefaultProps : function () {
    return {
      name : 'Hello World'
    };
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },

  render: function() {
    // wrong!
    // return <h1>Hello {this.props.name}!</h1><p></p>;
    return <h1>Hello {this.props.name}!</h1>;
  }
});
ReactDOM.render(
  <HelloMessage name="World!!!" />,
  document.getElementById('example')
);
```

```
Warning: Failed prop type: Required prop `children` was not specified in `HelloMessage`.
    in HelloMessage
```

## Demo07 真实的DOM节点

- 基于virtual DOM，所有操作节点都不是在真实的DOM节点发生的
- change -> virtual Dom -> [DOM diff](http://calendar.perfplanet.com/2013/diff/) -> DOM
- `ref="myTextInput"` ref 定义节点
- `onClick={this.handleClick}` 注意事件绑定语法
- 根节点只能一个

```js
var HelloMessage = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return <div>
      <input type="text" ref="myTextInput"/>
      <input type="button" value="focus the text input" onClick={this.handleClick}/>
    </div>
  }
});
ReactDOM.render(
  <HelloMessage name="World!!!" />,
  document.getElementById('example')
);
```

## Demo07 this.state

- 组件状态通过`this.state`维护
- `getInitialState` 定义初始状态
- `this.setState`
  - 随着用户互动而产生变化的特性
  - 维护状态
  - 触发 this.render 重新渲染
- `this.props`
  - 一旦定义在组件内就不再改变的属性


```js
var Liked = React.createClass({
  getInitialState: function() {
    return {
      liked: false
    }
  },
  handleClick: function() {
    this.setState({
      liked: !this.state.liked
    })
  },
  render: function() {
    return <div>
      {this.state.liked ? "赞" : ''}
      <input type="button" onClick={this.handleClick} value="点赞"/>
    </div>
  }
});
ReactDOM.render(
  <Liked/>,
  document.getElementById('example')
);
```


## 延伸

1. babel / babel-cli

## 参考

[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html) - ruanyifeng
