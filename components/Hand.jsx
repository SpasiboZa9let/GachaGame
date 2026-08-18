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

                    <div
                        key={card.id || index}
                        style={styles.cardWrapper}
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

    /*
        Вся рука располагается
        строго в одну горизонтальную линию.
    */

    hand: {

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        justifyContent: "center",

        alignItems: "flex-end",

        gap: "14px",

        width: "100%",

        minHeight: "250px",

        padding: "20px",

        boxSizing: "border-box",

        overflowX: "auto",

        overflowY: "hidden"

    },


    /*
        Каждая карта является отдельным
        горизонтальным элементом руки.

        flexShrink: 0 не позволяет браузеру
        сжимать карты.
    */

    cardWrapper: {

        flex: "0 0 auto",

        flexShrink: 0,

        width: "180px",

        height: "250px",

        display: "flex",

        justifyContent: "center",

        alignItems: "flex-end"

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
