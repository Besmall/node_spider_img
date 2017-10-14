/* 
    根据网址爬取数据
*/
//引入核心模块
var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");

const news = "http://www.weather.com.cn/weather/101010100.shtml";

//创建服务
var strHtml = "";
var results = [];
http.get(news,(res)=>{
    //触发接收事件data
    res.on("data",(chunk)=>{
        //接收数据，将数据一点点的追加到没我们定义的空字符串中
        strHtml+=chunk;
    });
    //触发接收完成时间end
    res.on("end",()=>{
        //cheerio类似于jQuery我们在用他之前必须载入文档用（load方法）
        var $ = cheerio.load(strHtml);
        var menew = [];
        //遍历查出来的文本数据
        $("#7d li").each((index,item)=>{
            //定义一个空数组，将数据内容存在里面
            menew.push({id:index,text:$(item).text()});
        });
        //转换JSON字符串
      var res = JSON.stringify(menew);
      //储存到本地
        fs.writeFile("./data1.json",res,(err)=>{
            if(!err) console.log("成功写入");
        })
    });
});