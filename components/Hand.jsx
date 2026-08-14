function Hand({ cards = [], onCardClick }) {

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

        justifyContent: "center",

        alignItems: "flex-end",

        gap: "12px",

        padding: "20px",

        minHeight: "230px",

        background: "#151515",

        borderTop: "2px solid #333"

    }

};
