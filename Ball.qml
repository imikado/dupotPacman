import QtQuick 2.4

Repeater{
    model:modelBall

    Rectangle{
        id:item
        width:main.oGame.convert(20)
        height:main.oGame.convert(20)
        color:"transparent"
        visible: model.visible

        x:(model.x*main.oGame.convert(22) )
        y:(model.y*main.oGame.convert(22) )



        AnimatedSprite {
            enabled: model.visible
            width:parent.width
            height:parent.height
            anchors.centerIn: parent
            source: "/images/ball.png"
            frameCount: 3

            frameDuration: 600

            frameWidth:  40
            frameHeight: 40
        }
    }


}
