function Img(src){
    this.src=src||''
    this.img=''
    this.dom=''
    this.data=[]
}

Img.prototype={
    constructor:Img,
    init:function(can,ctx){
        let that=this
        this.img=new Image()
        this.img.src=this.src
        this.dom=can
        this.img.onload=function(){
            that.drawImage(ctx)
        }
    },
    drawImage:function(ctx){
        this.dom.width=this.img.width>800?800:this.img.width
        this.dom.height=this.img.height*this.dom.width/this.img.width
        ctx.drawImage(this.img,0,0,this.dom.width,this.dom.height)
    },
    /**
     * @param {string} ctx canvas getcontext('2d')
     */
    getImgData:function(ctx){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                this.data=ctx.getImageData(0,0,this.dom.width,this.dom.height)
                resolve(this.data)
            },100)
        })
    },
    setImgData:function(ctx,data){
        var ui=ctx.createImageData(this.dom.width,this.dom.height)
        ui.data.set(data)
        ctx.putImageData(ui,0,0)
        let W = origin.width / 10
        let H = origin.height / 10
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        // ctx.fillRect(0, 0, origin.width, origin.height)
        sobel.lightData.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = '#fb2';
            ctx.fill();
        })
        for(let i = 1; i < 10; i++){
            ctx.moveTo(0 , i * H)
            ctx.lineTo(origin.width , i * H)
            ctx.moveTo(i * W, 0)
            ctx.lineTo(i * W, origin.height)
        }
        ctx.fillStyle = '#fff';
        ctx.font = '18px serif'
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                ctx.fillText(i + '' + j, i * W, j * H + 20)
            }
        }
        ctx.stroke()
    }
}