### Cross-site scripting（XSS）（跨站脚本攻击）
跨站脚本攻击Cross-site scripting (XSS)是一种安全漏洞，攻击者可以利用这种漏洞在网站上注入恶意的客户端代码。当被攻击者登陆网站时就会自动运行这些恶意代码，从而，攻击者可以突破网站的访问权限，冒充受害者。这些脚本可以任意读取cookie，session tokens，或者其它敏感的网站信息，或者让恶意脚本重写html内容。
***
#### XSS攻击可以分为3类:
>>>> * 存储型（持久型）:存储在目标服务器上
>>>> * 反射型（非持久型）:将XSS代码放在URL中，将参数提交到服务器。
>>>> * 基于DOM:会修改页面脚本结构。

#### 解决方法：
>>>> * 对cookie的保护:重要的cookie设置httpOnly
>>>> * 对用户输入数据的处理

XSS代码的预防主要通过对数据解码，再过滤掉危险标签、属性和事件等。

***

React中JSX可以防止注入攻击，在被渲染之前，所有的数据都被转义成为了字符串处理。 以避免 XSS(跨站脚本) 攻击。 
     