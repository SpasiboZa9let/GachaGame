/*
============================
BattleScene.js

Главная сцена боя

Пока только проверка запуска

============================
*/


class BattleScene extends Phaser.Scene {


    constructor(){

        super("BattleScene");

    }




    create(){


        this.add.text(

            400,

            350,

            "Тридевятое царство",

            {

                fontSize:"48px",

                color:"#ffffff"

            }

        );



        console.log(

            "Phaser запущен"

        );


    }


}
