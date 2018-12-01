

有别于GitHub官方给提供的API（有访问频率限制），使用了一个npm 模块。这个模块可以非常方便的将Markdown语法的字符串直接转化为HTML 代码字符串。然后让某个div元素的innerHTML属性为这个字符串即可显示.
***

#### 使用说明

   1. 安装

   > **npm install showdown**
   2. 引用

   > **import showdown from 'showdown'**
   3. 显示

   > **let converter=new showdown.Converter();**

   //初始化装换器

   > **let html=converter.makeHtml(text);**

   //text是markdown语法的字符串

   > **document.getElementById('id').innerHTML=html;**
#####[git链接在此](https://github.com/showdownjs/showdown)
