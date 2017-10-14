/* 
    根据网址爬取图片
*/
var http = require("http");
var https = require("https");
var fs = require("fs");
var cheerio = require("cheerio");

const imgurl = "http://image.baidu.com/";

//创建服务
http.get(imgurl,(res)=>{
    //触发接收事件data
    var imageData = "";
    res.on("data",(chunk)=>{
        //接收数据，将数据一点点的追加到没我们定义的空字符串中
        imageData+=chunk;
    });
    //触发接收完成时间end
    res.on("end",()=>{
        //cheerio类似于jQuery我们在用他之前必须载入文档用（load方法）
        var $ = cheerio.load(imageData);
        var ImgData = [];
        //遍历查出来的文本数据
        $(".img_pic_wrap_layer img").each((index,item)=>{ 
            //定义一个空数组，将数据内容存在里面 
            ImgData.push($(item).attr("src"));
        });
        //循环调用图片函数
        for(var i =0 ; i < ImgData.length ; i ++){
            saveImage(ImgData[i]);
        }
    });
});

//封装图片函数
function saveImage(imageUrl){
    //创建服务
    https.get(imageUrl,(res)=>{
        //二进制
        res.setEncoding("binary");
        var imageData="";
        //将图片加载到内存中
        res.on("data",(shuju)=>{
            imageData+=shuju;
        });
        
        //加载完保存图片
        res.on("end",()=>{
            //创建文件夹，如果有择不创建
            if(!fs.existsSync("./img")){
                fs.mkdirSync("./img");
            };
            //保存图片
            fs.writeFile("img/"+Math.random()+'.png',imageData,"binary",(err)=>{
                if(err) throw err;
                console.log("保存成功！！！")
            })
        })
    })
}


