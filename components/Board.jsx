function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {

    return (

        <div style={styles.board}>

            <div style={styles.cardsArea}>

                {(!units || units.length === 0) ? (

                    <div style={styles.empty}>
                        Поле пусто
                    </div>

                ) : (

                    units.map(unit => {

                        if (!unit) {
                            return null;
                        }

                        const card =
                            CARDS.find(
                                item =>
                                    item.id === unit.cardId
                            );

                        if (!card) {
                            return null;
                        }

                        const selected =
                            unit.instanceId === selectedUnitId;

                        return (

                            <div
                                key={unit.instanceId}

                                onClick={() =>
                                    onUnitClick &&
                                    onUnitClick(unit)
                                }

                                style={{
                                    ...styles.unit,

                                    border:
                                        selected
                                            ? "3px solid #ffd700"
                                            : "2px solid #777",

                                    opacity:
                                        unit.canAttack
                                            ? 1
                                            : 0.65,

                                    boxShadow:
                                        selected
                                            ? "0 0 15px rgba(255,215,0,0.6)"
                                            : "0 5px 12px rgba(0,0,0,0.5)"
                                }}
                            >

                                {/* СТОИМОСТЬ */}

                                <div style={styles.cost}>
                                    {card.cost}
                                </div>


                                {/* НАЗВАНИЕ */}

                                <div style={styles.name}>
                                    {card.name}
                                </div>


                                {/* ИЗОБРАЖЕНИЕ */}

                                <div style={styles.imageBox}>

                                    {card.image ? (

                                        <img
                                            src={card.image}
                                            alt={card.name}
                                            style={styles.image}
                                        />

                                    ) : (

                                        <div style={styles.noImage}>
                                            АРТ
                                        </div>

                                    )}

                                </div>


                                {/* СТАТУС */}

                                <div style={styles.status}>

                                    {unit.canAttack
                                        ? "⚔️ Готов"
                                        : "💤 Ожидание"}

                                </div>


                                {/* ХАРАКТЕРИСТИКИ */}

                                <div style={styles.stats}>

                                    <span>
                                        ⚔️ {unit.attack}
                                    </span>

                                    <span>
                                        ❤️ {unit.health}
                                    </span>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    );

}


const styles = {

    /*
        ВНЕШНЯЯ ОБЛАСТЬ ПОЛЯ.

        Фиксированная высота.
        Карты не могут физически
        вылезти за её границы.
    */

    board: {

        width: "100%",

        height: "210px",

        minHeight: "210px",

        maxHeight: "210px",

        background: "#202020",

        border: "1px solid #444",

        borderRadius: "10px",

        boxSizing: "border-box",

        overflow: "hidden",

        padding: "10px"

    },


    /*
        ВНУТРЕННЯЯ ОБЛАСТЬ.

        Карты лежат строго:
        слева → направо.

        Никакого переноса
        и вертикального стека.
    */

    cardsArea: {

        width: "100%",

        height: "100%",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "flex-start",

        justifyContent: "flex-start",

        gap: "12px",

        padding: "8px 8px 12px 8px",

        boxSizing: "border-box",

        overflow: "hidden"

    },


    empty: {

        width: "100%",

        height: "100%",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#555"

    },


    /*
        КАРТА НА ПОЛЕ.

        Она специально меньше карты
        в руке.
    */

    unit: {

        position: "relative",

        width: "120px",

        minWidth: "120px",

        maxWidth: "120px",

        height: "165px",

        minHeight: "165px",

        maxHeight: "165px",

        background: "#292929",

        borderRadius: "10px",

        padding: "6px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        flexShrink: 0,

        cursor: "pointer",

        transition:
            "transform 0.15s ease, box-shadow 0.15s ease"

    },


    cost: {

        position: "absolute",

        top: "4px",

        left: "4px",

        width: "24px",

        height: "24px",

        borderRadius: "50%",

        background: "#3478db",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "12px",

        fontWeight: "bold",

        zIndex: 3

    },


    name: {

        height: "20px",

        minHeight: "20px",

        lineHeight: "20px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "12px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    imageBox: {

        width: "100%",

        height: "85px",

        minHeight: "85px",

        background: "#111",

        border: "1px solid #555",

        borderRadius: "6px",

        overflow: "hidden"

    },


    image: {

        width: "100%",

        height: "100%",

        objectFit: "cover",

        display: "block"

    },


    noImage: {

        width: "100%",

        height: "100%",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#555",

        fontSize: "10px"

    },


    status: {

        textAlign: "center",

        fontSize: "9px",

        color: "#aaa",

        paddingTop: "3px"

    },


    stats: {

        display: "flex",

        justifyContent: "space-between",

        padding: "3px 4px",

        fontSize: "12px",

        fontWeight: "bold"

    }

};
