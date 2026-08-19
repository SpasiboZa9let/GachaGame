function OpponentHand({
    cards
}) {


    if(
        !cards ||
        cards.length === 0
    ){

        return null;

    }




    return (

        <div style={styles.hand}>


            {

            cards.map((card,index)=>(


                <div

                    key={
                        card.id + "_" + index
                    }

                    style={styles.card}

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

                            alt={card.name}

                            style={styles.image}

                        />

                        :

                        <div style={styles.empty}>
                            АРТ
                        </div>

                        }


                    </div>







                    <div style={styles.stats}>


                        ⚔️ {card.attack}

                        &nbsp;

                        ❤️ {card.health}


                    </div>




                    <div style={styles.cost}>

                        🔵 {card.cost}

                    </div>




                </div>


            ))

            }


        </div>

    );


}








const styles = {



hand:{


    display:"flex",


    flexDirection:"row",


    flexWrap:"nowrap",


    gap:"8px",


    justifyContent:"center",


    alignItems:"center",


    width:"100%",


    height:"120px",


    overflow:"hidden"


},






card:{


    width:"75px",


    height:"110px",


    background:"#252525",


    border:"1px solid #666",


    borderRadius:"8px",


    padding:"4px",


    position:"relative",


    display:"flex",


    flexDirection:"column",


    boxShadow:
        "0 3px 8px rgba(0,0,0,0.5)"


},






name:{


    fontSize:"8px",


    height:"16px",


    textAlign:"center",


    overflow:"hidden",


    fontWeight:"bold"


},






imageBox:{


    height:"55px",


    background:"#111",


    borderRadius:"5px",


    overflow:"hidden"


},






image:{


    width:"100%",


    height:"100%",


    objectFit:"cover"


},






empty:{


    height:"100%",


    display:"flex",


    justifyContent:"center",


    alignItems:"center",


    color:"#555",


    fontSize:"8px"


},






stats:{


    fontSize:"8px",


    textAlign:"center",


    marginTop:"3px"


},






cost:{


    position:"absolute",


    top:"2px",


    left:"2px",


    fontSize:"8px"


}



};








window.OpponentHand = OpponentHand;
