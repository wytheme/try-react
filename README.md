
# React demos

Based on
- [React](https://github.com/facebook/react/tree/master/docs/docs)
- [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html) by ruanyifeng

## 框架关注点

- 基本语法
- 数据源
- 校验
- 生命周期
- 组件化
- 异步

## Index

1. [Demo01 JSX in HTML](#demo01-jsx-in-html)
1. [Demo02 JSX](#demo02-jsx)
1. [Demo03 JSX](#demo03-jsx)
1. [Demo04 组件](#demo04-组件)
1. [Demo05 this.props.children](#demo05-thispropschildren)
1. [Demo06 PropTypes](#demo06-proptypes)
1. [Demo07 真实的DOM节点](#demo07-真实的dom节点)
1. [Demo08 this.state](#demo08-thisstate)
1. [Demo09 表单](#demo09-表单)
1. [Demo10 组件的生命周期](#demo10-组件的生命周期)
1. [Demo11 componentWillReceiveProps的陷阱](#demo11-componentwillreceiveprops的陷阱)
1. [Demo12 AJAX](#demo12-ajax)
1. [Demo13 教程](#demo13-教程)
1. [Demo14 命名组件](#demo14-命名组件)
1. [Demo15 展开属性](#demo15-展开属性)

## Demo01 JSX in HTML

- `ReactDOM.render()` html渲染
- `React.createFactory` 工厂类
- `React.DOM.ul` HTML标签的内置工程方法

```html
// React 核心库
<script src="../build/react.js"></script>
// React DOM 操作相关
<script src="../build/react-dom.js"></script>
// JSX to JavaScript
<script src="../build/browser.min.js"></script>
// 标识为JSX语法 text/bael
<script type="text/babel">
  ReactDOM.render(
     <h1>Hello, world!</h1>,
     document.getElementById('example')
  );
  //var Factory = React.createFactory(ComponentClass);
  //var root = Factory({ custom: 'prop' });
  //ReactDOM.render(root, document.getElementById('example'));
  //React.DOM.ul({ className: 'my-list' },
  //  React.DOM.li(null, 'Text Content')
  //);
</script>
```

## Demo02 JSX

- 无需引号
- HTML和JS混合使用
- **以`<`开头会以HTML渲染**
- **以`{`开头会以JS渲染**
    - `style={{opacity: this.state.opacity}}` 第一层大括号代表的仅仅是以JS解析

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
  - 不应该作为state
    - 计算所得属性 直接在 `render()` 里使用 `this.state.listItems.length + ' list items'` 比把它放到 state 里好的多。
    - React组件
    - 基于props的重复数据
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

## Demo12 AJAX

[官方文档](http://reactjs.cn/react/tips/initial-ajax.html)

- `componentDidMount`

```js
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username} s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
  });

  ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('example')
  );
```

## Demo13 教程

[官方文档](https://facebook.github.io/react/docs/tutorial-zh-CN.html)

```
<span dangerouslySetInnerHTML={{ __html: rawMarkup }} />
```
  - [XSS](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)攻击风险，请谨慎

```js
handleAuthorChange: function(e) {
  this.setState({author: e.target.value});
},
handleTextChange: function(e) {
  this.setState({text: e.target.value});
},
```
  - setState 是extend的语法而不是reset

```js
<Comment author={comment.author} key={comment.id}>
```
  - [key](https://facebook.github.io/react/docs/multiple-components.html)
  - key 作用于组件的重复利用
  - 注意：key必须定义在组件props上，而不是组件内部的HTML上面

## Demo14 命名组件

- "子组件"可以创建为主组件的属性。
- 注意3种注释的方式

```js
var Form = React.createClass({
    render: function() {
      return (<form>表单：{this.props.children}</form>);
    }
  });
Form.P = React.createClass({
  render: function() {
    return <p>123</p>;
  }
});
Form.Input = React.createClass({
  render: function() {
    return <input type="text"/>
  }
});
ReactDOM.render(
  <Form name="f">
    {/* child comment, put {} around */}
    <Form.P
    /* 123 */
    />
    <Form.Input // end of line comment
    />
  </Form>,
  document.getElementById('example')
);
```

## Demo15 展开属性

- `props` 是不可变
- 批量定义`props`可以借用`Spread Attributes ...` 具体见ES6
- 同属性多次定义，后面的会覆盖前面的

```js
var Component = React.createClass({
  render: function() {
    console.log(this.props)
    return <p></p>;
  }
})
// wrong!
// var component = <Component />;
// component.props.foo = 1;
// component.props.bar = 2;
// embedded:11 Uncaught TypeError: Can't add property foo, object is not extensible
// console.log(component.props);

var props = {};
props.foo = 1;
props.bar = 2;
var component = <Component {...props} bar={3}/>;
ReactDOM.render(
  component,
  document.getElementById('example')
)
// {foo: 1, bar: 3}
console.log(component.props);
```

## Demo16 Mixins

- mixin的方法可以直接调用
- 重复mixin会依次执行，最后执行组建内定义的方法
- 构建的自己的mixins
- ES6不支持mixins

```js
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // 引用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

## todo

ReactFragment - https://facebook.github.io/react/docs/create-fragment.html

## 延伸

1. babel / babel-cli

## 参考

[awesome-react](https://github.com/enaqx/awesome-react)


[lifecycle]: ./images/3-3-component-lifecycle.jpg
[componentWillReceiveProps]: ./images/componentWillReceiveProps.png
