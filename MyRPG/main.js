
//-----------------------------------------------------------
// System Vars
//-----------------------------------------------------------



var screen=new Object();
screen.main=new Object();
screen.width=STAGE_WIDTH;
screen.height=STAGE_HEIGHT;
screen.southBox=new Object();
screen.southBox.open=false;
screen.southBox.height=STAGE_INFO_BOX_HEIGHT;
screen.southBox.text="some default text.";
screen.southBox.text_xoffset=30;
screen.southBox.hasPicture=false;

var gameCanvas= document.getElementById("gameCanvas");
gameCanvas.width=STAGE_WIDTH;
gameCanvas.height=screen.height;

var ctx = gameCanvas.getContext("2d");
ctx.fillStyle="black";
ctx.font=GAME_FONTS;


//var gameloop=setInterval(update,TIME_PER_FRAME);
//var counter=0;


//-----------------------------------------------------------
//Preloading ...
//-----------------------------------------------------------
//Preload Art Assets
 
var bgImg_main= new Image();
bgImg_main.ready=false;
bgImg_main.onload=img_setAssetReady;
bgImg_main.src=PATH_BGIMG_MAIN;


//Display Preloading

ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);

ctx.fillStyle = "#550";

ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);

var preloader = setInterval(preloading, TIME_PER_FRAME);


var gameloop, facing, currX, currY, charX, charY, isMoving;


function preloading()
{
	if (img_ScreenIsReady())
	{
		clearInterval(preloader);

		//Initialise game
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;

		gameloop = setInterval(update, TIME_PER_FRAME);
		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);
	}
}


//-----------------------------------------------------------
//Key Handlers
//-----------------------------------------------------------

function keyDownHandler(event)
{
//make an array of button inputs
//if a button is pressed and it's not already in the array add it
//
	
	var keyPressed = String.fromCharCode(event.keyCode);
	Char_UpdateMainKeyPressed(keyPressed);
}


function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	Char_UpdateMainKeyUp(keyPressed);
}

//--------------------------
// Game Loop
//--------------------------

function update()
{
	//clearCanvas(2);
	Char_UpdateNextPositions();
	Detect_Collisions();
	Map_DetectCharCollision(charList[mainCharIndex]);
	Map_UpdatePositions();//shifts everything over by offset
	Char_UpdatePositions();

	

	Map_DrawMap(ctx);

	Obj_DrawAll_bg(ctx);
	Obj_DrawAll_mid(ctx);
    
	Char_DrawAll(ctx);
	Obj_DrawAll_fg(ctx);
	
	Map_DrawTextBoxes(ctx);
}



//----------------------------------------
// Collision detection
//----------------------------------------

function Detect_Collisions()
{
	
	for(var i=0; i < charList.length;i++)
	{
		//detect the edge of the map
		//north
		if(charList[i].next_y+mapList[mapCurrentIndex].y-mapList[mapCurrentIndex].box.thickness <= 0)
		{
			charList[i].next_y=charList[i].cur_y;
		}
		//east
		if(mapList[mapCurrentIndex].x+charList[i].next_x+charList[i].width >= mapList[mapCurrentIndex].width-mapList[mapCurrentIndex].box.thickness)
		{
			charList[i].next_x=charList[i].cur_x;
		}
		//south
		if(mapList[mapCurrentIndex].y+charList[i].next_y+charList[i].width >= mapList[mapCurrentIndex].height-mapList[mapCurrentIndex].box.thickness)
		{
			charList[i].next_y=charList[i].cur_y;
		}
		//west
		if(charList[i].next_x+mapList[mapCurrentIndex].x-mapList[mapCurrentIndex].box.thickness <= 0)
		{
			charList[i].next_x=charList[i].cur_x;
		}

		//detect other characters
		for(var j=0; j < charList.length;j++)
		{
			if(j!=i)
			{
				if(BoxCollision(charList[i].next_x,charList[i].next_y,
					charList[i].next_x+charList[i].width,charList[i].next_y+charList[i].height,
					charList[j].next_x,charList[j].next_y,
					charList[j].next_x+charList[j].width,charList[j].next_y+charList[j].height))
				{
					charList[i].next_x=charList[i].cur_x;
					charList[i].next_y=charList[i].cur_y;
				}
			}
		}
		//detect objects
		for(var j=0; j < objList.length;j++)
		{
			if(objList[j].depth==OBJ_MID)
			{
				if(BoxCollision(charList[i].next_x,charList[i].next_y,
						charList[i].next_x+charList[i].width,charList[i].next_y+charList[i].height,
						objList[j].x,objList[j].y,
						objList[j].x+objList[j].width,objList[j].y+objList[j].height))
				{
					charList[i].next_x=charList[i].cur_x;
					charList[i].next_y=charList[i].cur_y;
				}
			}
		}

	}

}

function BoxCollision(ax1,ay1, ax2,ay2, bx1,by1, bx2,by2)
{
	if(ax2>=bx1 && ax1 <= bx2 &&
		ay2>=by1 && ay1<=by2)
	{
		return true;
	}
	else
	{
		return false;
	}
}

