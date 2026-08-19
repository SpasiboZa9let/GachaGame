function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {


    const safeUnits =
        Array.isArray(units)
            ? units
            : [];





    function getUnitStats(unit){


        if(unit.stats){

            return unit.stats;

        }


        return {

            attack:
                unit.attack || 0,


            health:
                unit.health || 0,


            defense:
                unit.defense || 0

        };

    }







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









    function getStatusText(unit){


        if(
            !unit.status ||
            unit.status.length===0
        ){

            return null;

        }



        return unit.status.map(

            (status,index)=>{


                switch(status.type){


                    case "shield":

                        return (
                            <div key={index}>
                                🛡 Щит {status.value}
                            </div>
                        );


                    case "stun":

                        return (
                            <div key={index}>
                                💫 Оглушение
                            </div>
                        );


                    case "fear":

                        return (
                            <div key={index}>
                                😨 Страх
                            </div>
                        );


                    default:

                        return null;


                }


            }

        );


    }








    return (

        <div style={styles.board}>


            <div style={styles.cardsArea}>


            {
            safeUnits.length===0

            ?

            <div style={styles.empty}>
                Поле пусто
            </div>


            :


            safeUnits.map(function(unit){



                if(!unit){

                    return null;

                }




                const card =

                    CARDS.find(

                        item =>

                            item.id === unit.cardId

                    );




                if(!card){

                    return null;

                }






                const stats =
                    getUnitStats(unit);






                const selected =

                    unit.instanceId ===
                    selectedUnitId;







                return (


                <div


                    key={
                        unit.instanceId
                    }


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

                            "3px solid #ffd700"

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



                        boxShadow:

                            selected

                            ?

                            "0 0 15px rgba(255,215,0,0.8)"

                            :

                            "0 5px 12px rgba(0,0,0,0.5)"


                    }}



                >







                    <div style={styles.cost}>

                        {card.cost}

                    </div>








                    <div style={styles.name}>

                        {
                            card.name
                        }

                    </div>








                    <div style={styles.imageBox}>


                        {
                        card.image

                        ?

                        <img

                            src={card.image}

                            alt={card.name}

                            style={styles.image}

                        />


                        :

                        <div style={styles.noImage}>
                            АРТ
                        </div>

                        }


                    </div>









                    <div style={styles.status}>


                        {
                        unit.canAttack

                        ?

                        "⚔️ Готов"

                        :

                        "💤 Ждет"

                        }


                    </div>









                    {
                    getStatusText(unit)

                    &&

                    <div style={styles.effects}>

                        {
                            getStatusText(unit)
                        }

                    </div>

                    }








                    <div style={styles.stats}>


                        <span>
                            ⚔️ {stats.attack}
                        </span>


                        <span>
                            ❤️ {stats.health}
                        </span>


                        <span>
                            🛡️ {stats.defense || 0}
                        </span>


                    </div>





                </div>


                );


            })

            }



            </div>


        </div>

    );


}









const styles = {


board:{


    width:"100%",


    height:"210px",


    background:"#202020",


    border:"1px solid #444",


    borderRadius:"10px",


    padding:"10px",


    boxSizing:"border-box",


    overflow:"hidden"


},






cardsArea:{


    display:"flex",


    justifyContent:"center",


    gap:"8px",


    height:"100%",


    overflow:"hidden"


},






empty:{


    width:"100%",


    height:"100%",


    display:"flex",


    alignItems:"center",


    justifyContent:"center",


    color:"#555"


},






unit:{


    width:"100px",


    height:"165px",


    background:"#292929",


    borderRadius:"10px",


    padding:"5px",


    display:"flex",


    flexDirection:"column",


    position:"relative",


    boxSizing:"border-box",


    cursor:"pointer"


},






cost:{


    position:"absolute",


    top:"3px",


    left:"3px",


    width:"22px",


    height:"22px",


    borderRadius:"50%",


    background:"#3478db",


    display:"flex",


    justifyContent:"center",


    alignItems:"center",


    fontSize:"11px",


    fontWeight:"bold"


},






name:{


    textAlign:"center",


    fontSize:"11px",


    fontWeight:"bold",


    height:"20px",


    overflow:"hidden"


},






imageBox:{


    height:"80px",


    background:"#111",


    borderRadius:"6px",


    overflow:"hidden"


},






image:{


    width:"100%",


    height:"100%",


    objectFit:"cover"


},






noImage:{


    height:"100%",


    display:"flex",


    justifyContent:"center",


    alignItems:"center",


    color:"#555"


},






status:{


    textAlign:"center",


    fontSize:"8px",


    color:"#aaa"


},






effects:{


    color:"#ffd700",


    fontSize:"8px",


    textAlign:"center"


},






stats:{


    marginTop:"auto",


    display:"flex",


    justifyContent:"space-between",


    fontSize:"10px",


    fontWeight:"bold"


}


};





window.Board = Board;
