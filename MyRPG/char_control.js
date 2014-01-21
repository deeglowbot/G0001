
//var default_char_loaded=false;
var charList=new Array();
//var npcList=new Array();

var CHAR_NPC_1_NAME="steve";
var CHAR_NPC_2_NAME="jim";
var CHAR_NPC_3_NAME="tom";

var CHAR_MAIN_NAME="Edwin";

var CHAR_NPC="npc";
var CHAR_MAIN="main"


//Char_Add(imgPath, type, initial_x, initial_y, width, height, enabled)
//default sprite
//Char_Add(PATH_CHAR_NPC001, "default", 500, 100, CHAR_WIDTH, CHAR_HEIGHT, true);


//NPCs
Char_Add(PATH_CHAR_NPC001, CHAR_NPC, 500, 100, CHAR_WIDTH, CHAR_HEIGHT, true,CHAR_NPC_1_NAME,Char_DefaultAction);
Char_Add(PATH_CHAR_NPC002, CHAR_NPC, 500, 200, CHAR_WIDTH, CHAR_HEIGHT, true,CHAR_NPC_2_NAME,Char_DefaultAction);
Char_Add(PATH_CHAR_NPC003, CHAR_NPC, 500, 300, CHAR_WIDTH, CHAR_HEIGHT, true,CHAR_NPC_3_NAME,Char_DefaultAction);

//main character
var mainCharIndex;
Char_Add(PATH_CHAR_MAIN, CHAR_MAIN, 250, 250, CHAR_WIDTH, CHAR_HEIGHT, true,"Stevey Sue",Char_DefaultAction);



function Char_DrawAll(context)
{
	for(var i=0; i<charList.length;i++)
	{
		if(charList[i].enabled)
		{

			if(charList[i].img.ready==true)
			{
				context.drawImage(charList[i].img,
					charList[i].inner_x,charList[i].inner_y,
					charList[i].width,charList[i].height,
					charList[i].cur_x,charList[i].cur_y,
					charList[i].width,charList[i].height);
			}
			else
			{
				context.fillStyle = "blue";
				context.fillRect(charList[i].cur_x, charList[i].cur_y, charList[i].width, charList[i].height);
			}
		}
	}
}

function Char_Add(imgPath,type,initial_x,initial_y,width,height,enabled,name,OnClickFunction)
{
	var index=charList.length;
	charList[index]=new Object();
	charList[index].type=type;
	if(type=="main")
	{
		mainCharIndex=index;
	}
	charList[index].img=new Image();
	charList[index].img.ready = false;
	charList[index].img.onload = img_setAssetReady;
	charList[index].img.src = imgPath;

	charList[index].initial_X=initial_x;
	charList[index].initial_Y=initial_y;

	charList[index].cur_x=initial_x;
	charList[index].cur_y=initial_y;
	charList[index].next_x=initial_x;
	charList[index].next_y=initial_y;

	charList[index].width=width;
	charList[index].height=height;

	charList[index].enabled=enabled;

	charList[index].inner_x=0;
	charList[index].inner_y=0;	

	charList[index].direction=new Array();
	charList[index].direction[0]=0;
	charList[index].direction[1]=0;
	charList[index].direction[2]=0;
	charList[index].direction[3]=0;
	charList[index].facing=SOUTH;
	charList[index].onclickfunction=OnClickFunction;

	if(type=="npc")
	{
		Char_PickDirection(charList[index]);
	}

//	if(type=="npc_random")
//	{
//		var npcIndex=npcList.length;
//		npcList[npcIndex]=new Object();
//		npcList[npcIndex].name=name;
//		npcList[npcIndex].
//	}
}

//------------------------------------
// Movement
//------------------------------------
function Char_PickDirection(character)
{
	character.direction[0]=0;
	character.direction[1]=0;
	character.direction[2]=0;
	character.direction[3]=0;
	var newDirection=Math.floor(Math.random() * 20)
	if(newDirection<4)
	{
		character.direction[newDirection]=1;
	
		if(newDirection==NORTH)
		{
			character.facing = NORTH;
			character.inner_y=IMAGE_START_NORTH_Y;
		}
		else if(newDirection==EAST)
		{
			character.facing = EAST;
			character.inner_y=IMAGE_START_EAST_Y;
		}
		else if(newDirection==SOUTH)
		{
			character.facing = SOUTH;
			character.inner_y=IMAGE_START_SOUTH_Y;
		}
		else if(newDirection==WEST)
		{
			character.facing = WEST;
			character.inner_y=IMAGE_START_WEST_Y;
		}
	}
	character.waitTotal=Math.floor(Math.random() * 20)+10;
	character.waitCount=0;
}
function Char_UpdateNextPositions()
{
	for(var i=0; i < charList.length;i++)
	{
		if(charList[i].type=="npc")
		{
			//move forward based on the direction and wait total
			charList[i].waitCount++;
			if(charList[i].waitCount >= charList[i].waitTotal)
			{
				Char_PickDirection(charList[i]);
			}
		}
		if(charList[i].direction[NORTH]>0 ||
			charList[i].direction[EAST]>0 ||
			charList[i].direction[SOUTH]>0 ||
			charList[i].direction[WEST]>0 )
		{
			charList[i].inner_x += CHAR_WIDTH;
			if (charList[i].inner_x >= SPRITE_WIDTH)
			{
				charList[i].inner_x = 0;
			}
		}
		charList[i].next_y -= (charList[i].direction[NORTH]*CHAR_SPEED);
		charList[i].next_x += (charList[i].direction[EAST]*CHAR_SPEED);
		charList[i].next_y += (charList[i].direction[SOUTH]*CHAR_SPEED);
		charList[i].next_x -= (charList[i].direction[WEST]*CHAR_SPEED);
	}
}
function Char_UpdatePositions()
{
	for(var i=0; i < charList.length;i++)
	{
		charList[i].cur_y =charList[i].next_y;
		charList[i].cur_x =charList[i].next_x;
	}
}
function Char_UpdateByOffset(x_offset,y_offset)
{
	for(var i=0; i < charList.length;i++)
	{
		charList[i].cur_x = charList[i].cur_x + x_offset - 0;
		charList[i].next_x = charList[i].next_x + x_offset - 0;

		charList[i].cur_y = charList[i].cur_y + y_offset - 0;
		charList[i].next_y = charList[i].next_y + y_offset - 0;
	}
}

function Char_UpdateMainKeyPressed(keyPressed)
{
	if(keyPressed == "J")
	{
		Char_ActionClick();
	}
	if (keyPressed == "W")
	{
		charList[mainCharIndex].facing = NORTH;
		charList[mainCharIndex].inner_y=IMAGE_START_NORTH_Y;
		charList[mainCharIndex].direction[NORTH]=1;
	}
	else if (keyPressed == "D")
	{
		charList[mainCharIndex].facing = EAST;
		charList[mainCharIndex].inner_y=IMAGE_START_EAST_Y;
		charList[mainCharIndex].direction[EAST]=1;
	}
	else if (keyPressed == "S")
	{	
		charList[mainCharIndex].facing = SOUTH;
		charList[mainCharIndex].inner_y=IMAGE_START_SOUTH_Y;
		charList[mainCharIndex].direction[SOUTH]=1;
	}
	else if (keyPressed == "A")
	{	
		charList[mainCharIndex].facing = WEST;
		charList[mainCharIndex].inner_y=IMAGE_START_WEST_Y;
		charList[mainCharIndex].direction[WEST]=1;
	}
}
function Char_UpdateMainKeyUp(keyPressed)
{
	if (keyPressed == "W")
	{
		charList[mainCharIndex].direction[NORTH]=0;
	}
	else if (keyPressed == "D")
	{
		charList[mainCharIndex].direction[EAST]=0;
	}
	else if (keyPressed == "S")
	{
		charList[mainCharIndex].direction[SOUTH]=0;
	}
	else if (keyPressed == "A")
	{
		charList[mainCharIndex].direction[WEST]=0;
	}
}

function Char_ActionClick()
{
	var x1,y1,x2,y2;
	if(charList[mainCharIndex].facing==NORTH)
	{
		x1=charList[mainCharIndex].cur_x;
		y1=charList[mainCharIndex].cur_y-CHAR_HEIGHT;
		x2=charList[mainCharIndex].cur_x+CHAR_WIDTH;
		y2=charList[mainCharIndex].cur_y;
	}
	if(charList[mainCharIndex].facing==EAST)
	{
		x1=charList[mainCharIndex].cur_x+CHAR_WIDTH;
		y1=charList[mainCharIndex].cur_y;
		x2=charList[mainCharIndex].cur_x+(2*CHAR_WIDTH);
		y2=charList[mainCharIndex].cur_y+CHAR_HEIGHT;
	}
	if(charList[mainCharIndex].facing==SOUTH)
	{
		x1=charList[mainCharIndex].cur_x;
		y1=charList[mainCharIndex].cur_y+CHAR_HEIGHT;
		x2=charList[mainCharIndex].cur_x+CHAR_WIDTH;
		y2=charList[mainCharIndex].cur_y+(2*CHAR_HEIGHT);
	}
	if(charList[mainCharIndex].facing==WEST)
	{
		x1=charList[mainCharIndex].cur_x-CHAR_WIDTH;
		y1=charList[mainCharIndex].cur_y;
		x2=charList[mainCharIndex].cur_x;
		y2=charList[mainCharIndex].cur_y+CHAR_HEIGHT;
	}
	var collided=false;
	for(var i=0; i < charList.length && !collided;i++)
	{
		if(i!=mainCharIndex)
		{
			if(BoxCollision(x1 ,y1, x2, y2, 
				charList[i].cur_x, charList[i].cur_y, 
				charList[i].cur_x+CHAR_WIDTH,charList[i].cur_y+CHAR_HEIGHT))
			{
				collided=true;

				var funcResult=charList[i].onclickfunction(i);
				
			//	else
			//	{
			//		Char_DefaultAction(charList[i],i);
			//	}
			}
		}
	}
	if(!collided)
	{
		for(var i=0; i < objList.length && !collided;i++)
		{
			if(BoxCollision(x1 ,y1, x2, y2, 
				objList[i].x, objList[i].y, 
				objList[i].x+objList[i].width,objList[i].y+objList[i].height))
			{
				collided=true;

				var funcResult=objList[i].onclickfunction(i);
				
			
			}
			
		}
	}
	
}
function Char_DefaultAction(i)
{
	//swap characters
	charList[mainCharIndex].type=CHAR_NPC;
	Char_PickDirection(charList[mainCharIndex]);

	charList[i].type=CHAR_MAIN;
	mainCharIndex=i;

	charList[i].direction[0]=0;
	charList[i].direction[1]=0;
	charList[i].direction[2]=0;
	charList[i].direction[3]=0;
	charList[i].waitTotal=0;
	charList[i].waitCount=0;
	
	return true;
}

function Char_DanePost()
{
	//$.ajax("POST", "the data you wanted", function (id) { alert ("Saved!") });
	var hi = $.ajax({
  type: "POST",
  url: "http://awssailsexample.elasticbeanstalk.com/SaveGame",
  data: "HI there dane",
  success: alert("hi")
});
	alert(hi);
}