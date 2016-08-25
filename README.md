
# React demos

Based on
- React Starter Kit 15.3.1
- [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html) by ruanyifeng

## Index

1. [Demo01 JSX in HTML](#demo01-jsx-in-html)
1. [Demo02 JSX](#demo02-jsx)
1. [Demo03 JSX](#demo03-jsx)
1. [Demo04 组件](#demo04-组件)
1. [Demo05 this.props.children](#demo05-thispropschildren)
1. [Demo06 PropTypes](#demo06-proptypes)
1. [Demo07 真实的DOM节点](#demo07-真实的DOM节点)
1. [Demo08 this.state](#demo08-thisstate)
1. [Demo09 表单](#demo09-表单)
1. [Demo10 组件的生命周期](#demo10-组件的生命周期)
1. [Demo11 componentWillReceiveProps的陷阱](#demo11-componentWillReceiveProps的陷阱)

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

## Demo06 PropTypes

[官方文档](https://facebook.github.io/react/docs/reusable-components.html)

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

## Demo08 this.state

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
      <input type="button" onClick={this.handleClick}/>
    </div>
  }
});
ReactDOM.render(
  <Liked/>,
  document.getElementById('example')
);
```

## Demo09 表单

- 交互用`onChange`(如radio、checkbox、select等)
- 取值通过 `e.target.value`
- 别忘记给自身赋值


```js
var Input = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  handelChange: function(e) {
    this.setState({
      text: e.target.value
    })
  },
  render: function() {
    var value = this.state.value;
    return <div>
      <p>{this.state.text}</p>
      <input type="text" onChange={this.handelChange} value={value}/>
    </div>
  }
});
ReactDOM.render(
  <Input/>,
  document.getElementById('example')
);
```

## Demo10 组件的生命周期

[官方文档](http://reactjs.cn/react/docs/component-specs.html)

- Mounting
  - componentWillMount  组件将要装载
    - rendering之前调用
    - 即使调用`setState`, render只会触发一次
  - componentDidMount 组件已装载
    - 渲染后立即执行
    - 仅客户端有效
    - 此时`refs`可用
    - 先子组件后父组件，冒泡传递
    - 此时加载其他框架、`setTimeout`、`setInterval`、`AJAX`
- Updating
  - componentWillReceiveProps(object nextProps)
    - 初始化render不会调用此函数
    - new props时触发
    - 可以比对 `this.props` 和 `nextProps` 然后调用 `this.setState`
  - shouldComponentUpdate(object nextProps, object nextState)
    - 如果定义forceUpdate，此方法不会触发
    - 如果return false，`render()`不会触发
    - 此方法可以在做性能优化时使用，当组件特地多的时候
  - componentWillUpdate(object nextProps, object nextState)
    - new props or state 时触发
    - DOM更新前触发
    - 初始化不触发
    - 不能使用 `this.setState`
  - componentDidUpdate(object prevProps, object prevState)
    - DOM更新后触发
    - 初始化不触发
- Unmounting
  - componentWillUnmount
    - 从DOM卸载后触发
    - 可以清理timers、其他DOM元素

借用图片清晰明了
![][lifecycle]


```js
var Input = React.createClass({
  componentWillMount: function() {
    this.setState({
      text: '123'
    })
    console.log('componentWillMount');
  },
  componentDidMount: function() {
    console.log('componentDidMount');
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps', nextProps, this.props);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  },
  getInitialState: function() {
    return {
      text: ''
    }
  },
  handelChange: function(e) {
    this.setState({
      text: e.target.value
    })
  },
  render: function() {
    console.log('render');

    var value = this.state.value;
    return <div>
      <p>{this.state.text}</p>
      <input type="text" onChange={this.handelChange} value={value}/>
    </div>
  }
});
var data = {text: 1};
var container = document.getElementById('example');
ReactDOM.render( <Input text={data}/>,container );
```

## Demo11 componentWillReceiveProps的陷阱

[官方文档](http://reactjs.cn/react/blog/2016/01/08/A-implies-B-does-not-imply-B-implies-A.html)

- `componentWillReceiveProps` will be invoked when the props change as the result of a rerender
- rerender 重新渲染即会触发，即使props的值并未变化，见下图
- 由于没法跟踪原始数据状态，所以提供`componentWillReceiveProps`方法，用户自己判定是否需要修改state，注意`componentWillReceiveProps`默认不会触发`setState`的操作
- 此方法有点偏向于异步流程，所以data.text的赋值最后一次才生效

```js
var Input = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps', nextProps, this.props);
  },
  getInitialState: function() {
    return { text: ''}
  },
  handelChange: function(e) {
    this.setState({
      text: e.target.value
    })
  },
  render: function() {
    console.log('render', this.state.text);

    var value = this.state.text;
    return <div>
      <p>{this.state.text}</p>
      <input type="text" onChange={this.handelChange} value={value}/>
    </div>
  }
});
var data = {text: 1};
var container = document.getElementById('example');
ReactDOM.render( <Input text={data}/>,container );
data.text = 2;
ReactDOM.render( <Input text={data}/>,container );
data.text = 3;
ReactDOM.render( <Input text={data}/>,container );
```

![][componentWillReceiveProps]


## 延伸

1. babel / babel-cli

## 参考

[lifecycle]: ./images/3-3-component-lifecycle.jpg
[componentWillReceiveProps]: ./images/componentWillReceiveProps.png
