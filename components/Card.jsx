function Card({ card, onClick }) {


    if (!card) {
        return null;
    }


    const rarityColors = {

        common: "#777",

        uncommon: "#32a852",

        rare: "#2980db",

        epic: "#9b59b6",

        legendary: "#f1c40f"

    };


    const rarityGlow = {

        legendary:
            "0 0 15px rgba(241,196,15,0.7)",

        epic:
            "0 0 12px rgba(155,89,182,0.6)",

        rare:
            "0 0 8px rgba(41,128,219,0.5)"

    };


    return (

        <div

            onClick={() =>
                onClick &&
                onClick(card)
            }


            style={{


                width: "180px",

                height: "260px",

                minWidth: "180px",

                flexShrink: 0,


                background: "#292929",


                border:
                    `3px solid ${rarityColors[card.rarity] || "#777"}`,


                borderRadius: "12px",


                padding: "8px",


                boxSizing: "border-box",


                display: "flex",

                flexDirection: "column",


                cursor: "pointer",


                position: "relative",


                boxShadow:

                    rarityGlow[card.rarity] ||

                    "0 5px 15px rgba(0,0,0,0.5)",


                transition:
                    "transform 0.15s ease, box-shadow 0.15s ease"


            }}



            onMouseEnter={(e) => {


                e.currentTarget.style.transform =
                    "translateY(-15px)";


                e.currentTarget.style.boxShadow =

                    rarityGlow[card.rarity] ||

                    "0 12px 25px rgba(0,0,0,0.7)";


            }}



            onMouseLeave={(e) => {


                e.currentTarget.style.transform =
                    "translateY(0)";


                e.currentTarget.style.boxShadow =

                    rarityGlow[card.rarity] ||

                    "0 5px 15px rgba(0,0,0,0.5)";


            }}



        >


            {/* COST */}

            <div

                style={{

                    position: "absolute",

                    top: "6px",

                    left: "6px",


                    width: "30px",

                    height: "30px",


                    borderRadius: "50%",


                    background: "#3478db",


                    display: "flex",


                    alignItems: "center",


                    justifyContent: "center",


                    fontWeight: "bold",


                    zIndex: 3

                }}

            >

                {card.cost}

            </div>




            {/* NAME */}

            <div

                style={{


                    textAlign: "center",


                    fontWeight: "bold",


                    fontSize: "14px",


                    height: "25px",


                    lineHeight: "25px",


                    whiteSpace: "nowrap",


                    overflow: "hidden",


                    textOverflow: "ellipsis"


                }}

            >

                {card.name}


            </div>




            {/* RARITY */}

            <div

                style={{


                    textAlign: "center",


                    fontSize: "10px",


                    color:
                        rarityColors[card.rarity] || "#aaa",


                    fontWeight: "bold",


                    height: "14px"


                }}

            >

                {card.rarity?.toUpperCase()}


            </div>





            {/* IMAGE */}

            <div

                style={{


                    width: "100%",


                    height: "135px",


                    minHeight: "135px",


                    background: "#111",


                    overflow: "hidden",


                    borderRadius: "7px",


                    border:
                        "1px solid #555"


                }}

            >


                {card.image ? (


                    <img


                        src={card.image}


                        alt={card.name}


                        style={{


                            width: "100%",


                            height: "100%",


                            objectFit: "cover",


                            display: "block"


                        }}


                    />


                ) : (


                    <div

                        style={{


                            width: "100%",


                            height: "100%",


                            display: "flex",


                            alignItems: "center",


                            justifyContent: "center",


                            color: "#555"


                        }}

                    >

                        АРТ

                    </div>


                )}


            </div>





            {/* DESCRIPTION */}

            <div

                style={{


                    flex: 1,


                    fontSize: "11px",


                    lineHeight: "14px",


                    color: "#aaa",


                    textAlign: "center",


                    padding: "5px",


                    overflow: "hidden"


                }}

            >

                {card.description}


            </div>





            {/* STATS */}

            <div

                style={{


                    display: "flex",


                    justifyContent:
                        "space-between",


                    fontWeight: "bold",


                    fontSize: "14px",


                    padding:
                        "3px 5px"


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
