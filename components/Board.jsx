function Board({
    units,
    onUnitClick,
    selectedUnitId,
    returnId = false
}) {


    const safeUnits = Array.isArray(units)
        ? units
        : [];




    return (

        <div style={styles.board}>


            {
            safeUnits.length === 0

            ?

            <div style={styles.empty}>
                Поле пусто
            </div>

            :

            <div style={styles.cardsArea}>


            {

            safeUnits.map(unit=>{


                const card =

                    window.Cards?.getCardById(
                        unit.cardId
                    );


                if(!card){

                    return null;

                }






                const selected =

                    selectedUnitId === unit.instanceId;







                return (

                    <div

                        key={unit.instanceId}


                        onClick={()=>{

                            if(onUnitClick){


                                onUnitClick(

                                    returnId

                                    ?

                                    unit.instanceId

                                    :

                                    unit

                                );


                            }

                        }}


                        style={{

                            transform:

                            selected

                            ?

                            "translateY(-8px)"

                            :

                            "none",


                            transition:"0.2s",

                            cursor:"pointer"

                        }}


                    >


                        <Card

                            card={{

                                ...card,

                                attack:
                                    unit.stats?.attack
                                    ??
                                    card.attack,

                                health:
                                    unit.stats?.health
                                    ??
                                    card.health

                            }}


                            mode="board"


                        />


                    </div>


                );


            })


            }


            </div>

            }


        </div>

    );

}







const styles = {


    board:{


        width:"100%",


        height:"180px",


        display:"flex",


        alignItems:"center",


        justifyContent:"center",


        overflow:"hidden",


        background:"#151515",


        border:"2px solid #444",


        borderRadius:"12px",


        padding:"8px"


    },





    cardsArea:{


        display:"flex",


        flexDirection:"row",


        flexWrap:"nowrap",


        alignItems:"center",


        justifyContent:"center",


        gap:"10px",


        width:"100%",


        height:"100%"


    },





    empty:{


        color:"#666"


    }


};







window.Board = Board;
