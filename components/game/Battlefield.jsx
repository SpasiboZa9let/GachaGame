function Battlefield({

    opponent,
    opponentHandCards,

    player,
    playerHandCards,

    onOpponentHeroClick,
    onOpponentUnitClick,

    onPlayerUnitClick,
    onCardClick,

    selectedAttacker

}) {


    return (

        <div style={styles.container}>


            <OpponentArea


                opponent={opponent}


                opponentHandCards={opponentHandCards}


                onHeroClick={onOpponentHeroClick}


                onUnitClick={onOpponentUnitClick}


                selectedAttacker={selectedAttacker}


            />







            <div style={styles.divider}></div>







            <PlayerArea


                player={player}


                handCards={playerHandCards}


                onCardClick={onCardClick}


                onUnitClick={onPlayerUnitClick}


                selectedAttacker={selectedAttacker}


            />



        </div>

    );


}








const styles = {


    container:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        alignItems:"center",


        gap:"15px"


    },


    divider:{


        width:"90%",


        height:"2px",


        background:"#555"


    }


};








window.Battlefield = Battlefield;
