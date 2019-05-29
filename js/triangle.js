function Points(x , y){
    this.x=x
    this.y=y
}

Points.prototype={
    constructor:Points,
    check:function(p){
        return this.x==p.x&&this.y==p.y
    }
}

function Edge(p1,p2){
    this.p1=p1
    this.p2=p2
}

Edge.prototype={
    constructor:Edge,
    check:function(e){
        return this.p1.check(e.p1)&&this.p2.check(e.p2)||
        this.p1.check(e.p2)&&this.p2.check(e.p1)
    }
}

function Triangle(p1,p2,p3){
    this.p1=p1
    this.p2=p2
    this.p3=p3
    this.cycle()
}

Triangle.prototype={
    constructor:Triangle,
    cycle:function(){
        var k1,k2,b1,b2;
        if(this.p1.check(this.p2) || this.p1.check(this.p2) || this.p2.check(this.p3)){
            this.radius = 'delete'
            return;
        }
        k1 = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x)
        k2 = (this.p1.y - this.p3.y) / (this.p1.x - this.p3.x)
        k1 = k1 === -Infinity || k1 === Infinity? 'shu' : k1 === 0? 0 : -1 / k1
        k2 = k2 === -Infinity || k2 === Infinity? 'shu' : k2 === 0? 0 : -1 / k2
        b1 = -(k1 == 'shu'? 0 : k1) * (this.p1.x + this.p2.x) / 2 + (this.p1.y + this.p2.y) / 2
        b2 = -(k2 == 'shu'? 0 : k2) * (this.p1.x + this.p3.x) / 2 + (this.p1.y + this.p3.y) / 2
        if(k1 != 'shu' && k1 != 0 && k2 != 0 && k2 != 'shu' )
            this.center = new Points((b2 - b1) / (k1 - k2), k1 * ((b2 - b1) / (k1 - k2)) + b1)
        else if(k1 == 'shu' && k2 != 'shu' && k2 != 0 ){
            let y = (this.p1.y + this.p2.y) / 2
            this.center = new Points((y - b2) /k2,y)
        }else if(k1 != 'shu' && k2 == 'shu' && k1 != 0 ){
            let y = (this.p1.y+this.p3.y) / 2
            this.center = new Points((y - b1) /k1,y)
        }else if(k1 == 0 && k2 != 'shu' ){
            let x = (this.p1.x + this.p2.x) / 2
            this.center = new Points(x, k2 * x + b2)
        }else if (k2 == 0 && k1 != 'shu'){
            let x = (this.p1.x + this.p3.x) / 2
            this.center = new Points(x,k1 * x + b1)
        }else if(k1 == 0 && k2 == 'shu'){
            this.center = new Points((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p3.y) / 2)
        }else if (k2 == 0 && k1 == 'shu'){
            this.center = new Points((this.p1.x + this.p3.x) / 2, (this.p1.y + this.p2.y) / 2)
        }else if (k1=='shu' && k2=='shu'){
            this.center = new Points(this.p1.x, (this.p1.y + this.p2.y) / 2)
        }else if (k1 == 0 && k2 == 0){
            this.center = new Points((this.p1.x + this.p2.x) / 2, this.p1.y)
        }
        let lx = this.center.x - this.p1.x,
        ly = this.center.y - this.p1.y
        // try{
        //     lx=this.center.x-this.p1.x,
        //     ly=this.center.y-this.p1.y
        // }catch(e){
        //     console.log(e)
        // }
        
        this.radius=Math.sqrt(lx * lx + ly * ly)
    },
    // cycle:function(){
    //     var EPSILON = 1.0 / 1048576.0;
    //     var x1 = this.p1.x,
    //     y1 = this.p1.y,
    //     x2 = this.p2.x,
    //     y2 = this.p2.y,
    //     x3 = this.p3.x,
    //     y3 = this.p3.y,
    //     fabsy1y2 = Math.abs(y1 - y2),
    //     fabsy2y3 = Math.abs(y2 - y3),
    //     xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    //     /* Check for coincident points */
    //     if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
    //     throw new Error("Eek! Coincident points!");

    //     if(fabsy1y2 < EPSILON) {
    //     m2  = -((x3 - x2) / (y3 - y2));
    //     mx2 = (x2 + x3) / 2.0;
    //     my2 = (y2 + y3) / 2.0;
    //     xc  = (x2 + x1) / 2.0;
    //     yc  = m2 * (xc - mx2) + my2;
    //     }

    //     else if(fabsy2y3 < EPSILON) {
    //     m1  = -((x2 - x1) / (y2 - y1));
    //     mx1 = (x1 + x2) / 2.0;
    //     my1 = (y1 + y2) / 2.0;
    //     xc  = (x3 + x2) / 2.0;
    //     yc  = m1 * (xc - mx1) + my1;
    //     }

    //     else {
    //     m1  = -((x2 - x1) / (y2 - y1));
    //     m2  = -((x3 - x2) / (y3 - y2));
    //     mx1 = (x1 + x2) / 2.0;
    //     mx2 = (x2 + x3) / 2.0;
    //     my1 = (y1 + y2) / 2.0;
    //     my2 = (y2 + y3) / 2.0;
    //     xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
    //     yc  = (fabsy1y2 > fabsy2y3) ?
    //         m1 * (xc - mx1) + my1 :
    //         m2 * (xc - mx2) + my2;
    //     }

    //     dx = x2 - xc;
    //     dy = y2 - yc;
    //     this.center = new Points(xc,yc)
    //     this.radius = Math.sqrt(dx * dx + dy * dy)
    //     // return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
    // },
    inCycle:function(p){
        let x = p.x - this.center.x,
        y = p.y - this.center.y
        return Math.sqrt(x * x + y *y) <= this.radius
    },
    rightSide:function(p){
        return this.center.x + this.radius < p.x
    },
    getColorPos:function(){
        let x = (this.p1.x + this.p2.x + this.p3.x) / 3,
        y = (this.p1.y + this.p2.y + this.p3.y) / 3
        return new Points(x,y)
    },
    copyColor:function(color){
        this.color = color
        return this
    }
}

function superTriangle(dom){
    var p1,p2,p3
    p1 = new Points(dom.width / 2,-dom.height * 10)
    p2 = new Points(-dom.width * 9,dom.height * 10)
    p3 = new Points(dom.width * 10,dom.height * 10)
    return new Triangle(p1,p2,p3)
}

function MakeLowPoly(dom,ctx,points,color){
    var angle = [],temporaryEdge = [],temporaryAngle = []//,points=[]
    var sup = superTriangle(dom),
    angleFinal = [],flag = true
    angle.push(sup)
    // for(let i=0;i<100;i++){
    //     points.push(new Points(~~(Math.random()*dom.width),~~(Math.random()*dom.height)))
    // }
    // points.push(new Points(0,0),new Points(0,dom.height),new Points(dom.width,dom.height),new Points(dom.width,0))


    // points.push(new Points(42,226),new Points(420,270),new Points(338,281))//（42，226），（338，281），（420，270）
    // points.forEach(function(vertex) {
    //     ctx.beginPath();
    //     ctx.arc(vertex.x, vertex.y, 1, 0, Math.PI * 2, true);
    //     ctx.closePath();
    //     ctx.fillStyle = '#000';
    //     ctx.fill();
    // });
    points.forEach((point) => {
        angle = angle.filter((i)=>{
            if(i.radius == 'delete'){
                return false
            }
            if(i.inCycle(point)){
                temporaryEdge.push(new Edge(i.p1,i.p2),new Edge(i.p1,i.p3),new Edge(i.p2,i.p3))
                // temporaryAngle.push(i)
                return false
            }
            return true
        })
        ctx.clearRect(0, 0, dom.width, dom.height);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();
        temporaryAngle.forEach(x=>{
            ctx.beginPath();
            ctx.moveTo(x.p1.x, x.p1.y);
            ctx.lineTo(x.p2.x, x.p2.y);
            ctx.lineTo(x.p3.x, x.p3.y);
            ctx.closePath();
            ctx.strokeStyle = '#000';
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(x.center.x, x.center.y, x.radius, 0, Math.PI*2, true );
            ctx.closePath();
            ctx.strokeStyle = '#9dd';
            ctx.stroke();
        })
        temporaryEdge = uniqueEdge(temporaryEdge)
        for(let i of temporaryEdge){
            var a = new Triangle(i.p1,i.p2,point)
            angle.push(a)
            var pos = a.getColorPos()
            head = (~~pos.y * dom.width + ~~pos.x)*4
            a.color = `rgba(${color[head]},${color[head + 1]},${color[head + 2]},${color[head + 3]})`
        }
        // ctx.clearRect(0, 0, dom.width, dom.height);
        // angle.forEach((x,index)=>{
        //     ctx.beginPath();
        //     ctx.moveTo(x.p1.x, x.p1.y);
        //     ctx.lineTo(x.p2.x, x.p2.y);
        //     ctx.lineTo(x.p3.x, x.p3.y);
        //     ctx.closePath();
        //     ctx.strokeStyle = '#000';
        //     ctx.stroke();
            
        //     if(index>=angle.length-temporaryEdge.length){
        //         ctx.beginPath();
        //         ctx.arc(x.center.x, x.center.y, x.radius, 0, Math.PI*2, true );
        //         ctx.closePath();
        //         ctx.strokeStyle = '#9dd';
        //         ctx.stroke();
        //     }
        // })
        temporaryEdge = []
        // temporaryAngle=[]
    })
    
    for(let i in angle){
        for(let j = 1; j <= 3; j++){
            for(let k = 1; k <= 3; k++){
                if(angle[i]['p'+j].check(sup['p'+k])){
                    flag = false
                    break
                }
            }
            if(!flag)
                break
        }
        if(flag)
            angleFinal.push(angle[i])
        flag=true
    }
    // console.log(points)
    return angleFinal
    // return angle
}

//quick
function MakeLowPoly1(dom, ctx, points, color){
    var angle = [],temporaryEdge = [], temporaryAngle = []
    var sup = superTriangle(dom),angleFinal = [], flag = true, checkTriangle = 1
    angle.push(sup)
    points = points.sort((a, b) => {
        return a.x - b.x
    })
    points.forEach((point, index) => {
        for(let i = 0; i < checkTriangle; i++){
            var tem = angle[i]
            if(tem.radius == 'delete'){
                angle.splice(i, 1)
                checkTriangle--
                i--
            }else if(tem.inCycle(point)){
                tem = angle.splice(i, 1)[0]
                checkTriangle--
                i--
                temporaryEdge.push(new Edge(tem.p1, tem.p2), new Edge(tem.p1, tem.p3), new Edge(tem.p2, tem.p3))
                // temporaryAngle.push(tem)
            }else if(tem.rightSide(point)){
                let end = new Triangle(angle[checkTriangle - 1].p1, angle[checkTriangle - 1].p2, angle[checkTriangle - 1].p3).copyColor(angle[checkTriangle - 1].color)
                angle[checkTriangle - 1] = new Triangle(tem.p1, tem.p2, tem.p3).copyColor(tem.color)
                angle[i] = end
                checkTriangle--
                i--
            }
        }

        temporaryEdge = uniqueEdge(temporaryEdge)
        for(let i of temporaryEdge){
            var a = new Triangle(i.p1,i.p2,point)
            angle.splice(checkTriangle - 1, 0, a)
            checkTriangle++
            var pos = a.getColorPos()
            head = (~~pos.y * dom.width + ~~pos.x) * 4
            // var gray = (color[head] + color[head + 1] + color[head + 2]) / 3
            // a.color = `rgba(${gray},${gray},${gray},${color[head + 3]})`
            a.color = `rgba(${color[head]},${color[head + 1]},${color[head + 2]},${color[head + 3]})`
        }

        temporaryEdge = []
    })

    for(let i in angle){
        for(let j = 1; j <= 3; j++){
            for(let k = 1; k <= 3; k++){
                if(angle[i]['p'+j].check(sup['p'+k])){
                    flag = false
                    break
                }
            }
            if(!flag)
                break
        }
        if(flag)
            angleFinal.push(angle[i])
        flag=true
    }
    return angleFinal
}

function uniqueEdge(edges){
    var result=[],flag=true
    for(let i = 0; i < edges.length; i++){
        for(let j = 0; j < edges.length; j++){
            if(i != j && edges[i].check(edges[j])){
                flag=false
                break
            }
        }
        flag && result.push(edges[i])
        flag = true
    }
    return result
}

