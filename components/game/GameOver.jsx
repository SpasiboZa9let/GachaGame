function GameOver({

    gameOver,

    winner,

    onRestart

}) {


    if(!gameOver){

        return null;

    }




    return (

        <div style={styles.overlay}>


            <div style={styles.window}>


                <h2>


                {

                winner === "player"

                ?

                "🏆 ПОБЕДА"

                :

                "☠️ ПОРАЖЕНИЕ"

                }


                </h2>





                <button

                    onClick={onRestart}

                    style={styles.button}

                >

                    Начать заново

                </button>



            </div>


        </div>

    );


}








const styles = {


    overlay:{


        position:"fixed",


        top:"0",


        left:"0",


        width:"100%",


        height:"100%",


        background:"rgba(0,0,0,0.65)",


        display:"flex",


        alignItems:"center",


        justifyContent:"center",


        zIndex:1000


    },



    window:{


        background:"#222",


        padding:"30px",


        borderRadius:"15px",


        textAlign:"center",


        border:"2px solid #555"


    },



    button:{


        padding:"10px 25px",


        cursor:"pointer",


        borderRadius:"8px"


    }


};








window.GameOver = GameOver;
