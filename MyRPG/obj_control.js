
var objList=new Array();

var OBJ_BG=10;
var OBJ_MID=20;
var OBJ_FG=30;

var OBJ_SMALL=50,
	OBJ_MEDIUM=100,
	OBJ_LARGE=200,
	OBJ_LONG=500;

//Obj_Add(imgPath,         depth,    x,  y,width,height)
Obj_Add(PATH_BLDG_HOUSE001,OBJ_MID,600,200,OBJ_LARGE,  OBJ_LARGE,"house",Obj_OnClickDefault);

Obj_Add(PATH_FG_MESH,OBJ_FG,100,200,70,100,"forground mesh",Obj_OnClickDefault);

Obj_Add(PATH_FG_MESH,OBJ_BG,100,500,70,100,"background mesh",Obj_ToggleSouthBox);

function Obj_DrawAll_bg(context)
{
	//draw only the background objects
	for(var i=0;i<objList.length;i++)
	{
		if(objList[i].depth==OBJ_BG)
		{
			context.drawImage(objList[i].img,0,0,
					objList[i].width,objList[i].height,
					objList[i].x,objList[i].y,
					objList[i].width,objList[i].height);
		}
	}
}

function Obj_DrawAll_mid(context)
{
	//draw only the the middle ones
	for(var i=0;i<objList.length;i++)
	{
		if(objList[i].depth==OBJ_MID)
		{
			context.drawImage(objList[i].img,0,0,
					objList[i].width,objList[i].height,
					objList[i].x,objList[i].y,
					objList[i].width,objList[i].height);
		}
	}
}

function Obj_DrawAll_fg(context)
{
	//draw only the forground ones
	for(var i=0;i<objList.length;i++)
	{
		if(objList[i].depth==OBJ_FG)
		{
			context.drawImage(objList[i].img,0,0,
					objList[i].width,objList[i].height,
					objList[i].x,objList[i].y,
					objList[i].width,objList[i].height);
		}
	}
}

function Obj_Add(imgPath,depth,x,y,width,height,name,onclickfunction)
{
	var index=objList.length;
	objList[index]=new Object();
	objList[index].img=new Image();
	objList[index].img.onload=img_setAssetReady;
	objList[index].img.src=imgPath;

	objList[index].depth=depth;

	objList[index].x=x;
	objList[index].y=y;

	objList[index].width=width;
	objList[index].height=height;
	
	objList[index].name=name;
	
	objList[index].onclickfunction=onclickfunction;
}

function Obj_UpdateByOffset(x_offset,y_offset)
{
	for(var i=0;i<objList.length;i++)
	{
		objList[i].x = objList[i].x + x_offset-0;
		objList[i].y =objList[i].y + y_offset-0;
	}
}

//-------------Actions for Objects

function Obj_OnClickDefault(index)
{
	alert(objList[index].name);
	
}

function Obj_ToggleSouthBox(index)
{
	screen.southBox.open= !screen.southBox.open;
}