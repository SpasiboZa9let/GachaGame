/*
============================
gameStyles.js

Общие стили игрового экрана

============================
*/


const gameStyles = {


    game:{


        padding:"20px",

        display:"flex",

        flexDirection:"column",

        alignItems:"center",

        gap:"15px"


    },




    turn:{


        fontSize:"20px",

        fontWeight:"bold"


    },




    button:{


        padding:"12px 30px",

        background:"#444",

        color:"#fff",

        border:"none",

        borderRadius:"8px",

        cursor:"pointer"


    },





    target:{


        cursor:"crosshair",

        filter:"drop-shadow(0 0 15px red)"


    },





    log:{


        width:"90%",

        background:"#111",

        padding:"10px",

        borderRadius:"8px",

        fontSize:"14px"


    },





    gameOver:{


        position:"fixed",

        top:"40%",

        left:"50%",

        transform:"translate(-50%,-50%)",

        background:"#222",

        padding:"30px",

        borderRadius:"15px",

        zIndex:100


    },





    restart:{


        padding:"10px 25px",

        cursor:"pointer"


    }


};





window.gameStyles = gameStyles;







/*
============================
CSS игровой сцены

============================
*/


const style = document.createElement("style");


style.innerHTML = `



.game-table {


    display:grid;


    grid-template-columns:

        250px

        minmax(0,1fr)

        180px;



    height:100vh;


    gap:15px;


    padding:15px;


    background:#171717;


    overflow:hidden;


}






.combat-log-panel {


    background:#111;


    border-radius:12px;


    padding:10px;


    overflow:auto;


}






.battlefield-panel {


    background:#222;


    border-radius:20px;


    padding:20px;


    overflow:hidden;


}






.game-controls-panel {


    display:flex;


    flex-direction:column;


    justify-content:center;


    gap:15px;


}






`;



document.head.appendChild(style);
