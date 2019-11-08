import React from 'react';

 /**
  * le
  * 2019/11/6
  * 主组件Number
  */
class Number extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            res:[],
            txt:''
        }
    }

    /**
     * le
     * 2019/11/6
     * 按钮点击事件
     */
    handleClick = (e) => {
        let {res} = this.state;
        var clickValue = e.target.value;
        let txt = this.refs.txt;
        var isLoading = this.refs.loading;

        if(clickValue=="+/-"&&txt.value!=""){
            if(txt.value>0){
                txt.value = "-"+txt.value;
            }else{
                txt.value = Math.abs(txt.value);
            }
            return; 
         } 
         //取百分位
         if(clickValue=="%"){
             txt.value = txt.value / 100;
             return;
         }
         if(clickValue=="C"){
             txt.value = "";
             this.state.res = [];
         }else{
         //判断输入的数字或小数点情况
         if(!isNaN(clickValue) || clickValue=="."){
             if(txt.value.indexOf(".")!=-1){
                 //判断存在小数点的情况存在
                 if(clickValue!="."){
                     //若再次输入为非小数点则允许拼接
                     txt.value+=clickValue;
                 }
             }else{
                 //没有点存在直接拼接
                 txt.value+=clickValue;
             }
         }else{
         if(clickValue!="="){
             res[res.length] = txt.value;
             //存符号
             res[res.length] = clickValue;
             //清屏
             txt.value="";
         }else{
             isLoading.style.display="block";
             setTimeout(()=>{
             isLoading.style.display='none';
         },1500);
             setTimeout(()=>{
             //loading结束后同时显示结果
             Math.formatFloat = function(f,digit) { 
             var m = Math.pow(10,digit); 
             return parseInt(f*m)/m;
         }
             res[res.length] = txt.value;
             //eval计算表达式的值;
             txt.value = Math.formatFloat(eval(res.join("")),9);
             res=[];
         },1500)
       } 
      }
     }
    }

    render(){
        return(
        <div>
            <div className="show">
                <div className="show-left">
                 <div></div>
                 <div></div>
                 <div></div>
                </div>
                <div className="show-right">
                 <input type="text" className="txt" ref="txt" readOnly={true}/>
                </div>
            </div>
            <div className="tab">
               <input type="button" value="C" className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="+/-" className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="%"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="/"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="7"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="8"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="9"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="*"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="4"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="5"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="6"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="-"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="1"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="2"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="3"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="+"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="0"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="."  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="="  className="btn" onClick={(e)=>this.handleClick(e)}/>
            </div>
            <div className="loading" ref="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
          </div>
        </div>
    )}
}

export default Number;
