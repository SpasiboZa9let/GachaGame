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






    function getStats(unit){


        return unit.stats || {

            attack: unit.attack || 0,

            health: unit.health || 0

        };


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

                    window.Cards.getCardById

                    ?

                    window.Cards.getCardById(
                        unit.cardId
                    )

                    :

                    null;




                if(!card){

                    return null;

                }





                const stats = getStats(unit);





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


                            ...styles.unit,


                            border:

                            selected

                            ?

                            "3px solid white"

                            :

                            "3px solid " +

                            getRarityColor(
                                card.rarity
                            )

                        }}


                    >




                        <div style={styles.name}>

                            {card.name}

                        </div>






                        <div style={styles.imageBox}>


                            {

                            card.image

                            ?

                            <img

                                src={card.image}

                                alt=""

                                style={styles.image}

                            />

                            :

                            null

                            }


                        </div>






                        <div style={styles.stats}>


                            ⚔️ {stats.attack}

                            &nbsp;

                            ❤️ {stats.health}


                        </div>




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


},






unit:{


    width:"85px",


    minWidth:"85px",


    height:"140px",


    minHeight:"140px",


    flex:"0 0 auto",


    background:"#252525",


    borderRadius:"10px",


    padding:"4px",


    display:"flex",


    flexDirection:"column",


    boxSizing:"border-box",


    overflow:"hidden",


    cursor:"pointer",


    boxShadow:
        "0 4px 10px rgba(0,0,0,0.5)"


},






name:{


    height:"18px",


    textAlign:"center",


    fontSize:"9px",


    fontWeight:"bold",


    overflow:"hidden"


},






imageBox:{


    width:"100%",


    height:"80px",


    background:"#000",


    borderRadius:"6px",


    overflow:"hidden"


},






image:{


    width:"100%",


    height:"100%",


    objectFit:"cover"


},






stats:{


    marginTop:"auto",


    textAlign:"center",


    fontSize:"10px",


    fontWeight:"bold"


}



};







window.Board = Board;
