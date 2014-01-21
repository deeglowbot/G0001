
var mapList=new Array();
var mapCurrentIndex=0;


var WORLD_CANVAS=2;
var tmp_spawnpoints=new Array();
tmp_spawnpoints[0]=new Object();
tmp_spawnpoints[0].x=250;
tmp_spawnpoints[0].y=250;

Map_Add("img/IMG_0601.JPG",WORLD_CANVAS,3264,2448,200,tmp_spawnpoints);

function Map_Add(imgPath, type,width,height,boxThickness, charSpawnPoints)
{
	var index=mapList.length;
	mapList[index]=new Object();
	mapList[index].img = new Image();
	mapList[index].img.ready = false;
	mapList[index].img.onload= img_setAssetReady;
	mapList[index].img.src="img/IMG_0601.JPG"
	mapList[index].x=500;
	mapList[index].y=500;
	mapList[index].x_offset=0;
	mapList[index].y_offset=0;
	mapList[index].width=width;
	mapList[index].height=height;
	mapList[index].box=new Object();
	mapList[index].box.thickness=boxThickness;
	mapList[index].box.x=boxThickness;
	mapList[index].box.y=boxThickness;
	mapList[index].box.width=STAGE_WIDTH-(2*boxThickness);
	mapList[index].box.height=STAGE_HEIGHT-(2*boxThickness);

}

function Map_DrawMap(context)
{
	context.drawImage(mapList[mapCurrentIndex].img,
		mapList[mapCurrentIndex].x,
		mapList[mapCurrentIndex].y,
		STAGE_WIDTH,
		STAGE_HEIGHT,
			0,0,
		STAGE_WIDTH,
		STAGE_HEIGHT);
	if(screen.southBox.open)
	{
		//draw the southbox
		context.fillStyle = "purple";
		context.fillRect(0, screen.height-screen.southBox.height, screen.width, screen.southBox.height);
	}
}
function Map_DrawTextBoxes(context)
{
	if(screen.southBox.open)
	{
		//draw the southbox
		context.fillStyle = "green";
		context.fillRect(0, screen.height-screen.southBox.height, screen.width, screen.southBox.height);
		context.fillStyle = "purple";
		context.fillRect(5, screen.height-screen.southBox.height+5, screen.width-10, screen.southBox.height-10);
		context.fillStyle="#000";
		context.fillText(screen.southBox.text, screen.southBox.text_xoffset, screen.height-screen.southBox.height+25);
	}
}

function Map_DetectCharCollision(character)
{
	mapList[mapCurrentIndex].x_offset=0;
	mapList[mapCurrentIndex].y_offset=0;

	tmp_x_offset = Math.abs(character.cur_x - character.next_x);
	tmp_y_offset = Math.abs(character.cur_y - character.next_y);
	
	if(tmp_x_offset>0)
	{
		//east
		if(character.next_x+character.width >= mapList[mapCurrentIndex].box.x+mapList[mapCurrentIndex].box.width)
		{
			var east_charEdgeOnMap = mapList[mapCurrentIndex].x+character.next_x+character.width;
			var east_mapEdge=mapList[mapCurrentIndex].width-mapList[mapCurrentIndex].box.thickness;
			if(east_charEdgeOnMap + tmp_x_offset >= east_mapEdge )
			{
				character.next_x=character.cur_x;
			}
			else
			{
				mapList[mapCurrentIndex].x_offset=tmp_x_offset*-1;
			}
		}
		//west
		if(character.next_x <= mapList[mapCurrentIndex].box.x)
		{
			if(mapList[mapCurrentIndex].x - tmp_x_offset <= 0)
			{
				character.next_x=character.cur_x;
			}
			else
			{
				mapList[mapCurrentIndex].x_offset=tmp_x_offset;
			}
		}
	}
	if(tmp_y_offset>0)
	{
		//north
		if(character.next_y <= mapList[mapCurrentIndex].box.y)
		{
			//if this is the top of the map, then stop
			var north_offset=tmp_x_offset*-1;
			if(mapList[mapCurrentIndex].y + north_offset <= 0)
			{
				character.next_y=character.cur_y;
			}
			else
			{
				mapList[mapCurrentIndex].y_offset=tmp_y_offset;
			}
		}
		//south
		if(character.next_y+character.height >= mapList[mapCurrentIndex].box.y+mapList[mapCurrentIndex].box.height)
		{
			var south_charEdgeOnMap = mapList[mapCurrentIndex].y+character.next_y+character.height;
			var south_mapEdge= mapList[mapCurrentIndex].height-mapList[mapCurrentIndex].box.thickness;
			if(south_charEdgeOnMap+tmp_y_offset >= south_mapEdge)
			{
				character.next_y=character.cur_y;
			}
			else
			{
				mapList[mapCurrentIndex].y_offset=tmp_y_offset*-1;
			}
		}
	}
}
function Map_UpdatePositions()
{
	if(mapList[mapCurrentIndex].x_offset !=0 || mapList[mapCurrentIndex].y_offset != 0)
	{
		
		Char_UpdateByOffset(mapList[mapCurrentIndex].x_offset,mapList[mapCurrentIndex].y_offset);
		Obj_UpdateByOffset(mapList[mapCurrentIndex].x_offset,mapList[mapCurrentIndex].y_offset);
		
		mapList[mapCurrentIndex].x = mapList[mapCurrentIndex].x - mapList[mapCurrentIndex].x_offset;
		mapList[mapCurrentIndex].y = mapList[mapCurrentIndex].y - mapList[mapCurrentIndex].y_offset;
	}
}