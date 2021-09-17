import React, {useState, useEffect, useRef} from 'react';
import {adapterFun} from '../../tool';
import '../../global.css';
import { Link } from "react-router-dom";


const Home = () => {

  useEffect(() => {    
    adapterFun(375);
  },[]);



  return (
    <div>
      <p className="home-title">说明页面</p>
      {/* <p className="home-button" >前往 demo</p> */}
      <Link to="/menu" className="home-button">前往 demo</Link>
      {/* <a className="home-button" onClick = {e => goMenuBar(props)}>前往 demo</a> */}
      <div className="content">
        <p >1.首先需要对本需求至少提出5处以上疑问。</p>
        <p >2.在疑问解答后，使用XMind或其他工具，梳理需求逻辑和细节。</p>
        <p >3.梳理一份需要的接口清单，包含每个接口的接口名、req和res要点。</p>
        <p >4.根据之前所学，将原型实现。</p>
        <p className="details">   (1).样式不限制  ，整体美观大方，符合原型即可。</p>
        <p className="details">   (2).页面需要动态渲染，数据来源可以直接在代码中定时器获取假数据；如果时间充裕，可以自己搭建或请教其他同事，使用mock server 的形式。</p>
        <p className="details">   (3).可以参考过去的代码、文档，也可以让其他同事帮助指导。</p>
      </div>
    </div>
  )
}

export default Home;
