function Hand({ cards, onCardClick }) {

    if (!cards || cards.length === 0) {

        return (

            <div style={styles.emptyHand}>

                Рука пуста

            </div>

        );

    }


    return (

        <div style={styles.hand}>

            {cards.map((card, index) => {

                if (!card) {
                    return null;
                }


                return (

                    <Card
                        key={
                            card.id ||
                            index
                        }

                        card={card}

                        onClick={
                            onCardClick
                        }
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

        flexWrap: "nowrap",

        justifyContent: "center",

        alignItems: "flex-end",

        gap: "12px",

        width: "100%",

        minHeight: "230px",

        padding: "15px 10px",

        boxSizing: "border-box",

        overflowX: "auto"

    },


    emptyHand: {

        width: "100%",

        minHeight: "100px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#666",

        fontSize: "14px"

    }

};
