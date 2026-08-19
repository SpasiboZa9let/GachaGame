function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {


    const safeUnits =

        Array.isArray(units)

        ?

        units

        :

        [];






    function getRarityColor(rarity){

        switch(rarity){

            case "legendary":
                return "#ffd700";

            case "epic":
                return "#b84dff";

            case "rare":
                return "#3d8cff";

            case "uncommon":
                return "#4caf50";

            case "common":
                return "#888";

            default:
                return "#777";

        }

    }









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

                    window.Cards?.getCardById

                    ?

                    window.Cards.getCardById(
                        unit.cardId
                    )

                    :

                    null;




                if(!card){

                    return null;

                }






                const selected =

                    unit.instanceId === selectedUnitId;








                return (


                    <div


                        key={unit.instanceId}


                        onClick={()=>{


                            if(onUnitClick){

                                onUnitClick(unit);

                            }


                        }}



                        style={{


                            border:

                            selected

                            ?

                            "3px solid white"

                            :

                            "3px solid " +

                            getRarityColor(
                                card.rarity
                            ),



                            borderRadius:"12px",



                            transform:

                            selected

                            ?

                            "translateY(-8px)"

                            :

                            "translateY(0)",



                            transition:"0.2s",



                            cursor:"pointer"



                        }}



                    >



                        <Card


                            card={card}


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


    padding:"8px",


    boxSizing:"border-box"


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
