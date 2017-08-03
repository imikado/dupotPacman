import QtQuick 2.0


    Rectangle{
            id:item
            width:main.oGame.convert(main.oGame.getTile())
            height:main.oGame.convert(main.oGame.getTile())
            color:"transparent"

            property int _x;
            property int _y;

            x:_x*main.oGame.convert(main.oGame.getTile())
            y:_y*main.oGame.convert(main.oGame.getTile())

            AnimatedSprite {
                width:parent.width
                height:parent.height
                anchors.centerIn: parent
                source: "/images/pacman.png"
                frameCount: 3

                frameDuration: 200

                frameWidth:  80
                frameHeight: 80
            }

            Behavior on x  { SmoothedAnimation { velocity: 100 } }
            Behavior on y  { SmoothedAnimation { velocity: 100 } }
    }

