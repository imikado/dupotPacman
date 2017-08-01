import QtQuick 2.3
import QtQuick.Window 2.2
import QtQuick.Controls 1.4

import "/js/Game.js" as Game

Window {
    id:main
    visible: true

    color:"#224422"

    property var oGame

    contentOrientation :Qt.PortraitOrientation

    ListModel{
        id:modelGhost
    }
    ListModel{
        id:modelBall
    }
    ListModel{
        id:modelBigBall
    }
    ListModel{
        id:modelWall
    }

    //le composant qui nous permettra de naviguer dans le jeu
    StackView {
        id: stack
        width: parent.width
        height:parent.height
    }
    function popPage(){
        stack.pop();
    }
    function launchPage(sView){
        return stack.push('qrc:/pages/'+sView+'.qml');
    }
    function initApplication(){
        this.oGame=Game;
        oGame.start(Screen.width,Screen.height);
        //this.oGame.start(400,650);

    }
    Component.onCompleted:initApplication()

}
