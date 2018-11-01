import React from 'react';
import styled from 'styled-components';

const Root=styled.div`
   position:fixed;
   width:100%;
   height:100%;
   box-sizing:border-box;
`
class CanvasB extends React.Component {
    componentDidMount(){
      let canvasB=document.querySelector('#canvasB');
      let rootDom=document.querySelector('#xx');
      let width=rootDom.offsetWidth,height=rootDom.offsetHeight;
      canvasB.width=width;
      canvasB.height=height;
      let contextB=canvasB.getContext('2d');
      let numbers=100;
      let balls=[];
      let node={};//鼠标的坐标
      for(let i=1;i<=numbers;i++){
           let x=Math.ceil(width*Math.random());
           let y=Math.ceil(height*Math.random());
           let r=Math.ceil(4*Math.random());
           let sX=1.5+Math.random()*(-3);
           let sY=1.5+Math.random()*(-3);
           balls.push({x,y,r,sX,sY})
      }
      setInterval(()=>{ 
          contextB.clearRect(0,0,width,height)
          for(let j=0;j<balls.length;j++){
              if(balls[j].y+balls[j].r>height || balls[j].y-balls[j].r<0){
                  balls[j].sX*=(-1);
                  balls[j].sY*=(-1);
              }
              if(balls[j].x+balls[j].r>width || balls[j].x-balls[j].r<0){
                balls[j].sX*=(-1);
                balls[j].sY*=(-1);
              }
         
              balls[j].x+=balls[j].sX;
              balls[j].y+=balls[j].sY;
              contextB.beginPath();
              contextB.shadowBlur=12;
              contextB.shadowColor="#FFFF33";
              contextB.fillStyle='#fff';
              contextB.arc(balls[j].x,balls[j].y,balls[j].r,0,2*Math.PI);
              contextB.fill();
          } 

      },100)
      document.body.onmousemove=function(e){
          node.x=e.clientX;
          node.y=e.clientY;
          node.r=200;
          balls.forEach(item=>{
            let R=Math.sqrt(Math.pow((item.x-node.x),2)+Math.pow((item.y-node.y),2));
            if(R<10){
              (item.x>node.x)?(item.sX=(-1)*Math.abs(item.sX)):(item.sX=Math.abs(item.sX));
              (item.y>node.y)?(item.sY=(-1)*Math.abs(item.sY)):(item.sY=Math.abs(item.sY));
            }
          })
      }
      document.body.onmouseout=function(e){
        node.x=0;
        node.y=0;
        node.r=0;
      }
    }
    render() {
      return (
        <Root id='xx'>
            <canvas id='canvasB'><p>该浏览器不支持画布，请换一个浏览器！</p></canvas>
        </Root>
      );
    }
  } 
  
  export default CanvasB;