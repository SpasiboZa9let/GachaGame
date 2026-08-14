function Card({ card, onClick }) {

    if (!card) {
        return null;
    }

    return (
        <div
            onClick={() => onClick && onClick(card)}
            style={{
                width: "180px",
                height: "260px",
                minWidth: "180px",

                background: "#292929",

                border: "2px solid #777",
                borderRadius: "12px",

                padding: "8px",
                boxSizing: "border-box",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                flexShrink: 0,

                position: "relative",

                transition:
                    "transform 0.15s ease, box-shadow 0.15s ease",

                boxShadow:
                    "0 5px 15px rgba(0,0,0,0.5)"
            }}
            onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                    "translateY(-15px)";

                e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.7)";

            }}
            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.boxShadow =
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


            {/* ART */}

            <div
                style={{
                    width: "100%",

                    height: "150px",

                    minHeight: "150px",

                    background: "#111",

                    overflow: "hidden",

                    borderRadius: "7px",

                    border: "1px solid #555"
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

                    justifyContent: "space-between",

                    fontWeight: "bold",

                    fontSize: "14px",

                    padding: "3px 5px"
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
