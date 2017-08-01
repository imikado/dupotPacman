var tMap=Array();

var tBall=Array();
var tBigBall=Array();

var tDirection=Array('haut','bas','gauche','droite');


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

function scoreUp(val_){
    _iScore+=val_;
    _oPageScene.setScore(_iScore);
}

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
            [3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,3,3],
            [3,3,3,3,1,0,1,0,1,1,1,1,2,2,1,1,1,1,0,1,0,1,3,3,3,3],
            [3,3,3,3,1,0,1,0,1,4,4,4,4,4,4,4,4,1,0,1,0,1,3,3,3,3],
            [3,3,3,3,1,0,1,0,1,4,4,4,4,4,4,4,4,1,0,1,0,1,3,3,3,3],
            [3,3,3,3,1,0,1,0,1,4,4,4,4,4,4,4,4,1,0,1,0,1,3,3,3,3],
            [3,3,3,3,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,3,3,3,3],
            [3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,3,3],
            [1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

        ];

    var iBall=0;
    var iBigBall=0;

    var iNewBigBall=0;

    for(var y_=0;y_< tMap.length;y_++){
        for(var x_=0;x_ < tMap[0].length;x_++){
            if(tMap[y_][x_]===1){
                modelWall.append({x:x_,y:y_});

            }else if(tMap[y_][x_]===0){
                if(iNewBigBall && (iNewBigBall%30)==0){
                    modelBigBall.append({x:x_,y:y_,visible:true});

                    tBigBall[x_+'_'+y_]=iBigBall;
                    iBigBall++;
                }else{

                    modelBall.append({x:x_,y:y_,visible:true});

                    tBall[x_+'_'+y_]=iBall;
                    iBall++;

                }

                iNewBigBall++;
            }
        }
    }

    _oPageScene.movePacman( oPacman._x, oPacman._y );

    _oPageScene.startTimer();

    modelGhost.append({x:1,y:3,direction:'bas',img:"/images/ghost.png"});
    modelGhost.append({x:1,y:15,direction:'droite',img:"/images/ghost.png"});
    modelGhost.append({x:7,y:9,direction:'bas',img:"/images/ghost.png"});

}

var iCycleGhost=0;
function cycle(){

    if(oPacman.newdirection==='gauche' && iCanWalk(oPacman._x-1,oPacman._y)){
        oPacman.direction=oPacman.newdirection;
        oPacman.newdirection='';
    }else if(oPacman.newdirection==='droite' && iCanWalk(oPacman._x+1,oPacman._y)){
        oPacman.direction=oPacman.newdirection;
        oPacman.newdirection='';
    }else if(oPacman.newdirection==='haut' && iCanWalk(oPacman._x,oPacman._y-1)){
        oPacman.direction=oPacman.newdirection;
        oPacman.newdirection='';
    }else if(oPacman.newdirection==='bas' && iCanWalk(oPacman._x,oPacman._y+1)){
        oPacman.direction=oPacman.newdirection;
        oPacman.newdirection='';
    }

    var bGhostVulnerable=false;

    if(iCycleGhost){
        iCycleGhost++;
    }

    if(iCycleGhost>20){

        for(var iGhost=0;iGhost< modelGhost.count;iGhost++ ){
            modelGhost.get(iGhost).img='/images/ghost.png';;
        }

        iCycleGhost=0;
    }

    if(oPacman._x+'_'+oPacman._y in tBall && modelBall.get(tBall[oPacman._x+'_'+oPacman._y]).visible){
        //console.log('exist :'+tBall[oPacman._x+'_'+oPacman._y]);

        modelBall.get(tBall[oPacman._x+'_'+oPacman._y]).visible=false;

        scoreUp(10);

    }else if(oPacman._x+'_'+oPacman._y in tBigBall && modelBigBall.get(tBigBall[oPacman._x+'_'+oPacman._y]).visible){

        modelBigBall.get(tBigBall[oPacman._x+'_'+oPacman._y]).visible=false;

        for(var iGhost=0;iGhost< modelGhost.count;iGhost++ ){
            modelGhost.get(iGhost).img='/images/ghostVulnerable.png';;
        }

        iCycleGhost=1;

        scoreUp(20);
    }


     _oPageScene.movePacmanTo( oPacman.direction );

    for(var iGhost=0;iGhost< modelGhost.count;iGhost++ ){
        var oGhost=modelGhost.get(iGhost);

        var newDirection=changeDirection(oGhost.direction);
        if(iCanWalkDirection(oGhost,newDirection)){
            oGhost.direction=newDirection;
        }

        if(oGhost.direction==='haut'){
            if(iCanWalk(oGhost.x,oGhost.y-1)){
                oGhost.y-=1;
            }else{
                oGhost.direction=changeDirection(oGhost.direction);
            }
        }else if(oGhost.direction==='bas'){
            if(iCanWalk(oGhost.x,oGhost.y+1)){
                oGhost.y+=1;
            }else{
                oGhost.direction=changeDirection(oGhost.direction);
            }
        }else if(oGhost.direction==='gauche'){
            if(iCanWalk(oGhost.x-1,oGhost.y)){
                oGhost.x-=1;
            }else{
                oGhost.direction=changeDirection(oGhost.direction);
            }
        }else if(oGhost.direction==='droite'){
            if(iCanWalk(oGhost.x+1,oGhost.y)){
                oGhost.x+=1;
            }else{
                oGhost.direction=changeDirection(oGhost.direction);
            }
        }

    }
}
var tDirectionVert=Array('haut','bas');
var tDirectionHoriz=Array('gauche','droite');

function changeDirection(direction_){

    var max=1;
    var min=0;

    var iIndice=( Math.floor(Math.random() * (max - min +1)) + min );

    if(direction_==='haut' || direction_==='bas' ){
        return tDirectionHoriz[iIndice];
    }else{
        return tDirectionVert[iIndice];
    }

}


function iCanWalk(x_,y_){
    if(tMap[y_][x_]===0){
        return true;
    }
    return false;
}

function iCanWalkDirection(oObject_,direction_){
    if(direction_==='haut' && iCanWalk(oObject_.x,oObject_.y-1) ){
        return true;
    }else if(direction_==='bas' && iCanWalk(oObject_.x,oObject_.y+1) ){
        return true;
    }else if(direction_==='gauche' && iCanWalk(oObject_.x-1,oObject_.y) ){
        return true;
    }else if(direction_==='droite' && iCanWalk(oObject_.x+1,oObject_.y) ){
        return true;
    }
    return false;
}


function clickUp(){
    oPacman.newdirection='haut';
}
function clickDown(){
    oPacman.newdirection='bas';

}
function clickLeft(){
    oPacman.newdirection='gauche';

}
function clickRight(){
    oPacman.newdirection='droite';

}
