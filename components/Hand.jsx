function Hand({ cards, onCardClick }) {

    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                width: "100%",
                overflowX: "auto",
                overflowY: "hidden",
                boxSizing: "border-box",
                padding: "20px 10px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "15px",
                    width: "max-content",
                    minWidth: "100%",
                    boxSizing: "border-box"
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

        </div>
    );
}
