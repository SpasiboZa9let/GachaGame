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
