function Hand({ cards, onCardClick }) {

    if (!cards) {
        return null;
    }

    return (

        <div style={styles.hand}>

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


const styles = {

    hand: {

        display: "flex",

        flexDirection: "row",

        flexWrap: "wrap",

        alignItems: "flex-start",

        justifyContent: "center",

        gap: "12px",

        width: "100%",

        padding: "15px",

        boxSizing: "border-box",

        overflowX: "auto"

    }

};
