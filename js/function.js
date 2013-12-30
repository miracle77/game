//对get的地址解析获取游戏难度rank参数
var rank='';
var url=window.location.search;
if(url.indexOf("?")!=-1)   
{   
  var str=url.substr(1)   
  strs = str.split("&");   
  for(i=0;i<strs.length;i++)   
  {   
    if([strs[i].split("=")[0]]=='rank') rank=unescape(strs[i].split("=")[1]);
  }   
}

//获取画图区域
var context=document.getElementById('jigsaw').getContext('2d');

//创建图片
var img=new Image();
img.src='./picture/1.jpg';
img.addEventListener('load',move,false);//事件监听

//取得图像大小和分成的块数
var size=document.getElementById('jigsaw').width;
var unit=size/rank;//unit为每个分块的大小

//创建两个object（当前鼠标箭头以及空白图片），记录它们的位置
var cur=new Object;var blank=new Object;
cur.x=cur.y=blank.x=blank.y=0;

//初始化
var flag=false,step=0,map=new Object;//flag是拼图是否完成的标志
init();
//追踪鼠标划过的区域  
document.getElementById('jigsaw').onmousemove=function(e){
  cur.x=Math.floor((e.pageX-this.offsetLeft)/unit);
  cur.y=Math.floor((e.pageY-this.offsetTop)/unit);
};

//追踪鼠标点击的区域
document.getElementById('jigsaw').onclick=function()
{
  if (adjacent(cur,blank)) //判断当前想要移动的方块与空白方块是否相邻，相邻则可以移动
  {
    step++;//记录步数
    update(cur,blank);
    move();
  }
  if(flag)	alert("恭喜你成功了！共用"+step+"步");
};

//初始化画布，将画布上每小块的位置填充进二维数组
function init() 
{
  map=new Array(rank);
  for(var i=0;i<rank;++i)
  {
    map[i]=new Array(rank);
    for (var j=0;j<rank;++j)
    {
      map[i][j]=new Object;
      map[i][j].x=(rank-1)-i;
      map[i][j].y=(rank-1)-j;
    }
  }
  blank.x=map[rank-1][rank-1].x;
  blank.y=map[rank-1][rank-1].y;
  flag=false;
}

//移动图片
function move()
{
  context.clearRect(0,0,size,size);
  var i,j,x,y;
  for (i=0;i<rank;++i)
  {
    for(j=0;j<rank;++j)
    {
      x=map[i][j].x;
      y=map[i][j].y;
      if(i!=blank.x||j!=blank.y||flag==true)
      {
        context.drawImage(img,x*unit,y*unit,unit,unit,i*unit,j*unit,unit,unit);
      }
    }
  }
}

//判断图片是否可移动的方法
function adjacent(cur,blank)
{
  if (Math.abs(cur.x-blank.x)+Math.abs(cur.y-blank.y)==1)	//判断当前方块与空白方块是否相邻
  return true;
  else
  return false;
}

//移动拼图相关方法
function update(now,des)
{
  if (!flag) 
  {
    map[des.x][des.y].x=map[now.x][now.y].x;
    map[des.x][des.y].y=map[now.x][now.y].y;
    map[now.x][now.y].x=rank-1;
    map[now.x][now.y].y=rank-1;
    des.x=now.x;
    des.y=now.y;
    check();
  }
}

//检查拼图是否完成
function check()
{
  var i,j;
  for(i=0;i<rank;++i)
  	for(j=0;j<rank;++j)
    {
      if(map[i][j].x!=i||map[i][j].y!=j)
      {
      	flag=false;
      	return;
      }
    }
  flag=true;
}

