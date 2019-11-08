import React from 'react';

 /**
  * le
  * 2019/11/6
  * 主组件List
  */
class List extends React.Component{
    constructor(props){
       super(props);
       this.state = {
        max:0,   //当前最大页
        allPage:0,   //总页数
        currentPage:0,  //当前页
        startTime: '', // 起始日期
        endTime: '',  // 结束日期
        strc: '',  //表格内容
       }
    }
    
    /**
     * le
     * 2019/11/6
     * 改变最大页
     */
    maxChange = (e) => {
        let maxNow = e.target.value;
        this.setState({
            max: maxNow
        })
    }

    /**
     * le
     * 2019/11/6
     * 修改起始和结束日期
     */
    onchanges = (e) => {
        let date = e.target.value;
        this.setState({
            startTime :  date
        })
    }
    onchangee = (e) => {
        let date = e.target.value;
        this.setState({
            endTime :  date
        })
    }

    /**
     * le
     * 2019/11/6
     * 分页数据请求
     */
    getRes(){
        let { strc,currentPage,max } = this.state;
        var that = this;
        fetch("http://127.0.0.1:5500/api.json").then(res=>res.json()).then(data=>{
            const dataArr = data.content;
            that.strc=`<tr style="background:#D3D3D3">
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
            this.allPage = Math.ceil(dataArr.length/max);
            //显示当前页和总页数
            that.refs.current.innerHTML=currentPage+1;
            that.refs.all.innerHTML=this.state.allPage;
            if(i>=currentPage*max && i<(currentPage+1)*max){
            that.strc+=`<tr style="border:1px solid grey">
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
            that.refs.show.innerHTML=that.strc  
        })
    }

    /**
      * le
      * 2019/11/6
      * 向后向前翻页
      */
    handleReturn = (e) => {
         if(this.state.currentPage>0){
             this.setState({
                currentPage : this.state.currentPage - 1
             }, () => {
                this.getRes();
             })
        }
    }
    
    handleForward = (e) => {
        if(this.state.currentPage<this.state.allPage-1){
            this.setState({
                currentPage : this.state.currentPage + 1
            },()=>{
                this.getRes();
            })
        }
    }
    
    /**
      * le
      * 2019/11/6
      * 封装时间
      */
    dataChange(e){
        return new Date(e).getTime()
    }  

    /**
      * le
      * 2019/11/6
      * 查询
      */
    handleFind = (e) => {
        let { strc,startTime,endTime,currentPage,max } = this.state;
        var that = this;
        if(startTime==""&&endTime==""){
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
                this.state.allPage = Math.ceil(dataArr.length/max);
                //显示当前页和总页数
                that.refs.current.innerHTML=currentPage+1;
                that.refs.all.innerHTML=this.state.allPage;
                that.strc=`<tr style="background:#D3D3D3">
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
                if(this.dataChange(item.day)<=this.dataChange(endTime)&&this.dataChange(item.day)>=this.dataChange(startTime)&&
                i>=currentPage*max && i<(currentPage+1)*max){
                that.strc+=`<tr style="border:1px solid grey">
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
                that.refs.show.innerHTML=that.strc  
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
             <select className="form-control" onChange = { this.maxChange }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option defaultValue="3" value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>  
             </select>
             日期选择:
             <input onChange={ this.onchanges } type="date"/>-<input onChange={this.onchangee} type="date"/>
             <input type="button" value="查询" className="button" onClick={this.handleFind}/>
             <input type="button" value="同步" className="button"/>
             <span className="lasttime">交易上次手动时间:2019-09-27 10:09:23</span>
             </div>
             <table ref='show'>
             </table>
             <div className="page">
                <span className="lastpage" onClick={this.handleReturn}><a>上一页</a></span>
                <span ref='current'></span>/
                <span ref='all'></span>
                <span className="nextpage" onClick={this.handleForward}><a>下一页</a></span>
             </div>
        </div>
        )
    }
}

export default List;