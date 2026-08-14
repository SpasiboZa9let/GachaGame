function Hand({ cards, onCardClick }) {

    if (!cards) {
        return null;
    }

    return (
        <div
            style={{
                width: "100%",

                display: "flex",
                flexDirection: "row",
function Hand({ cards, onCardClick }) {

    if (!cards) {
        return null;
    }

    return (

        <div
            style={{
                width: "100%",

                display: "flex",

                flexDirection: "row",

                justifyContent: "center",

                alignItems: "flex-end",

                padding: "30px 20px 15px",

                boxSizing: "border-box",

                overflowX: "auto",

                minHeight: "300px",

                background:
                    "linear-gradient(#181818, #101010)",

                borderTop:
                    "1px solid #333"
            }}
        >

            {cards.map((card, index) => {

                if (!card) {
                    return null;
                }

                return (

                    <div
                        key={card.id || index}
                        style={{
                            marginLeft:
                                index === 0
                                    ? "0"
                                    : "-45px",

                            zIndex: index,

                            transition:
                                "margin 0.15s ease"
                        }}
                    >

                        <Card
                            card={card}
                            onClick={onCardClick}
                        />

                    </div>

                );

            })}

        </div>

    );
}
                flexWrap: "nowrap",

                justifyContent: "center",
                alignItems: "flex-start",

                gap: "15px",

                padding: "20px",

                boxSizing: "border-box",

                overflowX: "auto",

                background: "#151515",

                border: "2px solid yellow"
            }}
        >

            {cards.map((card, index) => {

                if (!card) {
                    return null;
                }

                return (
                    <Card
                        key={card.id || index}
                        card={card}
                        onClick={onCardClick}
                    />
                );

            })}

        </div>
    );
}
