function Hand({ cards, onCardClick }) {

    return (

        <div style={styles.hand}>

            {cards.map(card => (

                <Card
                    key={card.id}
                    card={card}
                    onClick={onCardClick}
                />

            ))}

        </div>

    );

}


const styles = {

    hand: {

        minHeight: "230px",

        display: "flex",

        justifyContent: "center",

        alignItems: "flex-end",

        gap: "15px",

        padding: "20px",

        borderTop: "1px solid #333",

        background: "#111"

    }

};
