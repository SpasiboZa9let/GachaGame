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
                maxWidth: "180px",

                background: "#292929",
                border: "3px solid red",
                borderRadius: "12px",

                padding: "8px",
                boxSizing: "border-box",

                display: "flex",
                flexDirection: "column",

                cursor: "pointer",

                flexShrink: 0
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    height: "25px"
                }}
            >
                {card.name}
            </div>


            <div
                style={{
                    width: "100%",
                    height: "150px",
                    minHeight: "150px",

                    background: "#111",

                    overflow: "hidden",

                    borderRadius: "6px"
                }}
            >

                {card.image && (
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
                )}

            </div>


            <div
                style={{
                    flex: 1,
                    fontSize: "11px",
                    textAlign: "center",
                    paddingTop: "5px"
                }}
            >
                {card.description}
            </div>


            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold"
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
