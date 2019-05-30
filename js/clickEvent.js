
function Line(){
    T_yn = !T_yn
    ctx1.clearRect(0, 0, origin.width, origin.height);
    sanjiao.forEach((x)=>{
        ctx1.beginPath();
        ctx1.lineWidth=1;
        ctx1.moveTo(x.p1.x, x.p1.y);
        ctx1.lineTo(x.p2.x, x.p2.y);
        ctx1.lineTo(x.p3.x, x.p3.y);
        ctx1.closePath();
        ctx1.fillStyle=x.color
        ctx1.fill()
        ctx1.strokeStyle =T_yn? color:x.color
        ctx1.stroke();
    })
}
function mathRadius(count, width, height){
    var proportion = width / height
    var x = Math.sqrt(count * proportion)
    var y = Math.sqrt(count / proportion)
    console.log(x, 'x', y, 'y')
    return Math.ceil(Math.max((width / x), (height / y)) * 2**(1/2) / 2) 
}
function animateCon(){
    // if(odd++ % 2 == 0){
    //     clearInterval(ani1)
    //     clearInterval(ani2)
    //     return 0
    // }
    // ani1=setInterval(() => {
    //     sobelD=sobel.dealWith1()
    //     sanjiao=MakeLowPoly1(result,ctx1,sobel.lightData,sobel.data)
    //     sanjiao.forEach((x)=>{
    //         ctx1.beginPath();
    //         ctx1.lineWidth=1;
    //         ctx1.moveTo(x.p1.x, x.p1.y);
    //         ctx1.lineTo(x.p2.x, x.p2.y);
    //         ctx1.lineTo(x.p3.x, x.p3.y);
    //         ctx1.closePath();
    //         ctx1.fillStyle=x.color
    //         ctx1.fill()
    //         ctx1.strokeStyle =T_yn? color:x.color
    //         ctx1.stroke();
    //     })
    // },500)
    // ani2=setInterval(() => {
    //     sobelD=sobel.dealWith()
    //     sanjiao=MakeLowPoly1(result,ctx,sobel.lightData,sobel.data)
    //     sanjiao.forEach((x)=>{
    //         ctx.beginPath();
    //         ctx.lineWidth=1;
    //         ctx.moveTo(x.p1.x, x.p1.y);
    //         ctx.lineTo(x.p2.x, x.p2.y);
    //         ctx.lineTo(x.p3.x, x.p3.y);
    //         ctx.closePath();
    //         ctx.fillStyle=x.color
    //         ctx.fill()
    //         ctx.strokeStyle =T_yn? color:x.color
    //         ctx.stroke();
    //     })
    // },500)
    var points = [300, 500, 1000,2000]
    var ccz
    for(let i = 0; i < 1; i++){
        sobel.total = points[i]
        for(let j = 1; j <= 1; j++){
            sobelD=sobel.dealWith1()
            sanjiao=MakeLowPoly1(result,ctx1,sobel.lightData,sobel.data)
            sanjiao.forEach((x)=>{
                ctx1.beginPath();
                ctx1.lineWidth=1;
                ctx1.moveTo(x.p1.x, x.p1.y);
                ctx1.lineTo(x.p2.x, x.p2.y);
                ctx1.lineTo(x.p3.x, x.p3.y);
                ctx1.closePath();
                ctx1.fillStyle=x.color
                ctx1.fill()
                ctx1.strokeStyle =T_yn? color:x.color
                ctx1.stroke();
            })
            ccz = similarTest(result)
            ccz('dealWith1_' + points[i] + '(' + j + ')' + '.png')
            // sobelD=sobel.dealWith()
            // sanjiao=MakeLowPoly1(result,ctx1,sobel.lightData,sobel.data)
            // sanjiao.forEach((x)=>{
            //     ctx1.beginPath();
            //     ctx1.lineWidth=1;
            //     ctx1.moveTo(x.p1.x, x.p1.y);
            //     ctx1.lineTo(x.p2.x, x.p2.y);
            //     ctx1.lineTo(x.p3.x, x.p3.y);
            //     ctx1.closePath();
            //     ctx1.fillStyle=x.color
            //     ctx1.fill()
            //     ctx1.strokeStyle = T_yn? color:x.color
            //     ctx1.stroke();
            // })
            // ccz = similarTest(result)
            // ccz('dealWith_' + points[i] + '(' + j + ')' + '.png')
            // let radius = mathRadius(points[i], origin.width, origin.height)
            // var poissionPoint=poisson(origin.width, origin.height, radius)()  //poission
            // sanjiao = MakeLowPoly1(result, ctx1, poissionPoint, sobel.data)   //poission
            // sanjiao.forEach((x)=>{
            //     ctx1.beginPath();
            //     ctx1.lineWidth = 1;
            //     ctx1.moveTo(x.p1.x, x.p1.y);
            //     ctx1.lineTo(x.p2.x, x.p2.y);
            //     ctx1.lineTo(x.p3.x, x.p3.y);
            //     ctx1.closePath();
            //     ctx1.fillStyle = x.color
            //     ctx1.fill()
            //     ctx1.strokeStyle = T_yn? color:x.color
            //     ctx1.stroke();
            // })
            // ccz = similarTest(result)
            // ccz('poisson_' + points[i] + '(' + j + ')' + '.png')
            // sanjiao = MakeLowPoly1(result, ctx1, Random(result.width, result.height, poissionPoint.length), sobel.data)// random
            // sanjiao.forEach((x)=>{
            //     ctx1.beginPath();
            //     ctx1.lineWidth=1;
            //     ctx1.moveTo(x.p1.x, x.p1.y);
            //     ctx1.lineTo(x.p2.x, x.p2.y);
            //     ctx1.lineTo(x.p3.x, x.p3.y);
            //     ctx1.closePath();
            //     ctx1.fillStyle=x.color
            //     ctx1.fill()
            //     ctx1.strokeStyle =T_yn? color:x.color
            //     ctx1.stroke();
            // })
            // ccz = similarTest(result)
            // ccz('random_' + points[i] + '(' + j + ')' + '.png')
        }
    }
    
}

function edgeCheck(){
    if(arguments.length)
        S_yn=!S_yn
    if(this.img!=img1||typeof this.img==undefined){
        this.img=img1
        img=new Img(img1)
    }
    if(S_yn){
        img.init(origin,ctx)
        img.getImgData(ctx).then(res=>{
            img.setImgData(ctx,sobelD)
        })
        origin.onclick = function(e){
            var point = new Points(e.offsetX, e.offsetY)
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = '#0f0';
            ctx.fill();
            sobel.lightData.push(point)
            // ctx1.strokeStyle = '#000'
            ctx1.clearRect(0, 0, origin.width, origin.height)
            MakeLowPoly1(result,ctx1,sobel.lightData,sobel.data).forEach((x)=>{
                ctx1.beginPath();
                ctx1.lineWidth=1;
                ctx1.moveTo(x.p1.x, x.p1.y);
                ctx1.lineTo(x.p2.x, x.p2.y);
                ctx1.lineTo(x.p3.x, x.p3.y);
                ctx1.closePath();
                ctx1.fillStyle=x.color
                ctx1.fill()
                ctx1.strokeStyle =T_yn? color:x.color
                ctx1.stroke();
            })
        }
    }else{
        img.init(origin,ctx)
        origin.onclick = ''
    }
    return function(){
        this.img
    }
}

function reflesh(){
    Timer.start()
    sobelD=sobel.dealWith8()
    sanjiao=MakeLowPoly1(result,ctx1,sobel.lightData,sobel.data)
    Timer.stop()
    ctx1.clearRect(0, 0, origin.width, origin.height);
    sanjiao.forEach((x)=>{
        ctx1.beginPath();
        ctx1.lineWidth=1;
        ctx1.moveTo(x.p1.x, x.p1.y);
        ctx1.lineTo(x.p2.x, x.p2.y);
        ctx1.lineTo(x.p3.x, x.p3.y);
        ctx1.closePath();
        ctx1.fillStyle=x.color
        ctx1.fill()
        ctx1.strokeStyle =T_yn? color:x.color
        ctx1.stroke();
    })
    edgeCheck()
    // console.log(Timer.getTime())
}
var Timer={
    data:undefined,
    start:function(){
        Timer.data = new Date();
    },
    stop:function(){
        var time = Timer.data;
        if(time){
            Timer.data = (new Date() - time) / 1000;
        }
        var d = document.createElement('div')
        d.setAttribute('id', 'time')
        d.innerText = Timer.data + 's'
        d.setAttribute('style', 'width:100px;height:40px;font-size:20px;background:rgba(16, 253, 205, 0.4);position:absolute;bottom:30px;left:30px;text-align:center;line-height:40px')
        document.getElementsByTagName('body')[0].appendChild(d)
        setTimeout(function(){
            document.getElementById('time').remove()
        },2000)
    }
};
function similarTest(result){
    // var im = document.createElement('img')
    // im.src = result.toDataURL('png')
    var data = result.toDataURL('png')
    return function(fileName){
        var a = document.createElement("a");
        a.href = data;
        a.download = fileName;
        a.click();
    }
}
