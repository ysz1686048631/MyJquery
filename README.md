##  Jquery 类库

* 此篇文章主要说的是关于jQuery的链式操作和简单封装一个Jquery库并使用我们自己的Jquery库来操作DOM。

* 为什么要使用jQuery

  * 可通过任意(css选择器)，来查询文档元素
  * 简洁的语法，比原生JS更简便的操作选中的元素

* jQuery定义了一个全局函数，该函数使用频繁，那就给它改名为 $ ,$() 的返回值是一个jQuery对象 , 这里要注意它与JavaScript直接获取 dom 是不同的；
  jQuery获取DOM只能用jQuery的方法来操作DOM,JavaScript同理，两者不能互相调用和使用披此的方法。

* 在jQuery类库中，最重要的方法是jQuery()方法 (也就是 $()) , 它的功能也是非常的强大的，下面给大家介绍集中在使用jQuery常用的调用方式

  ```js
  // 1. 传入css 选择器
  $('在这里填入css选择器') 
  // 2. 传入document,window
  $(document)
  // 3. 传入函数
  $(function(){
        // 需要执行的内容
  })
  // 其实$() 还支持 第二个参数，这里就不过多解释了，感兴趣的可以去看官方文档    
  ```

  * 不忘初心，成事之根本,始终不能放弃学习的根本。相信用过jQuery的朋友都知道，jQuery就是通过JavaScript实现的,那么我们就是用JavaScript来简单实现一下关于以上jQuery调用方式，以及其他操作DOM的功能。

  ```js
   // 首先创建一个构造函数
    var jQuery = function(selector,context){
                  this.prevObject = context ? context:[document];
                  this.init(selector)   
       } 
  //初始化状态 分两种传参情况
    jQuery.prototype.init=function(selector){
                    //1. css 选择器
                    if(typeof selector==='string'){
                        [...document.querySelectorAll(selector)].forEach((item,index)=>{
                                this[index]=item;
                        }); 
                    //2. 传入函数    
                    }else if(typeof selector==='function'){
                        document.addEventListener('DOMContentLoaded',selector);     
                    }
                    //因为上面 $(document) 调用方法与$(funciton(){})执行效果一样，所以这里值实现后面的     
    }  
  ```

  * 上面的调用方法实现了，但是只有开始是不够的，那我们就简单实现一下其他的方法吧（首先必须熟悉Jquery的方法使用，戳这里[Jquery中文文档](https://jquery.cuishifeng.cn/index.html)）

  * eq() 方法的实现

    ```js
     jQuery.prototype.eq=function(index){
                  index = index?index:0;
                  return new jQuery(this[index],this); //将当前装，第一状态返回为了使用后end()方法
     },
    ```

  * end() 方法的实现

  ```js
  //获取第一状态
  jQuery.prototype.end=function(){
                  return this.prevObject;
     },
  ```

  * css 方法的实现

    ```js
     jQuery.prototype.css=function(...style){
         // style 传参需要考虑两种形式 第一种css("color","red")  第二种就是以对象的形式传递了 
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
             //setStyle 函数 来改变元素的样式
             setStyle:function(ele,name,value){
                  
                     ele.style[name]=value;
             },
    ```

 * removeClass() 方法的实现

   ```js
   //  removeClass 方法的实现实现就简单很多了，包括 addclass，toggleClass 方法就不去实现了原理与removeClass类似
       jQuery.prototype.removeClass=function(className){
                       Object.keys(this).forEach((item,index)=>{
                           if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                               this[item].classList.remove(className);
                           } 
                           
                       })
                       return new jQuery(this,this)
                   },
   ```

 * on(事件名,回调函数)

   ```js
   jQuery.prototype.on=function(eventNames,fn){
                //这里需要考虑eventNames 参数不一定是字符串 还可能是数组
                let events = eventNames.split(" ");
                Object.keys(this).forEach((item,index)=>{
                    if(typeof (parseInt(item))=='number'&& !isNaN(parseInt(item))){
                           events.forEach(e=>this[item].addEventListener(e,fn));
                    }   
                }) 
                return this; 
             }
   ```

* 最后就Ajax了

```js
  //这里Ajax与Jquery的源码一样都是在创建实例之后加入Ajax方法的，其实我实现也很简单就是使用元素JavaScript封装Ajax之后添加到实例上就可以了；
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
```

* 其他方法就不过多解释了,源码+案例已经上传至Github
* 下面使用我们刚刚封装的Jquery来写一个轮播图

```js
    //CSS
        .dome{
                width:300px;
                height: 200px;
                display: flex;
                flex-direction: row;
                
                background: red;

        }
        .dome .swiper{
                flex: 1;
                position: relative;
        } 
        .dome .swiper .imgs{
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: none;
        }
        .btn{
            cursor: pointer;
        }
    //HTML
    <div class="dome">
            <div class=" btn pre">《</div>
            <div class="swiper">
                    <img class="imgs" src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3443714613,873961460&fm=26&gp=0.jpg" alt="">
                    <img class="imgs" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705581946,4177791147&fm=26&gp=0.jpg" alt="">
                    <img class="imgs" src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3884696342,748367806&fm=26&gp=0.jpg" alt=""> 
            </div>
            <div class=" btn next">》</div>
    </div>
    //JS部分
        $(function(){
                var num = 0;
                $('.pre').on('click',function(){
                    move(-1)
                })
                $('.next').on('click',function(){
                    move(1)
                })
                $('.imgs').eq(0).css("display","block");
                function move(dot){
                        num+=1*dot; 
                        num = num>$('.imgs').length()-1?0:num;
                        num = num<0?$('.imgs').length()-1:num;
                        console.log(num)
                        $('.imgs').eq(num).css("display","block").siblings('.imgs').css("display","none")

                } 
                
        })       
    //是不是用jQuery写轮播图很简单啊，这就是Jquery比原生JS的简便之处，但房之基，树之根也不要忘记学习我们的原生哦！  
   
```

*  看到这里，关于本篇内容就到最后了，文章如有不足之处还请留言反馈，如果这篇文章对你有所帮助那就请你给[小编](https://github.com/ysz1686048631?tab=repositories)个关注吧!感谢支持！还等什么赶紧去撸一个属于自己的Jquery库吧！加油 ！ 前端人！

