/*
============================

gameStyles.js

Стили игровой сцены

============================
*/


window.gameStyles = {


    button:{


        padding:"15px 25px",

        margin:"10px",

        fontSize:"18px",

        cursor:"pointer",

        borderRadius:"12px",

        border:"2px solid #555",

        background:"#333",

        color:"#fff"


    }



};






const style = document.createElement("style");


style.innerHTML = `



.game-table {


    display:grid;


    grid-template-columns:

        250px

        1fr

        180px;


    gap:15px;


    height:100vh;


    padding:15px;


    background:#171717;


    overflow:hidden;


}






.combat-log-panel {


    background:#222;


    border-radius:15px;


    padding:10px;


    overflow:auto;


}






.battlefield-panel {


    background:#292929;


    border-radius:20px;


    padding:20px;


    overflow:hidden;


}






.game-controls-panel {


    display:flex;


    flex-direction:column;


    justify-content:center;


    align-items:center;


}







.battlefield-panel > div {


    height:100%;


}



`;



document.head.appendChild(style);
