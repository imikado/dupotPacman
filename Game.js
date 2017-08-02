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
    modelBall.clear();
    modelBigBall.clear();
    modelGhost.clear();

    tBall=Array();
    tBigBall=Array();
    main.launchPage('GameOver');
}

var iCloudY=0;

//jeu

function buildGame(){

    _iScore=0;

    oPacman._x=1;
    oPacman._y=1;
    oPacman.direction='droite';


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

    modelGhost.append({x:1,y:3,direction:'bas',img:"/images/ghost.png",visible:true,inPrison:false,cyclePrison:0});
    modelGhost.append({x:1,y:15,direction:'droite',img:"/images/ghost.png",visible:true,inPrison:false,cyclePrison:0});
    modelGhost.append({x:7,y:9,direction:'bas',img:"/images/ghost.png",visible:true,inPrison:false,cyclePrison:0});
    modelGhost.append({x:16,y:1,direction:'bas',img:"/images/ghost.png",visible:true,inPrison:false,cyclePrison:0});

}

var bGhostVulnerable=false;

function checkCollisionGhost(oGhost_,oPacman_){
    if(oGhost_.x === oPacman_._x && oGhost_.y === oPacman_._y && oGhost_.visible){
        return true;
    }
    return false;
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



    if(iCycleGhost){
        iCycleGhost++;
    }

    if(iCycleGhost>20){

        bGhostVulnerable=false;

        iCycleGhost=0;
    }

    if(oPacman._x+'_'+oPacman._y in tBall && modelBall.get(tBall[oPacman._x+'_'+oPacman._y]).visible){
        //console.log('exist :'+tBall[oPacman._x+'_'+oPacman._y]);

        modelBall.get(tBall[oPacman._x+'_'+oPacman._y]).visible=false;

        scoreUp(10);

    }else if(oPacman._x+'_'+oPacman._y in tBigBall && modelBigBall.get(tBigBall[oPacman._x+'_'+oPacman._y]).visible){

        modelBigBall.get(tBigBall[oPacman._x+'_'+oPacman._y]).visible=false;

        bGhostVulnerable=true

        iCycleGhost=1;

        scoreUp(20);
    }


     _oPageScene.movePacmanTo( oPacman.direction );

    for(var iGhost=0;iGhost< modelGhost.count;iGhost++ ){
        var oGhost=modelGhost.get(iGhost);

        if(oGhost.inPrison){

            oGhost.cyclePrison++;

            if(oGhost.cyclePrison > 10){
                oGhost.y=7;

                oGhost.inPrison=false;
                oGhost.cyclePrison=0;
            }
        }

        if(bGhostVulnerable){
             oGhost.img='/images/ghostVulnerable.png';
        }else{
            oGhost.img='/images/ghost.png';
        }

        var newDirection=changeDirection(oGhost.direction);
        if(iCanWalkDirection(oGhost,newDirection)){
            oGhost.direction=newDirection;
        }

        if(checkCollisionGhost(oGhost,oPacman) && oGhost.direction!==oPacman.direction ){
            console.log('check collision avant ghost.direction:'+oGhost.direction+',pacman.direction:'+oPacman.direction+' ghost.x:'+oGhost.x+'ghost.y:'+oGhost.y+' pacman.x:'+oPacman._x+' pacman.y:'+oPacman._y);

            if(bGhostVulnerable){
                oGhost.visible=false;
                oGhost.x=9;
                oGhost.y=9;
                oGhost.inPrison=true;
                oGhost.visible=true;
            }else{
                _oPageScene.stopTimer();
                _oPageScene.gameOver();
                break;

            }
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

        if(checkCollisionGhost(oGhost,oPacman) ){
            console.log('check collision apres ghost.x:'+oGhost.x+'ghost.y:'+oGhost.y+' pacman.x:'+oPacman._x+' pacman.y:'+oPacman._y);
            if(bGhostVulnerable){
                oGhost.visible=false;
                oGhost.x=9;
                oGhost.y=9;
                oGhost.inPrison=true;
                oGhost.visible=true;
            }else{
                _oPageScene.stopTimer();
                _oPageScene.gameOver();
                break;

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
    if(tMap[y_][x_]===0 || tMap[y_][x_]===4){
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
