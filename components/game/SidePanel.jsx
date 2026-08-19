function SidePanel({

    combatLog,

    onEndTurn,

    onTestBoard

}) {


    return (

        <aside style={styles.container}>


            <div style={styles.panel}>


                <h4>
                    Лог боя
                </h4>



                {

                (combatLog || [])

                .slice(-10)

                .map(

                    (text,index)=>(

                        <div key={index}>

                            {text}

                        </div>

                    )

                )

                }


            </div>







            <button

                style={styles.button}

                onClick={onEndTurn}

            >

                Завершить ход

            </button>








            <button

                style={styles.button}

                onClick={onTestBoard}

            >

                🧪 Тестовое поле

            </button>



        </aside>

    );


}








const styles = {


    container:{


        display:"flex",


        flexDirection:"column",


        gap:"15px",


        width:"250px"


    },



    panel:{


        background:"#111",


        padding:"10px",


        borderRadius:"8px",


        fontSize:"14px",


        maxHeight:"400px",


        overflowY:"auto"


    },



    button:{


        padding:"12px 20px",


        background:"#444",


        color:"#fff",


        border:"none",


        borderRadius:"8px",


        cursor:"pointer"


    }


};








window.SidePanel = SidePanel;
