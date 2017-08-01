import QtQuick 2.4

Repeater{
    model:modelGhost

    Rectangle{
        id:item
        width:main.oGame.convert(20)
        height:main.oGame.convert(20)
        color:"transparent"

        x:(model.x*main.oGame.convert(22) )
        y:(model.y*main.oGame.convert(22) )

        AnimatedSprite {
            width:parent.width
            height:parent.height
            anchors.centerIn: parent
            source: model.img
            frameCount: 3

            frameDuration: 200

            frameWidth:  40
            frameHeight: 40
        }
    }


}
