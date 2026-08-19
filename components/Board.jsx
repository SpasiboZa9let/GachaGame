function Board({
    units,
    onUnitClick,
    selectedUnitId,
    returnId = false
}) {


    const safeUnits = Array.isArray(units)
        ? units
        : [];




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

                    window.Cards?.getCardById(
                        unit.cardId
                    );


                if(!card){

                    return null;

                }





                const stats =

                    unit.stats || {

                        attack:0,

                        health:0

                    };






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

                            ...styles.card,


                            border:

                            selected

                            ?

                            "3px solid white"

                            :

                            "3px solid " +

                            getRarityColor(
                                card.rarity
                            ),



                            transform:

                            selected

                            ?

                            "translateY(-8px)"

                            :

                            "none"

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

                            <div>
                                АРТ
                            </div>

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







card:{


    width:"90px",


    height:"145px",


    minWidth:"90px",


    background:"#252525",


    borderRadius:"10px",


    padding:"4px",


    boxSizing:"border-box",


    overflow:"hidden",


    cursor:"pointer",


    transition:"0.2s",


    display:"flex",


    flexDirection:"column",


    boxShadow:
        "0 4px 10px rgba(0,0,0,0.5)"

},







name:{


    height:"18px",


    fontSize:"9px",


    fontWeight:"bold",


    textAlign:"center",


    overflow:"hidden"


},







imageBox:{


    width:"100%",


    height:"75px",


    overflow:"hidden",


    background:"#000",


    borderRadius:"6px"


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


},







empty:{


    color:"#666"

}


};







window.Board = Board;
