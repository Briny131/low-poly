function poisson(width,height,radius){
    const gen2=2**(1/2)
    const gridWidth=radius/gen2
    const gridWNum=Math.ceil(width/gridWidth)
    const gridHNum=Math.ceil(height/gridWidth)
    const count=30
    var grid=[]
    var points=[]
    var red=0
    var black=0

    return function(){
        function far(x,y){
            var W = ~~(x / gridWidth)
            var H = ~~(y / gridWidth)
            var x0 = Math.max(W - 2, 0)
            var y0 = Math.max(H - 2, 0)
            var x1 = Math.min(W + 3, gridWNum)
            var y1 = Math.min(H + 3, gridHNum)
            for(let i = x0; i <= x1; i++){
                for(let j = y0; j <= y1; j++){
                    var u = j * gridWNum + i
                    if(grid[u]){
                        var dx = grid[u].x - x
                        var dy = grid[u].y - y
                        if(dx * dx + dy * dy < radius * radius) return false
                    }
                }
            }
            return true
        }
        function addPoint(x,y){
            var p=new Points(x,y)
            points.splice(red,0,p)
            red++
            grid[~~(y / gridWidth) * gridWNum + ~~(x / gridWidth)] = p
            // ctx.beginPath();
            // ctx.arc(p.x, p.y, 1, 0, Math.PI * 2, true);
            // ctx.closePath();
            // ctx.fillStyle = '#f00';
            // ctx.fill();
            // ctx.beginPath();
            // ctx.arc(p.x, p.y, 30, 0, Math.PI*2, true );
            // ctx.closePath();
            // ctx.strokeStyle = '#9dd';
            // ctx.stroke();
        }

        if(!red){
            addPoint(~~(Math.random()*width),~~(Math.random()*height))
            // addPoint(0,0)
        }
        while(red){
            var i = Math.random() * red | 0
            var flag = false
            for(let j = 0; j < count; j++){
                var long = radius + ~~(radius * Math.random())
                var Deg = Math.random() * 2 * Math.PI
                var dx = ~~(Math.cos(Deg)*long) + points[i].x
                var dy = ~~(Math.sin(Deg)*long) + points[i].y
                if(dx >= 0 && dx <= width && dy >= 0 && dy <= height && far(dx,dy)){
                    addPoint(dx,dy)
                    flag = true
                    break;
                }
            }
            if(!flag){
                black++;
                red--
                var polo=points[i]
                // ctx.beginPath();
                // ctx.arc(polo.x, polo.y, 1, 0, Math.PI * 2, true);
                // ctx.closePath();
                // ctx.fillStyle = '#0f0';
                // ctx.fill();
                points[i] = points[red]
                points[red] = polo
                flag=false
            }
        }
        points.push(new Points(0, 0),
        new Points(width, 0),
        new Points(0, height),
        new Points(width, height))
        console.log(points.length)
        return points
        
    }
}

function Random(width, height, count){
    var points = []
    for(let i = 0; i < count; i++){
        points.push(new Points(~~(Math.random() * width),~~(Math.random() * height)))
    }
    points.push(new Points(0, 0),
    new Points(width,0),
    new Points(0,height),
    new Points(width,height))
    return points
}