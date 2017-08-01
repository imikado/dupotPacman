import QtQuick 2.0


    Rectangle{
            id:item
            width:main.oGame.convert(20)
            height:main.oGame.convert(20)
            color:"transparent"

            property int _x;
            property int _y;

            x:_x*main.oGame.convert(22)
            y:_y*main.oGame.convert(22)

            AnimatedSprite {
                width:parent.width
                height:parent.height
                anchors.centerIn: parent
                source: "/images/pacman.png"
                frameCount: 3

                frameDuration: 200

                frameWidth:  40
                frameHeight: 40
            }

            Behavior on x  { SmoothedAnimation { velocity: 100 } }
            Behavior on y  { SmoothedAnimation { velocity: 100 } }
    }

