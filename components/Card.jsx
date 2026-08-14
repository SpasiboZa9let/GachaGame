```jsx
import React from "react";


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
        width: "150px",
        height: "210px",

        background: "#292929",

        border: "2px solid #666",
        borderRadius: "10px",

        padding: "10px",

        position: "relative",

        display: "flex",
        flexDirection: "column",

        gap: "6px",

        cursor: "pointer",

        boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
    },


    cost: {
        position: "absolute",

        top: "5px",
        left: "5px",

        width: "28px",
        height: "28px",

        borderRadius: "50%",

        background: "#3478db",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontWeight: "bold"
    },


    name: {
        textAlign: "center",

        fontWeight: "bold",

        marginTop: "3px"
    },


    art: {
        flex: 1,

        minHeight: "70px",

        background: "#181818",

        borderRadius: "5px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        overflow: "hidden"
    },


    image: {
        width: "100%",
        height: "100%",

        objectFit: "cover"
    },


    noArt: {
        color: "#555"
    },


    description: {
        fontSize: "11px",

        color: "#aaa",

        minHeight: "25px",

        textAlign: "center"
    },


    stats: {
        display: "flex",

        justifyContent: "space-between",

        fontWeight: "bold",

        fontSize: "14px"
    }

};


export default Card;
```

