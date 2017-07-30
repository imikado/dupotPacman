import QtQuick 2.4

Repeater{
    model:modelWall

    Rectangle{
        id:item
        width:main.oGame.convert(20)
        height:main.oGame.convert(20)
        color:"#880000"

        x:(model.x*main.oGame.convert(22) )
        y:(model.y*main.oGame.convert(22) )

        /*
        Image {
            width:parent.width
            height:parent.height
            anchors.centerIn: parent
            source: "/images/wall.png"
        }*/
    }


}
