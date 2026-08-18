function Hand({ cards, onCardClick }) {

    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div style={styles.hand}>

            {cards.map((card, index) => {

                if (!card) {
                    return null;
                }

                return (
                    <div
                        key={card.id || index}
                        style={styles.cardSlot}
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


const styles = {

    hand: {

        display: "grid",

        /*
         * ВСЕ карты находятся
         * в одной горизонтальной строке.
         */
        gridAutoFlow: "column",

        gridAutoColumns: "140px",

        gridTemplateRows: "200px",

        justifyContent: "center",

        alignItems: "start",

        columnGap: "12px",

        width: "100%",

        minHeight: "220px",

        padding: "10px",

        boxSizing: "border-box",

        overflowX: "auto",

        overflowY: "hidden"

    },


    cardSlot: {

        width: "140px",

        height: "200px",

        flexShrink: 0

    }

};
