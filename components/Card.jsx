function Card({ card, onClick }) {


    if (!card) {

        return null;

    }




    return (

        <div

            onClick={() =>
                onClick &&
                onClick(card)
            }


            style={{

                width:"180px",

                height:"260px",

                minWidth:"180px",

                flexShrink:0,

                background:"#292929",

                border:
                    "2px solid #777",

                borderRadius:"12px",

                padding:"8px",

                boxSizing:"border-box",

                display:"flex",

                flexDirection:"column",

                cursor:"pointer",

                position:"relative",

                boxShadow:
                    "0 5px 15px rgba(0,0,0,0.5)",

                transition:
                    "transform 0.15s ease"

            }}



            onMouseEnter={(e)=>{

                e.currentTarget.style.transform =
                    "translateY(-15px)";

            }}



            onMouseLeave={(e)=>{

                e.currentTarget.style.transform =
                    "translateY(0)";

            }}

        >




            {/* COST */}

            <div

                style={{

                    position:"absolute",

                    top:"6px",

                    left:"6px",

                    width:"30px",

                    height:"30px",

                    borderRadius:"50%",

                    background:"#3478db",

                    display:"flex",

                    alignItems:"center",

                    justifyContent:"center",

                    fontWeight:"bold",

                    zIndex:3

                }}

            >

                {card.cost}

            </div>







            {/* NAME */}

            <div

                style={{

                    textAlign:"center",

                    fontWeight:"bold",

                    fontSize:"14px",

                    height:"25px",

                    lineHeight:"25px",

                    whiteSpace:"nowrap",

                    overflow:"hidden",

                    textOverflow:"ellipsis"

                }}

            >

                {card.name}

            </div>









            {/* IMAGE */}

            <div

                style={{

                    width:"100%",

                    height:"120px",

                    background:"#111",

                    overflow:"hidden",

                    borderRadius:"7px",

                    border:"1px solid #555"

                }}

            >

                {

                card.image

                ?

                <img

                    src={card.image}

                    alt={card.name}

                    style={{

                        width:"100%",

                        height:"100%",

                        objectFit:"cover"

                    }}

                />

                :

                <div

                    style={{

                        height:"100%",

                        display:"flex",

                        alignItems:"center",

                        justifyContent:"center",

                        color:"#555"

                    }}

                >

                    АРТ

                </div>

                }

            </div>









            {/* ABILITIES */}

            {

            card.abilities &&

            card.abilities.length > 0

            &&

            <div

                style={{

                    marginTop:"5px",

                    padding:"4px",

                    background:"#151515",

                    borderRadius:"6px",

                    fontSize:"10px",

                    color:"#ffd700",

                    height:"35px",

                    overflow:"hidden"

                }}

            >


                {

                card.abilities.map(

                    ability =>

                    <div

                        key={ability.id}

                    >

                        ⭐ {ability.name}

                    </div>

                )

                }


            </div>


            }









            {/* DESCRIPTION */}

            <div

                style={{

                    flex:1,

                    fontSize:"10px",

                    lineHeight:"12px",

                    color:"#aaa",

                    textAlign:"center",

                    padding:"3px",

                    overflow:"hidden"

                }}

            >

                {

                card.abilities &&

                card.abilities[0]

                ?

                card.abilities[0].description

                :

                card.description

                }


            </div>









            {/* STATS */}

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    fontWeight:"bold",

                    fontSize:"14px",

                    padding:"3px"

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
