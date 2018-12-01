#### 使用dangerouslySetInnerHTML属性:
##### 例子: 

 `<div dangerouslySetInnerHTML={{__html:"<p>12345</p>"}} />`

 react的做法是不直接读取你的html代码，以此来避免cross-site scripting (XSS)攻击，让你的代码更加安全！！！
{__html:...} 背后的目的是表明它会被当成 "type/taint" 类型处理，这种包裹对象，可以通过方法调用返回净化后的数据。