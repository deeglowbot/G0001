var mapList=new Array();
var mapCurrentIndex=0;

var World_CurLocation=1

var worldMap = new Object();
worldMap.img = new Image();
worldMap.img.ready = false;
worldMap.img.onload= setAssetReady;
worldMap.img.src="img/IMG_0601.JPG"

worldMap.x=700;
worldMap.y=700;

var WORLD_CANVAS=2;


function Map_Add(imgPath, type,width,height, charSpawnPoints)
{
	var index=mapList.length;
	mapList[index].img = new Image();
	mapList[index].img.ready = false;
	mapList[index].img.onload= setAssetReady;
	mapList[index].img.src="img/IMG_0601.JPG"
	mapList[index].x=0;
	mapList[index].y=0;
	mapList[index].width=width;
	mapList[index].height=height;
	mapList[index].box=new Object();
	mapList[index].box.x=200;
	mapList[index].box.y=200;
	mapList[index].box.next_x=200;
	mapList[index].box.next_y=200;
	mapList[index].box.width=width-400;
	mapList[index].box.height=height-400;

}
function Map_DetectCharCollision(character)
{
	if(character.next_y <= mapList[mapCurrentIndex].box.y)
			{
				mapList[index].box.next_y=character.next_y;
				character.next_y=character.cur_y;
			}
			//east
			if(character.next_x >= mapList[mapCurrentIndex].box.x+mapList[mapCurrentIndex].box.width)
			{
				mapList[index].box.next_x=character.next_x;
				character.next_x=character.cur_x;
			}
			//south
			if(character.next_y >= mapList[mapCurrentIndex].box.y+mapList[mapCurrentIndex].box.height)
			{
				mapList[index].box.next_y=character.next_y;
				character.next_y=character.cur_y;
			}
			//west
			if(character.next_x <= mapList[mapCurrentIndex].box.x)
			{
				mapList[index].box.next_x=character.next_x;
				character.next_x=character.cur_x;
			}
}
function World_DrawMap(context)
{
	context.drawImage(mapList[mapCurrentIndex].img,
		mapList[mapCurrentIndex].x,
		mapList[mapCurrentIndex].y,
		mapList[mapCurrentIndex].width,
		mapList[mapCurrentIndex].height,
			0,0,
		mapList[mapCurrentIndex].width,
		mapList[mapCurrentIndex].height);
}