import React from 'react';

class Header extends React.Component{
render(){
    return(
        <div>
            <header>
            <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
            <span>每天进步一点点,离目标更近一点点！</span>
            <span className="name">段惠乾</span>
            <span className="exit"><a>退出</a></span>
            </header>

            <ul className="nav nav-tabs">
            <li><a href="#home" aria-controls="home" data-toggle="tab">首页</a></li>
            <li><a href="#profile" aria-controls="profile" data-toggle="tab">收入分析</a></li>
            <li><a href="#transfrom" aria-controls="transfrom" data-toggle="tab">营销转化分析</a></li>
            <li><a href="#advertising" aria-controls="advertising" data-toggle="tab">广告管理</a></li>
            <li><a href="#statistical" aria-controls="statistical" data-toggle="tab">统计分析</a></li>
            <li><a href="#admin" aria-controls="admin" data-toggle="tab">用户管理</a></li>
            <li><a href="#convenient" aria-controls="convenient" data-toggle="tab">便捷工具</a></li>
            </ul>
        </div>
        )
    }
}

export default Header;
