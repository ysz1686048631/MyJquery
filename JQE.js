

!function(){
       var jQuery = function(selector,context){
                  this.prevObject = context ? context:[document];
                  this.init(selector)   
       }      
       jQuery.prototype = {
            constructor:jQuery,
            /**
             * 
             * @param {string || function || object} selector 初始选中元素
             */
            init:function(selector){
                
                if(typeof selector==='string'){
                     [...document.querySelectorAll(selector)].forEach((item,index)=>{
                            this[index]=item;
                     }); 
                     
                }else if(typeof selector==='function'){
                     document.addEventListener('DOMContentLoaded',selector);     
                }else if(selector.length>1){
                    selector.forEach((item,index)=>{  
                           this[index]=item;
                    })
                     
                }else{
                    this[0] = selector.length==1?selector[0]:selector;
                }  
              
             },
             /**
              * 
              * @param {number} index 元素索引 
              */
             eq:function(index){
                  index = index?index:0;
                  return new jQuery(this[index],this);
             },
             /**
              * 获取第一个元素
              */
             first:function(){
                  return this.eq(0);
             },
             /**
              * 将匹配的元素列表变为前一次的状态
              */
             end:function(){
                  return this.prevObject;
             },
             /**
              * 
              * @param {string} eleName 选取类型 
              */
             siblings:function(eleName){
                eleName = eleName||''; 
                let _this = [];
                // 说名没有指定对象
                /**
                 * 查询自己的兄弟元素分三种情况
                 * 1. 未指定元素，使用原this查询的，直接返回原this
                 * 2. 指定元素是否指定类名
                 *    2-1 指定类名
                 *    2-2 未指定类名
                 */
                if(this.prevObject[0]==document){
                //1未指定元素    
                        return this;  
                }else{
                //2指定了元素 className tagName 
                let eles = this[0].parentNode.children;   
                    if(!eleName){
                      
                        for(var n = 0,i = 0,pl= eles.length;i<pl;i++) {
                           if(eles[i] !== this[0]){
                               _this.push(eles[i]);
                               n++;
                           }
                        }   
                    }else{
                          let type = eleName[0]=='#'&&(eleName[0]=='#' || eleName[0]=='.')?'id':'class';
                              eleName = eleName[0]=='#' || eleName[0]=='.'?eleName.replace(eleName[0],""):eleName;
                          for(var n = 0,i = 0,pl= eles.length;i<pl;i++){
                            if(eles[i].nodeType == 1 && eles[i] !== this[0]&&(eles[i].getAttribute(type)==eleName || eles[i].tagName==eleName.toUpperCase())){
                                _this.push(eles[i]);
                                n++;
                            }
                         }  
                    }
                    
                }
              
          
               
                return new jQuery(_this);
                       
             },
             length:function() {
                let arr = []
                Object.keys(this).forEach((item,index)=>{
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                             arr.push(item);
                     }
                 })
                 return arr.length;
             },
             css:function(...style){
                   if(!this[0]){
                       return this;
                   }
                   if(typeof(style[0])!=='object'){   
                 
                     //通过属性Object.keys(this)索引改变样式
                     Object.keys(this).forEach((item,index)=>{
                        if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                          this.setStyle(this[item],style[0],style[1]);
                         }
                     })
                   }else{
                     
                     Object.keys(this).forEach((item,index)=>{
                        
                        if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                            for(let name in style[0]){
                                this.setStyle(this[item],name,style[0][name])
                            }
                        } 
                         
                     })  
                   }
                   return this; 
             },
             setStyle:function(ele,name,value){
                  
                     ele.style[name]=value;
             },
             removeClass:function(className){
                Object.keys(this).forEach((item,index)=>{
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                          this[item].classList.remove(className);
                    } 
                     
                 })
                 return new jQuery(this,this)
             },
             /**
              * @param {string} className 
              */
             addClass:function(className){
                Object.keys(this).forEach((item,index)=>{
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                        this[item].classList.add(className);
                    }   
                })
                 return new jQuery(this,this)
             },
             /**
              * 
              * @param {string} className 类名 
              */
             toggleClass:function(className){
                let i = 0;      
                for(;i<this.length;i++){
                    if(this[i].classList.include(className)){
                             this.removeClass(className);
                    }else{
                             this.addClass(removeClass);
                    }
                }
             },
             /**
              * 
              * @param {Array} eventNames  事件名称
              * @param {Function} fn          事件函数 
              */
             on:function(eventNames,fn){
                let events = eventNames.split(" ");
                Object.keys(this).forEach((item,index)=>{
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                           events.forEach(e=>this[item].addEventListener(e,fn));
                    }   
                }) 
                return this; 
             },
             each:function(callback){
                 Object.keys(this).forEach((item,index)=>{ 
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                              callback(parseInt(item),this[item]);  
                    }   
                 }) 
                 return this; 
             }
             
              
           }  

       //将Jq挂载到 window全局上
       window.jQuery = window.$ = function(selector,context){
           return new jQuery(selector,context);
       };
       $.ajax=function(options){
          
        var type,params,xhr; // 请求类型，传参，http实例  
        options = options || {};
        type = (options.type||'GET').toUpperCase(),
        params = formsParams(options.data);
        //  创建实例
        if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest();
        }else if(window.ActiveObject){//兼容IE6以下版本
            xhr=new ActiveXobject('Microsoft.XMLHTTP');
        }
        //发送请求 GET/POST
       
        if(type=='GET'){
            xhr.open("get",options.url + "?" + params,true);
            xhr.setRequestHeader(options.headers||"Content-Type", "application/json;charset=utf-8");
            xhr.send();
        }else if(type=="POST"){
            xhr.open("post",options.url,true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
        // 可以自己拓展 put
        //设置超时时间
        setTimeout(function(){
            if(xhr.readySate!=4){
                xhr.abort();
            }
        },options.timeout||2000);
        xhr.onreadystatechange = function(){
              if(xhr.readySate=4&&xhr.status==200){
                    options.success(xhr.responseText);
              }else{
                    options.error(xhr.status);
              }
        }
       };
       // 格式化数据格式的
       function formsParams(data){
        var arr = [];
        for(let key in data){
            arr.push(key+'='+data[key]) 
        }
          return arr.join('&');
     }
     
}()