/*
============================
main.js

Запуск Phaser

============================
*/


const config = {


    type: Phaser.AUTO,


    width:1200,


    height:800,


    backgroundColor:"#171717",


    scene:[

        BattleScene

    ]


};





const game = new Phaser.Game(config);
