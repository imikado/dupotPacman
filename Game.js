var tMap=Array();


//dimensions réelles de l'écran
var _width;
var _height;

//dimensions de base de notre jeu
var _virtualWidth=720;
var _virtualHeight=960;

//ratio permettant d’adapter à la résolution de l'écran
var _iRatio;

var _iScore=0;

var _oPageScene;

function Pacman(){
    this.x=1;
    this.y=1;
    this.direction='droite';
}
Pacman.prototype={
}

var oPacman=new Pacman();
oPacman._x=1;
oPacman._y=1;
oPacman.direction='droite';


function getWidth(){
    return _width;
}
function getHeight(){
    return _height;
}

//fonction de démarrage du jeu
function start(width_,height_){

    if(width_> height_){
        _width=height_*(_virtualWidth/_virtualHeight);
    }else{
        _width=width_;
    }

    _height=_width*(_virtualHeight/_virtualWidth);
    _iRatio=_width/_virtualWidth;

    main.width=_width;
    main.height=_height;

    //appel à la page splashscreen
    gotoSplashscreen();
}

//converti une dimension a la taille de l'écran
function convert(size_){
    return size_*_iRatio;
}

//fonctions de navigations
function gotoSplashscreen(){
    main.launchPage('Splashscreen');
}
function gotoMenu(){
    main.launchPage('Menu');
}
function gotoScene(){
    _oPageScene=main.launchPage('Scene');

    buildGame();
}
function gotoGameover(){
    main.launchPage('GameOver');
}

var iCloudY=0;

//jeu
function addEnemy(){

    modelEnemies.append({x:_xEnemy,y:0});
    _xEnemy+=convert(120);

    if(_xEnemy > _width){
        _xEnemy=0;
    }

    modelCloud.append({x:0,y:iCloudY});
    iCloudY+=convert(200);
    if(iCloudY > _height){
        iCloudY=0;
    }
}
function buildGame(){


    tMap=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,0,1,1,1,1,2,2,1,1,1,1,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
            [1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

        ];

    for(var y_=0;y_< tMap.length;y_++){
        for(var x_=0;x_ < tMap[0].length;x_++){
            if(tMap[y_][x_]===1){
                modelWall.append({x:x_,y:y_});
            }
        }
    }

    _oPageScene.movePacman( oPacman._x, oPacman._y );

    _oPageScene.startTimer();

}

function cycle(){

      _oPageScene.movePacmanTo( oPacman.direction );

}


function iCanWalk(x_,y_){
    if(tMap[y_][x_]===0){
        return true;
    }
    return false;
}


function clickUp(){
    if(iCanWalk(oPacman._x,oPacman._y-1) ){
        oPacman.direction='haut';
    }
}
function clickDown(){
    if(iCanWalk(oPacman._x,oPacman._y+1) ){
        oPacman.direction='bas';
    }
}
function clickLeft(){
    if(iCanWalk(oPacman._x-1,oPacman._y) ){
        oPacman.direction='gauche';
    }
}
function clickRight(){
    if(iCanWalk(oPacman._x+1,oPacman._y) ){
        oPacman.direction='droite';
    }
}
