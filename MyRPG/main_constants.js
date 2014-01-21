//Constants.js


//--------------------------
// System Values
//--------------------------

var TIME_PER_FRAME = 33, //this equates to 30 fps
    GAME_FONTS="bold 20px sans-serif";

var COUNTER_X=100,
    COUNTER_Y=100;

//------------------------------------------------------------
// map info
//------------------------------------------------------------

var STAGE_WIDTH=1020,
    STAGE_HEIGHT=700,
	STAGE_INFO_BOX_HEIGHT=200;
	


var	NORTH_EDGE=110,
	EAST_EDGE=864,
	SOUTH_EDGE=494,
	WEST_EDGE=110;

var MAP=new Object();
	MAP.WORLD=1,
	MAP.TOWN1=2;



//------------------------------------------------------------
// Images and their details
//------------------------------------------------------------
var PATH_CHAR = "img/spritesheet_test.png";
var PATH_BGIMG_MAIN = "img/bg_default.png";

var PATH_CHAR_MAIN ="img/spritesheet_test.png";
var PATH_CHAR_NPC001 ="img/guySprite_01.png";
var PATH_CHAR_NPC002 ="img/guySprite_01.png";
var PATH_CHAR_NPC003 ="img/guySprite_01.png";

var PATH_BLDG_HOUSE001 = "img/building_01.png";
var PATH_FG_MESH = "img/mesh.png";

var BGIMG_MAIN_WIDTH=1020,
	BGIMG_MAIN_HEIGHT=700;

var SCREEN_X=500,
	SCREEN_Y=500,
	SCREEN_WIDTH,
	SCREEN_HEIGHT;
var WORLD_WIDTH=3264,
	WORLD_HEIGHT=2448;

var CHAR_WIDTH = 72,
	CHAR_HEIGHT = 96,
	CHAR_START_X = 200,
	CHAR_START_Y = 200,
	CHAR_SPEED = 5,
	IMAGE_START_X = 0,
	IMAGE_START_NORTH_Y = 0,
	IMAGE_START_EAST_Y = 96,
	IMAGE_START_SOUTH_Y = 192,
	IMAGE_START_WEST_Y = 288,
	SPRITE_WIDTH = 216;



var TEXT_PRELOADING = "Loading ...",
	TEXT_PRELOADING_X = 200,
	TEXT_PRELOADING_Y = 200;

var NORTH=0,
	EAST=1,
	SOUTH=2,
	WEST=3;

