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
        Рука.

        Карты идут:
        слева → направо.

        Никаких переносов
        на новую строку.
    */

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

        overflowX: "auto",

        overflowY: "hidden"

    },


    /*
        Контейнер карты.

        flexShrink: 0 очень важен:
        браузер не будет пытаться
        переносить или сжимать карты.
    */

    cardWrapper: {

        flex: "0 0 auto",

        flexShrink: 0,

        display: "block"

    }

};
