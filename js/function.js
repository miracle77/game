//��get�ĵ�ַ������ȡ��Ϸ�Ѷ�rank����
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

//��ȡ��ͼ����
var context=document.getElementById('jigsaw').getContext('2d');

//����ͼƬ
var img=new Image();
img.src='./picture/1.jpg';
img.addEventListener('load',move,false);//�¼�����

//ȡ��ͼ���С�ͷֳɵĿ���
var size=document.getElementById('jigsaw').width;
var unit=size/rank;//unitΪÿ���ֿ�Ĵ�С

//��������object����ǰ����ͷ�Լ��հ�ͼƬ������¼���ǵ�λ��
var cur=new Object;var blank=new Object;
cur.x=cur.y=blank.x=blank.y=0;

//��ʼ��
var flag=false,step=0,map=new Object;//flag��ƴͼ�Ƿ���ɵı�־
init();
//׷����껮��������  
document.getElementById('jigsaw').onmousemove=function(e){
  cur.x=Math.floor((e.pageX-this.offsetLeft)/unit);
  cur.y=Math.floor((e.pageY-this.offsetTop)/unit);
};

//׷�������������
document.getElementById('jigsaw').onclick=function()
{
  if (adjacent(cur,blank)) //�жϵ�ǰ��Ҫ�ƶ��ķ�����հ׷����Ƿ����ڣ�����������ƶ�
  {
    step++;//��¼����
    update(cur,blank);
    move();
  }
  if(flag)	alert("��ϲ��ɹ��ˣ�����"+step+"��");
};

//��ʼ����������������ÿС���λ��������ά����
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

//�ƶ�ͼƬ
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

//�ж�ͼƬ�Ƿ���ƶ��ķ���
function adjacent(cur,blank)
{
  if (Math.abs(cur.x-blank.x)+Math.abs(cur.y-blank.y)==1)	//�жϵ�ǰ������հ׷����Ƿ�����
  return true;
  else
  return false;
}

//�ƶ�ƴͼ��ط���
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

//���ƴͼ�Ƿ����
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

