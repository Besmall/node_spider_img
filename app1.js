/* 
    根据单独图片网址爬取数据
*/
var http = require("http");
var fs = require("fs");

function saveImage(imageUrl){
    http.get(imageUrl,(res)=>{
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
            if(!fs.existsSync("./image")){
                fs.mkdirSync("./image");
            };
            //保存图片
            fs.writeFile("image/"+Math.random()+'.png',imageData,"binary",(err)=>{
                if(err) throw err;
                console.log("保存成功！！！")
            })
        })
    })
}

var images = ['http://img6.bdstatic.com/img/image/smallpic/weijuchiluntu.jpg'];
for(var i =0 ; i < images.length ; i ++){
    saveImage(images[i]);
    //console.log(images[i])
}