/*
============================
Battlefield.jsx

Игровое поле

Отвечает за:
- противника
- игрока
- поле существ
- героев
- руки

Логики игры здесь нет

============================
*/


function Battlefield({


    player,

    opponent,

    handCards,

    opponentHandCards,

    selectedAttacker,

    onCardClick,

    onPlayerUnitClick,

    onOpponentUnitClick,

    onOpponentHeroClick,

    turn


}){


    return (


        <div style={styles.battlefield}>





            <div style={styles.enemySide}>


                <OpponentArea


                    opponent={opponent}


                    opponentHandCards={opponentHandCards}


                    selectedAttacker={selectedAttacker}


                    onOpponentUnitClick={onOpponentUnitClick}


                    onOpponentHeroClick={onOpponentHeroClick}


                />


            </div>








            <div style={styles.center}>


                <GameTurn


                    selectedAttacker={selectedAttacker}


                    turn={turn}


                />



            </div>








            <div style={styles.playerSide}>


                <PlayerArea


                    player={player}


                    selectedAttacker={selectedAttacker}


                    onPlayerUnitClick={onPlayerUnitClick}


                />




                <PlayerHand


                    cards={handCards}


                    onCardClick={onCardClick}


                />


            </div>





        </div>


    );


}







const styles = {


    battlefield:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        gap:"10px"


    },





    enemySide:{


        display:"flex",

        justifyContent:"flex-start",

        width:"100%"


    },





    center:{


        display:"flex",

        justifyContent:"center",

        width:"100%"


    },





    playerSide:{


        display:"flex",

        flexDirection:"column",

        gap:"10px",

        width:"100%"


    }


};







window.Battlefield = Battlefield;
