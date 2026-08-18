function Hand({ cards, onCardClick }) {

    if (!cards || cards.length === 0) {
        return null;
    }


    return (

        <div style={handStyles.hand}>

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


const handStyles = {

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

    }

};
