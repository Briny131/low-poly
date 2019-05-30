!function(win){
    var myChart = 's'
    window.onload=function(){
        var dom = document.getElementById("container");
        myChart = echarts.init(dom);
    }
    var avg = 3
    function ceshi(res){
        var pointCount = [300, 500, 1000, 3000, 5000, 10000]
        var timeLong = [],
        timeLong1 = []
        new Promise(resolve => {
            sobel=Sobel(res)
            sobel.total = pointCount[0]
            setTimeout(() => {
                resolve(res)
            },5e2)
        }).then(res => {
            for(let i = 0; i < pointCount.length; i++){
                let time = 0
                sobel=Sobel(res)
                sobel.total = pointCount[i]
                for(let j = 1; j <= avg; j++){
                    Timer.start()
                    sobelD=sobel.dealWith()
                    result.width=origin.width
                    result.height=origin.height
                    sanjiao=MakeLowPoly1(result,ctx1,sobel.lightData,res.data)
                    Timer.stop()
                    time += Timer.getTime()
                }
                timeLong.push(time / avg)
            }
            for(let i = 0; i < pointCount.length; i++){
                let time = 0
                sobel=Sobel(res)
                sobel.total = pointCount[i]
                for(let j = 1; j <= avg; j++){
                    Timer.start()
                    sobelD=sobel.dealWith()
                    result.width=origin.width
                    result.height=origin.height
                    sanjiao=MakeLowPoly(result,ctx1,sobel.lightData,res.data)
                    Timer.stop()
                    time += Timer.getTime()
                }
                timeLong1.push(time / avg)
            }
            // timeLong.shift()
            // pointCount.shift()
            option = null;
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['排序优化','未优化'],
                    textStyle:{
                        fontSize:32
                    }
                },
                xAxis: {
                    type: 'category',
                    data: pointCount,
                    axisLabel:{
                        formatter:'{value} 个',
                        textStyle:{
                            fontSize:20
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        formatter:'{value} s',
                        textStyle:{
                            fontSize:20
                        }
                    }
                },
                series: [{
                    data: timeLong,
                    type: 'line',
                    name: '排序优化'
                },{
                    data: timeLong1,
                    type: 'line',
                    name: '未优化'
                }]
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        })
        
    }

    function similar(){
        $.ajax({
            type:'GET',
            url:'http://127.0.0.1:8888',
            data:{},
            success:function(e){
                var data = grouping(JSON.parse(e))
                console.log(data)
                var point = [],
                point1 = [],
                poisson = [],
                random = []

                for(let i in data.dealWith){
                    var total = 0
                    for(let j of data.dealWith[i]){
                        total += j.similar
                    }
                    point.push(total / 10)
                }

                for(let i in data.dealWith1){
                    var total = 0
                    for(let j of data.dealWith1[i]){
                        total += j.similar
                    }
                    point1.push(total / 10)
                }

                for(let i in data.poisson){
                    var total = 0
                    for(let j of data.poisson[i]){
                        total += j.similar
                    }
                    poisson.push(total / 10)
                }

                for(let i in data.random){
                    var total = 0
                    for(let j of data.random[i]){
                        total += j.similar
                    }
                    random.push(total / 10)
                }

                option = null;
                option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['优化取点','未优化','poisson','随机'],
                        textStyle:{
                            fontSize:32
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: [300, 500, 1000, 2000],
                        axisLabel:{
                            formatter:'{value} 个',
                            textStyle:{
                                fontSize:20
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel:{
                            textStyle:{
                                fontSize:20
                            }
                        }
                    },
                    series: [{
                        data: point1,
                        type: 'line',
                        name: '优化取点'
                    },{
                        data: point,
                        type: 'line',
                        name: '未优化'
                    },{
                        data: poisson,
                        type: 'line',
                        name: 'poisson'
                    },{
                        data: random,
                        type: 'line',
                        name: '随机'
                    }]
                };
                ;
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

                // document.getElementById('head').innerHTML=e
            }
        })
    }

    function grouping(data){
        var d = {}
        d.dealWith = []
        d.dealWith1 = []
        d.poisson = []
        d.random = []
        for(let i = 0; i < data.length; i++){
            if(/dealWith_/.test(data[i].image)){
                d.dealWith.push(data[i])
            }else if(/dealWith1_/.test(data[i].image)){
                d.dealWith1.push(data[i])
            }else if(/poisson_/.test(data[i].image)){
                d.poisson.push(data[i])
            }else{
                d.random.push(data[i])
            }     
        }
        for(let i in d){
            d[i] = groupCount(d[i])
        }
        return d
    }

    function groupCount(data){
        var num = ['300', '500', '1000', '2000']
        var d = {}
        d['300'] = []
        d['500'] = []
        d['1000'] = [] 
        d['2000'] = [] 
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < num.length; j++){
                if(new RegExp(num[j]).test(data[i].image)){
                    d[num[j]].push(data[i])
                    break;
                }
            }
        }
        return d
    }


    var Timer={
        data:undefined,
        start:function(){
            Timer.data=new Date();
        },
        stop:function(){
            var time=Timer.data;
            if(time)
                Timer.data=new Date()-time;
        },
        getTime:function(){
            return Timer.data/1000;
        }
    };

    win.ceshi = ceshi
    win.similar = similar

}(this)