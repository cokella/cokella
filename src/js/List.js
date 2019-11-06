import React from 'react';

function Maxshow(){
    return(
    <select className="form-control" id="max">
        <option value="1">1</option>
        <option value="2">2</option>
        <option defaultValue="3" value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>  
    </select>
    )
}

class List extends React.Component{
    constructor(props){
       super(props);
       this.handleFind = this.handleFind.bind(this);
       this.handleReturn = this.handleReturn.bind(this);
       this.handleForward = this.handleForward.bind(this);
       this.state = {
        max:0,
        allPage:0,
        currentPage:0,
        strc: ""
       }
    }
    
    //改变当前最大页
    maxChange(){
        this.setState({
            max: document.getElementById("max").value
        })
    }

    getRes(){
        const allPage = this.state.allPage;
        const currentPage = this.state.currentPage;
        fetch("http://127.0.0.1:5500/api.json").then(res=>res.json()).then(data=>{
            const dataArr = data.content;
            this.state.strc=`<tr style="background:#D3D3D3">
                     <td style="width:190px;">日期</td>
                     <td style="width:150px;">付费人数</td>
                     <td style="width:100px;">免费人数</td>
                     <td style="width:100px;">客单价</td>
                     <td style="width:100px;">总收入</td>
                     <td style="width:100px;">到期(人)</td>
                     <td style="width:150px;">新订(单)</td>
                     <td style="width:150px;">续订(单)</td>
                     <td style="width:150px;">升级(单)</td>
                     <td style="width:150px;">后台(单)</td>
                     <td style="width:100px;">续订率</td>
                     <td style="width:150px;">一个月(单)</td>
                     <td style="width:150px;">一季度(单)</td>
                     <td style="width:180px;">半年(单)</td>
                     <td style="width:160px;">一年(单)</td>
                     <td style="width:100px;">来源</td>
                  </tr>`;
            dataArr.forEach((item,i)=>{
            //用时间戳返回毫秒数判断
            const dataArr = data.content;
            //判断总页数
            this.allPage = Math.ceil(dataArr.length/this.state.max);
            //显示当前页和总页数
            document.getElementById("currentPage").innerHTML=currentPage+1;
            document.getElementById("allPage").innerHTML=allPage;
            if(i>=currentPage*this.state.max && i<(currentPage+1)*this.state.max){
            this.state.strc+=`<tr style="border:1px solid grey">
                     <td style="color:#2399ed">${item.day}</td>
                     <td>${item.payorder}</td>
                     <td>${item.freeorder}</td>
                     <td>${item.singleprice}</td>
                     <td>${item.totalprice}</td>
                     <td>${item.vipafterdatenum}</td>
                     <td>${item.neworder}(${item.neworderpay}元)</td>
                     <td>${item.againorder}(${item.againorderpay}元)</td>
                     <td>${item.updateorder}(${item.updateorderpay}元)</td>
                     <td>${item.autoagainorder}</td>
                     <td>${item.vipagainpaynum}%</td>
                     <td>${item.monthcycle}(${item.monthcyclepay}元)</td>
                     <td>${item.aquartercycle}(${item.aquartercyclepay}元)</td>
                     <td>${item.sixmonthscycle}(${item.sixmonthscyclepay}元)</td>
                     <td>${item.ayearcycle}(${item.ayearcyclepay}元)</td>
                     <td style="color:#2399ed">分析</td>
                   </tr>`;
            }
         }) 
            document.getElementById('show').innerHTML=this.state.strc  
        })
    }

    //向前翻页事件
    handleReturn(){
         if(this.state.currentPage>0){
             this.state.currentPage-=1;
            this.getRes();
        }
    }
    
    //向后翻页事件
    handleForward(){
        if(this.state.currentPage<this.state.allPage-1){
            this.state.currentPage=this.state.currentPage+1;
            this.getRes();
        }
    }
    
    handleFind(){

        const currentPage = this.state.currentPage;
        //监听最大页的改变
        document.getElementById("max").onchange = this.maxChange();
        function dataChange(e){
            return new Date(e).getTime()
        }
        var startDate = document.getElementById("start").value;
        var endDate = document.getElementById("end").value;
        if(startDate==""&&endDate==""){
            alert("请输入日期！")
        }else{
            //此处改为5500端口 默认3000端口访问不到
            fetch("http://127.0.0.1:5500/api.json",{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
              }).then(res=>res.json()).then(data=>{
                //存放数据内容
                const dataArr = data.content;
                //判断总页数
                this.state.allPage = Math.ceil(dataArr.length/this.state.max);
                //显示当前页和总页数
                document.getElementById("currentPage").innerHTML=currentPage+1;
                document.getElementById("allPage").innerHTML=this.state.allPage;
                this.state.strc=`<tr style="background:#D3D3D3">
                         <td style="width:190px;">日期</td>
                         <td style="width:150px;">付费人数</td>
                         <td style="width:100px;">免费人数</td>
                         <td style="width:100px;">客单价</td>
                         <td style="width:100px;">总收入</td>
                         <td style="width:100px;">到期(人)</td>
                         <td style="width:150px;">新订(单)</td>
                         <td style="width:150px;">续订(单)</td>
                         <td style="width:150px;">升级(单)</td>
                         <td style="width:150px;">后台(单)</td>
                         <td style="width:100px;">续订率</td>
                         <td style="width:150px;">一个月(单)</td>
                         <td style="width:150px;">一季度(单)</td>
                         <td style="width:180px;">半年(单)</td>
                         <td style="width:160px;">一年(单)</td>
                         <td style="width:100px;">来源</td>
                       </tr>`;
                dataArr.forEach((item,i)=>{
                //用时间戳返回毫秒数判断
                if(dataChange(item.day)<=dataChange(endDate)&&dataChange(item.day)>=dataChange(startDate)&&
                i>=currentPage*this.state.max && i<(currentPage+1)*this.state.max){
                this.state.strc+=`<tr style="border:1px solid grey">
                          <td style="color:#2399ed">${item.day}</td>
                          <td>${item.payorder}</td>
                          <td>${item.freeorder}</td>
                          <td>${item.singleprice}</td>
                          <td>${item.totalprice}</td>
                          <td>${item.vipafterdatenum}</td>
                          <td>${item.neworder}(${item.neworderpay}元)</td>
                          <td>${item.againorder}(${item.againorderpay}元)</td>
                          <td>${item.updateorder}(${item.updateorderpay}元)</td>
                          <td>${item.autoagainorder}</td>
                          <td>${item.vipagainpaynum}%</td>
                          <td>${item.monthcycle}(${item.monthcyclepay}元)</td>
                          <td>${item.aquartercycle}(${item.aquartercyclepay}元)</td>
                          <td>${item.sixmonthscycle}(${item.sixmonthscyclepay}元)</td>
                          <td>${item.ayearcycle}(${item.ayearcyclepay}元)</td>
                          <td style="color:#2399ed">分析</td>
                       </tr>`; }
                })
                document.getElementById('show').innerHTML=this.state.strc  
            })
        }       
    }

    render(){
        return(
        <div>
             <div className="list" >
             <select className="form-control">
                <option>交易</option>
             </select>
             <Maxshow/>
             日期选择:
             <input type="date" id="start"/>-<input type="date" id="end"/>
             <input type="button" value="查询" className="button" onClick={this.handleFind}/>
             <input type="button" value="同步" className="button"/>
             <span className="lasttime">交易上次手动时间:2019-09-27 10:09:23</span>
             </div>
             <table id="show">
             </table>
             <div className="page">
                <span><a  className="lastpage" onClick={this.handleReturn}>上一页</a></span>
                <span id="currentPage"></span>/
                <span id="allPage"></span>
                <span><a  className="nextpage" onClick={this.handleForward}>下一页</a></span>
             </div>
        </div>
        )
    }
}

export default List;