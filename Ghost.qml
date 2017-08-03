import QtQuick 2.4

Repeater{
    model:modelGhost

    Rectangle{
        id:item
        width:main.oGame.convert(main.oGame.getTile())
        height:main.oGame.convert(main.oGame.getTile())
        color:"transparent"

        visible:model.visible;

        x:(model.x*main.oGame.convert(main.oGame.getTile()) )
        y:(model.y*main.oGame.convert(main.oGame.getTile()) )

        AnimatedSprite {
            width:parent.width
            height:parent.height
            anchors.centerIn: parent
            source: model.img
            frameCount: 3

            frameDuration: 200

            frameWidth:  80
            frameHeight: 80
        }
    }


}
