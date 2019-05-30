!function(root){
    function Sobel(data){
        return new Sobel.prototype.init(data)
    }

    Sobel.prototype={
        constructor:Sobel,
        init:function(data){
            this.data=data.data
            this.height=data.height
            this.width=data.width
            this.total = 2000
            // this.posData
            this.X=[
                [-1,0,1],
                [-2,0,2],
                [-1,0,1]
            ]
            this.Y=[
                [-1,-2,-1],
                [0,0,0],
                [1,2,1]
            ]
            this.final=[]
            this.lightData=[]
        },
        posData(x,y){
            var r, g, b;
            r = (y * this.width + x) * 4
            g = (y * this.width + x) * 4 + 1
            b = (y * this.width + x) * 4 + 2
            return (this.data[r] + this.data[g] + this.data[b]) / 3
        },
        dealWith:function(){
            this.lightData=[], this.final=[]
            var light=[], pixelX, pixelY, magnitude
            // for(let y = 0; y < this.height; y++){
            //     for(let x = 0; x < this.width; x++){
            //         pixelX = 
            //             this.X[0][0] * this.posData(x - 1, y - 1) +
            //             this.X[0][1] * this.posData(x, y - 1) +
            //             this.X[0][2] * this.posData(x + 1, y - 1) +
            //             this.X[1][0] * this.posData(x - 1, y) +
            //             this.X[1][1] * this.posData(x, y) +
            //             this.X[1][2] * this.posData(x + 1, y) +
            //             this.X[2][0] * this.posData(x - 1, y + 1) +
            //             this.X[2][1] * this.posData(x, y + 1) +
            //             this.X[2][2] * this.posData(x + 1, y + 1)

            //         pixelY = 
            //             this.Y[0][0] * this.posData(x - 1, y - 1) +
            //             this.Y[0][1] * this.posData(x, y - 1) +
            //             this.Y[0][2] * this.posData(x + 1, y - 1) +
            //             this.Y[1][0] * this.posData(x - 1, y) +
            //             this.Y[1][1] * this.posData(x, y) +
            //             this.Y[1][2] * this.posData(x + 1, y) +
            //             this.Y[2][0] * this.posData(x - 1, y + 1) +
            //             this.Y[2][1] * this.posData(x, y + 1) +
            //             this.Y[2][2] * this.posData(x + 1, y + 1)

            //         magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;
            //         if(magnitude > 30){
            //             light.push(new Points(x,y))
            //         } 
            //         this.final.push(magnitude,magnitude,magnitude,255)
            //     }
            // }
            var X1 = [
                [0, -1, -2, -1, 0],
                [-1/2, -2, -4, -2, -1/2],
                [0, 0, 0, 0, 0],
                [1/2, 2, 4, 2, 1/2],
                [0, 1, 2, 1, 0]
            ],
            X2 = [
                [-1,-2,-1,-1/2,0],
                [-1,-2,-2,-1,0],
                [-1/2,-2,0,2,1/2],
                [0,1,2,2,1],
                [0,1/2,1,2,1]
            ],
            X3 = [
                [-1,-1,-1,-1/2,0],
                [-1,-4,-2,0,1/2],
                [-1,-2,0,2,1],
                [-1/2,0,2,4,1],
                [0,1/2,1,1,1]
            ],
            X4 = [
                [-1,-1,-1/2,0,0],
                [-2,-2,-2,1,1/2],
                [-1,-2,0,2,1],
                [-1/2,-1,2,2,2],
                [0,0,1/2,1,1]
            ],
            X5 = [
                [0,-1/2,0,1/2,0],
                [-1,-2,0,2,1],
                [-2,-4,-0,4,2],
                [-1,-2,0,2,1],
                [0,-1/2,0,1/2,0]
            ],
            X6 = [
                [0,0,1/2,1,1],
                [-1/2,-1,2,2,2],
                [-1,-2,0,2,1],
                [-2,-2,-2,1,1/2],
                [-1,-1,-1/2,0,0],
            ],
            X7 = [
                [0,1/2,1,1,1],
                [-1/2,0,2,4,1],
                [-1,-2,0,2,1],
                [-1,-4,-2,0,1/2],
                [-1,-1,-1,-1/2,0]
            ],
            X8 = [
                [0,1/2,1,2,1],
                [0,1,2,2,1],
                [-1/2,-2,0,2,1/2],
                [-1,-2,-2,-1,0],
                [-1,-2,-1,-1/2,0]
            ]
            function getData(seed, x, y){
                var data = seed[0][0] * this.posData(x - 2, y -2) +
                        seed[0][1] * this.posData(x - 1, y - 2) +
                        seed[0][2] * this.posData(x, y - 2) +
                        seed[0][3] * this.posData(x + 1, y - 2) +
                        seed[0][4] * this.posData(x + 2, y - 2) +
                        seed[1][0] * this.posData(x - 2, y - 1) +
                        seed[1][1] * this.posData(x - 1, y - 1) +
                        seed[1][2] * this.posData(x, y - 1) +
                        seed[1][3] * this.posData(x + 1, y - 1) +
                        seed[1][4] * this.posData(x + 2, y - 1) +
                        seed[2][0] * this.posData(x - 2, y ) +
                        seed[2][1] * this.posData(x - 1, y ) +
                        seed[2][2] * this.posData(x, y ) +
                        seed[2][3] * this.posData(x + 1, y ) +
                        seed[2][4] * this.posData(x + 2, y ) +
                        seed[3][0] * this.posData(x - 2, y + 1) +
                        seed[3][1] * this.posData(x - 1, y + 1) +
                        seed[3][2] * this.posData(x, y + 1) +
                        seed[3][3] * this.posData(x + 1, y + 1) +
                        seed[3][4] * this.posData(x + 2, y + 1) +
                        seed[4][0] * this.posData(x - 2, y + 2) +
                        seed[4][1] * this.posData(x - 1, y + 2) +
                        seed[4][2] * this.posData(x, y + 2) +
                        seed[4][3] * this.posData(x + 1, y + 2) +
                        seed[4][4] * this.posData(x + 2, y + 2) 
                return data
            }
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    pixel1 = getData.call(this,X1, x, y)
                    pixel2 = getData.call(this,X2, x, y)
                    pixel3 = getData.call(this,X3, x, y)
                    pixel4 = getData.call(this,X4, x, y)
                    pixel5 = getData.call(this,X5, x, y)
                    pixel6 = getData.call(this,X6, x, y)
                    pixel7 = getData.call(this,X7, x, y)
                    pixel8 = getData.call(this,X8, x, y)

                    magnitude = Math.sqrt(
                        (pixel1 * pixel1)/10 + 
                        (pixel2 * pixel2)/10 +
                        (pixel3 * pixel3)/10 +
                        (pixel4 * pixel4)/10 +
                        (pixel5 * pixel5)/10 +
                        (pixel6 * pixel6)/10 +
                        (pixel7 * pixel7)/10 +
                        (pixel8 * pixel8)/10 
                    )>>>0;
                    
                    this.final.push(magnitude,magnitude,magnitude,255)
                }
            }
            function getLight(data, width){
                return function(x, y){
                    return data[4 * (x + y * width)] || 0
                }
            }
            var L = getLight(this.final, this.width)
            var returnZero = []
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    let magnitude = L(x, y)
                    if(magnitude >= Math.max(L(x-1, y), L(x + 1, y)) ||
                    magnitude >= Math.max(L(x, y - 1), L(x, y + 1)) ||
                    magnitude >= Math.max(L(x - 1, y + 1), L(x + 1, y - 1)) ||
                    magnitude >= Math.max(L(x - 1, y - 1), L(x + 1, y + 1))){
                        if(magnitude > 30){
                            light.push(new Points(x, y))
                        }
                        continue
                    }else{
                        returnZero.push(4 * (x + y * this.width))
                    }
                }
            }
            returnZero.forEach(value => {
                this.final[value] = 0
                this.final[value + 1] = 0
                this.final[value + 2] = 0
            })
            var mainPoint = ~~(this.total * 0.95)
            for(let i = 0; i < mainPoint; i++){
                this.lightData.push(light[~~(Math.random() * light.length)])
            }
            for(let i = 0;i < this.total - mainPoint; i++){
                this.lightData.push(new Points(~~(Math.random() * this.width), ~~(Math.random() * this.height)))
            }
            this.lightData.push(new Points(0,0),
            new Points(0,this.height),
            new Points(this.width,this.height),
            new Points(this.width,0))
            // this.lightData=Array.from(new Set(this.lightData))
            
            return this.final
        },
        //10 x 10
        dealWith1:function(){
            this.lightData=[], this.final=[]
            var light={}, pixelX, pixelY, magnitude, TotalLight = 0
            let W = this.width / 10
            let H = this.height / 10
            var count={}
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    pixelX = 
                        this.X[0][0] * this.posData(x - 1, y - 1) +
                        this.X[0][1] * this.posData(x, y - 1) +
                        this.X[0][2] * this.posData(x + 1, y - 1) +
                        this.X[1][0] * this.posData(x - 1, y) +
                        this.X[1][1] * this.posData(x, y) +
                        this.X[1][2] * this.posData(x + 1, y) +
                        this.X[2][0] * this.posData(x - 1, y + 1) +
                        this.X[2][1] * this.posData(x, y + 1) +
                        this.X[2][2] * this.posData(x + 1, y + 1)

                    pixelY = 
                        this.Y[0][0] * this.posData(x - 1, y - 1) +
                        this.Y[0][1] * this.posData(x, y - 1) +
                        this.Y[0][2] * this.posData(x + 1, y - 1) +
                        this.Y[1][0] * this.posData(x - 1, y) +
                        this.Y[1][1] * this.posData(x, y) +
                        this.Y[1][2] * this.posData(x + 1, y) +
                        this.Y[2][0] * this.posData(x - 1, y + 1) +
                        this.Y[2][1] * this.posData(x, y + 1) +
                        this.Y[2][2] * this.posData(x + 1, y + 1)

                    magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;
                    let index = ~~(x / W) + '' + ~~(y / H)
                    if(!light[index]){
                        light[index] = []
                        count[index] = 0
                    }
                    if(magnitude > 30 && x != 0 && y != 0 && x != this.width && y != this.height){
                        light[index].push(new Points(x,y))
                        if(magnitude >= 100 && magnitude < 250){
                            count[index] += 20
                            TotalLight += 20
                        }else if (magnitude >= 250){
                            count[index] += 40
                            TotalLight += 40
                        }else{
                            count[index]++
                            TotalLight++
                        }
                    } 
                    this.final.push(magnitude,magnitude,magnitude,255)
                }
            }
            var mainPoint = ~~(this.total * 0.95)
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 10; j++){
                    let index = i + '' + j
                    let nowPoint = ~~(count[index] / TotalLight * mainPoint)
                    for(let x = 0; x < nowPoint; x++){
                        this.lightData.push(light[index][~~(Math.random() * light[index].length)])
                    }
                }
            }
            for(let i = 0; i < this.total - mainPoint; i++){
                let x = ~~(Math.random()*this.width),
                y = ~~(Math.random()*this.height)
                let index = ~~(x / W) + '' + ~~(y / H)
                if(count[index] / TotalLight > 0.035){
                    // console.log(index)
                    i--
                    continue
                }else{
                    this.lightData.push(new Points(x,y))
                    // console.log('%c'+index,'color:#f00')
                }
            }
            this.lightData.push(new Points(0,0),
            new Points(0,this.height),
            new Points(this.width,this.height),
            new Points(this.width,0))
            // this.lightData=Array.from(new Set(this.lightData))
            return this.final
        },
        dealWith8:function(){
            this.lightData=[], this.final=[]
            var light={}, pixelX, pixelY, magnitude, TotalLight = 0
            let W = this.width / 10
            let H = this.height / 10
            var count={}
            var X1 = [
                [0, -1, -2, -1, 0],
                [-1/2, -2, -4, -2, -1/2],
                [0, 0, 0, 0, 0],
                [1/2, 2, 4, 2, 1/2],
                [0, 1, 2, 1, 0]
            ],
            X2 = [
                [-1,-2,-1,-1/2,0],
                [-1,-2,-2,-1,0],
                [-1/2,-2,0,2,1/2],
                [0,1,2,2,1],
                [0,1/2,1,2,1]
            ],
            X3 = [
                [-1,-1,-1,-1/2,0],
                [-1,-4,-2,0,1/2],
                [-1,-2,0,2,1],
                [-1/2,0,2,4,1],
                [0,1/2,1,1,1]
            ],
            X4 = [
                [-1,-1,-1/2,0,0],
                [-2,-2,-2,1,1/2],
                [-1,-2,0,2,1],
                [-1/2,-1,2,2,2],
                [0,0,1/2,1,1]
            ],
            X5 = [
                [0,-1/2,0,1/2,0],
                [-1,-2,0,2,1],
                [-2,-4,-0,4,2],
                [-1,-2,0,2,1],
                [0,-1/2,0,1/2,0]
            ],
            X6 = [
                [0,0,1/2,1,1],
                [-1/2,-1,2,2,2],
                [-1,-2,0,2,1],
                [-2,-2,-2,1,1/2],
                [-1,-1,-1/2,0,0],
            ],
            X7 = [
                [0,1/2,1,1,1],
                [-1/2,0,2,4,1],
                [-1,-2,0,2,1],
                [-1,-4,-2,0,1/2],
                [-1,-1,-1,-1/2,0]
            ],
            X8 = [
                [0,1/2,1,2,1],
                [0,1,2,2,1],
                [-1/2,-2,0,2,1/2],
                [-1,-2,-2,-1,0],
                [-1,-2,-1,-1/2,0]
            ]
            function getData(seed, x, y){
                var data = seed[0][0] * this.posData(x - 2, y -2) +
                        seed[0][1] * this.posData(x - 1, y - 2) +
                        seed[0][2] * this.posData(x, y - 2) +
                        seed[0][3] * this.posData(x + 1, y - 2) +
                        seed[0][4] * this.posData(x + 2, y - 2) +
                        seed[1][0] * this.posData(x - 2, y - 1) +
                        seed[1][1] * this.posData(x - 1, y - 1) +
                        seed[1][2] * this.posData(x, y - 1) +
                        seed[1][3] * this.posData(x + 1, y - 1) +
                        seed[1][4] * this.posData(x + 2, y - 1) +
                        seed[2][0] * this.posData(x - 2, y ) +
                        seed[2][1] * this.posData(x - 1, y ) +
                        seed[2][2] * this.posData(x, y ) +
                        seed[2][3] * this.posData(x + 1, y ) +
                        seed[2][4] * this.posData(x + 2, y ) +
                        seed[3][0] * this.posData(x - 2, y + 1) +
                        seed[3][1] * this.posData(x - 1, y + 1) +
                        seed[3][2] * this.posData(x, y + 1) +
                        seed[3][3] * this.posData(x + 1, y + 1) +
                        seed[3][4] * this.posData(x + 2, y + 1) +
                        seed[4][0] * this.posData(x - 2, y + 2) +
                        seed[4][1] * this.posData(x - 1, y + 2) +
                        seed[4][2] * this.posData(x, y + 2) +
                        seed[4][3] * this.posData(x + 1, y + 2) +
                        seed[4][4] * this.posData(x + 2, y + 2) 
                return data
            }
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    pixel1 = getData.call(this,X1, x, y)
                    pixel2 = getData.call(this,X2, x, y)
                    pixel3 = getData.call(this,X3, x, y)
                    pixel4 = getData.call(this,X4, x, y)
                    pixel5 = getData.call(this,X5, x, y)
                    pixel6 = getData.call(this,X6, x, y)
                    pixel7 = getData.call(this,X7, x, y)
                    pixel8 = getData.call(this,X8, x, y)

                    magnitude = Math.sqrt(
                        (pixel1 * pixel1)/10 + 
                        (pixel2 * pixel2)/10 +
                        (pixel3 * pixel3)/10 +
                        (pixel4 * pixel4)/10 +
                        (pixel5 * pixel5)/10 +
                        (pixel6 * pixel6)/10 +
                        (pixel7 * pixel7)/10 +
                        (pixel8 * pixel8)/10 
                    )>>>0;
                    
                    this.final.push(magnitude,magnitude,magnitude,255)
                }
            }
            function getLight(data, width){
                return function(x, y){
                    return data[4 * (x + y * width)] || 0
                }
            }
            var L = getLight(this.final, this.width)
            var returnZero = []
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    let magnitude = L(x, y)
                    if(magnitude >= Math.max(L(x-1, y), L(x + 1, y)) ||
                    magnitude >= Math.max(L(x, y - 1), L(x, y + 1)) ||
                    magnitude >= Math.max(L(x - 1, y + 1), L(x + 1, y - 1)) ||
                    magnitude >= Math.max(L(x - 1, y - 1), L(x + 1, y + 1))){
                        continue
                    }else{
                        returnZero.push(4 * (x + y * this.width))
                    }
                }
            }
            returnZero.forEach(value => {
                this.final[value] = 0
                this.final[value + 1] = 0
                this.final[value + 2] = 0
            })
            L = getLight(this.final, this.width)
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    let magnitude = L(x, y)
                    let index = ~~(x / W) + '' + ~~(y / H)
                    if(!light[index]){
                        light[index] = []
                        count[index] = 0
                    }
                    if(magnitude > 97 && x > 1 && y > 1 && x < this.width - 2 && y < this.height - 1){
                        light[index].push(new Points(x,y))
                        if(magnitude >= 130 && magnitude < 250){
                            count[index] += 20
                            TotalLight += 20
                        }else if (magnitude >= 250){
                            count[index] += 40
                            TotalLight += 40
                        }else{
                            count[index]++
                            TotalLight++
                        }
                    } 
                }
            }
            var mainPoint = ~~(this.total * 0.95)
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 10; j++){
                    let index = i + '' + j
                    let nowPoint = ~~(count[index] / TotalLight * mainPoint)
                    for(let x = 0; x < nowPoint; x++){
                        this.lightData.push(light[index][~~(Math.random() * light[index].length)])
                    }
                }
            }
            for(let i = 0; i < this.total - mainPoint; i++){
                let x = ~~(Math.random()*this.width),
                y = ~~(Math.random()*this.height)
                let index = ~~(x / W) + '' + ~~(y / H)
                if(count[index] / TotalLight > 0.025){
                    // console.log(index)
                    i--
                    continue
                }else{
                    this.lightData.push(new Points(x,y))
                    // console.log('%c'+index,'color:#f00')
                }
            }
            this.lightData.push(new Points(0,0),
            new Points(0,this.height),
            new Points(this.width,this.height),
            new Points(this.width,0))
            // this.lightData=Array.from(new Set(this.lightData))
            // console.log(this.final)
            return this.final
        },
        getPoint:function(){
            console.log(this.final)
        }
    }
    Sobel.prototype.init.prototype=Sobel.prototype
    root.Sobel=Sobel
}(this)