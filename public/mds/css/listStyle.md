###list-style属性（简写属性）
由于它应用到所有 display 为 list-item 的元素，所以在普通的 HTML 和 XHTML 中只能用于 li 元素，不过实际上它可以应用到任何元素，并由 list-item 元素继承。
***
####设置顺序：
> list-style-type  list-style-position  list-style-image
 未设置则会使用默认值!
 ***
 > * **list-style-type**设置列表项标记的类型.

 >>值：none | disc（默认，实心圆） |  circle空心圆| square实心方块| decimal数字|decimal-leading-zero 0开头的数字。。。。

 > * **list-style-position**设置在何处放置列表项标记，相对于对象的内容绘制列表项标记。

 >>值：outside（默认，文本以外）| inside 文本以内 | inherit

 > * **list-style-image**使用图像来替换列表项的标记。

 >>值：url（…） | none（默认）
         
***注意** : 请始终规定一个 "list-style-type" 属性以防图像不可用。*
