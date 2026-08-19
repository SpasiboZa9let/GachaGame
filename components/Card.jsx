function Card({ 
    card, 
    onClick,
    mode="hand"
}) {

console.log("CARD RENDER", card?.name, mode);
    if (!card) {

        return null;

    }




    const isBoard = mode === "board";



    const size = isBoard

        ?

        {
            width:"90px",
            height:"150px",
            minWidth:"90px"
        }

        :

        {
            width:"180px",
            height:"260px",
            minWidth:"180px"
        };






    return (

        <div


            onClick={() =>
                onClick &&
                onClick(card)
            }


            style={{


                ...size,


                flexShrink:0,


                background:"#292929",


                border:
                    "2px solid #777",


                borderRadius:"12px",


                padding:isBoard ? "4px" : "8px",


                boxSizing:"border-box",


                display:"flex",


                flexDirection:"column",


                cursor:"pointer",


                position:"relative",


                overflow:"hidden",


                boxShadow:
                    "0 5px 15px rgba(0,0,0,0.5)"


            }}


        >





            <div

                style={{

                    position:"absolute",

                    top:"4px",

                    left:"4px",

                    width:isBoard ? "18px" : "30px",

                    height:isBoard ? "18px" : "30px",

                    borderRadius:"50%",

                    background:"#3478db",

                    display:"flex",

                    alignItems:"center",

                    justifyContent:"center",

                    fontSize:isBoard ? "10px" : "14px",

                    fontWeight:"bold",

                    zIndex:3

                }}

            >

                {card.cost}

            </div>









            <div

                style={{

                    textAlign:"center",

                    fontWeight:"bold",

                    fontSize:isBoard ? "9px" : "14px",

                    height:isBoard ? "18px" : "25px",

                    overflow:"hidden"

                }}

            >

                {card.name}

            </div>









            <div

                style={{

                    width:"100%",


                    height:isBoard ? "75px" : "120px",


                    background:"#111",


                    overflow:"hidden",


                    borderRadius:"6px"

                }}

            >


                {

                card.image


                ?


                <img

                    src={card.image}

                    alt=""

                    style={{

                        width:"100%",


                        height:"100%",


                        objectFit:"cover"

                    }}

                />


                :


                <div>

                    АРТ

                </div>


                }


            </div>









            <div

                style={{

                    marginTop:"auto",

                    display:"flex",

                    justifyContent:"space-around",

                    fontWeight:"bold",

                    fontSize:isBoard ? "10px" : "14px"

                }}

            >

                <span>
                    ⚔️ {card.attack}
                </span>


                <span>
                    ❤️ {card.health}
                </span>


            </div>




        </div>

    );

}



window.Card = Card;
