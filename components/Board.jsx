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





    function getUnitStats(unit){


        return unit.stats || {


            attack: unit.attack || 0,

            health: unit.health || 0,

            defense: unit.defense || 0


        };


    }








    function getRarityColor(rarity){


        const colors = {


            legendary:"#ffd700",

            epic:"#b84dff",

            rare:"#3d8cff",

            uncommon:"#4caf50",

            common:"#888"


        };


        return colors[rarity] || "#777";


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

                    CARDS.find(

                        c => c.id === unit.cardId

                    );



                if(!card){

                    return null;

                }



                const stats =

                    getUnitStats(unit);





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

                            "3px solid #fff"

                            :

                            "3px solid " +

                            getRarityColor(
                                card.rarity
                            ),


                            opacity:

                            unit.canAttack

                            ?

                            1

                            :

                            0.65,


                            transform:

                            selected

                            ?

                            "translateY(-8px)"

                            :

                            "translateY(0)"


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

                            "АРТ"

                            }


                        </div>







                        <div style={styles.status}>

                            {

                            unit.canAttack

                            ?

                            "⚔️"

                            :

                            "💤"

                            }

                        </div>







                        <div style={styles.stats}>


                            <span>

                                ⚔️{stats.attack}

                            </span>


                            <span>

                                ❤️{stats.health}

                            </span>


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


    height:"190px",


    background:

    "linear-gradient(#242424,#111)",


    border:

    "2px solid #555",


    borderRadius:"16px",


    padding:"12px",


    boxSizing:"border-box",


    overflow:"hidden"


},






cardsArea:{


    display:"flex",


    justifyContent:"center",


    gap:"12px",


    height:"100%"


},






empty:{


    height:"100%",


    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    color:"#666"


},






unit:{


    width:"90px",


    height:"155px",


    background:"#292929",


    borderRadius:"12px",


    padding:"5px",


    cursor:"pointer",


    display:"flex",

    flexDirection:"column",


    transition:"0.2s",


    boxShadow:

    "0 5px 15px rgba(0,0,0,0.5)"


},






name:{


    textAlign:"center",


    fontSize:"10px",


    fontWeight:"bold",


    height:"22px",


    overflow:"hidden"


},






imageBox:{


    height:"90px",


    background:"#000",

    borderRadius:"8px",

    overflow:"hidden"


},






image:{


    width:"100%",


    height:"100%",


    objectFit:"cover"


},






status:{


    textAlign:"center",

    height:"15px"


},






stats:{


    marginTop:"auto",


    display:"flex",

    justifyContent:"space-around",

    fontWeight:"bold",

    fontSize:"11px"


}


};





window.Board = Board;
