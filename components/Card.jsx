function Card({ card, onClick }) {

    if (!card) {
        return null;
    }

    return (

        <div
            style={styles.card}
            onClick={() => onClick && onClick(card)}
        >

            {/* Стоимость */}
            <div style={styles.cost}>
                {card.cost}
            </div>


            {/* Название */}
            <div style={styles.name}>
                {card.name}
            </div>


            {/* Арт */}
            <div style={styles.art}>

                {card.image ? (

                    <img
                        src={card.image}
                        alt={card.name}
                        style={styles.image}
                    />

                ) : (

                    <span style={styles.noArt}>
                        АРТ
                    </span>

                )}

            </div>


            {/* Описание */}
            <div style={styles.description}>
                {card.description}
            </div>


            {/* Характеристики */}
            <div style={styles.stats}>

                <span>
                    ⚔️ {card.attack}
                </span>

                <span>
                    ❤️ {card.health}
                </span>

            </div>

        </div>

    );
}


const styles = {

    card: {

        width: "180px",
        height: "260px",

        flex: "0 0 180px",

        background: "#292929",

        border: "2px solid #666",
        borderRadius: "12px",

        padding: "8px",

        position: "relative",

        display: "flex",
        flexDirection: "column",

        gap: "6px",

        cursor: "pointer",

        boxSizing: "border-box",

        boxShadow:
            "0 4px 12px rgba(0,0,0,0.5)"

    },


    cost: {

        position: "absolute",

        top: "6px",
        left: "6px",

        width: "30px",
        height: "30px",

        borderRadius: "50%",

        background: "#3478db",

        display: "flex",

        alignItems: "center",
        justifyContent: "center",

        fontWeight: "bold",

        zIndex: 2

    },


    name: {

        height: "24px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "14px",

        lineHeight: "24px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    art: {

        width: "100%",

        height: "125px",

        flex: "0 0 125px",

        background: "#181818",

        borderRadius: "7px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        overflow: "hidden",

        border: "1px solid #444"

    },


    image: {

        width: "100%",

        height: "100%",

        objectFit: "cover",

        display: "block"

    },


    noArt: {

        color: "#555",

        fontSize: "12px"

    },


    description: {

        flex: "1",

        fontSize: "11px",

        lineHeight: "14px",

        color: "#aaa",

        textAlign: "center",

        overflow: "hidden",

        padding: "2px"

    },


    stats: {

        display: "flex",

        justifyContent: "space-between",

        fontWeight: "bold",

        fontSize: "14px",

        padding: "2px 5px"

    }

};
