function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {

    const safeUnits = Array.isArray(units)
        ? units.filter(Boolean)
        : [];


    return (

        <div style={styles.board}>

            {safeUnits.length === 0 ? (

                <div style={styles.empty}>
                    Поле пусто
                </div>

            ) : (

                safeUnits.map(unit => {

                    const card = CARDS.find(
                        item => item.id === unit.cardId
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

                                border: selected
                                    ? "3px solid #ffd700"
                                    : "2px solid #777",

                                opacity:
                                    unit.canAttack
                                        ? 1
                                        : 0.65,

                                boxShadow: selected
                                    ? "0 0 18px rgba(255,215,0,0.7)"
                                    : "0 4px 10px rgba(0,0,0,0.5)"
                            }}
                        >

                            <div style={styles.cost}>
                                {card.cost}
                            </div>


                            <div style={styles.name}>
                                {card.name}
                            </div>


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


                            <div style={styles.status}>

                                {unit.canAttack
                                    ? "⚔️ Готов"
                                    : "💤 Ожидание"}

                            </div>


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

    );

}



const styles = {

    /*
        ФИКСИРОВАННОЕ ИГРОВОЕ ПОЛЕ

        Никакого overflow-x.
        Никакого скролла.

        Карты всегда находятся
        внутри одной сцены.
    */

    board: {

        width: "100%",

        height: "230px",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "center",

        justifyContent: "center",

        gap: "12px",

        padding: "15px",

        boxSizing: "border-box",

        overflow: "hidden"

    },


    empty: {

        color: "#555",

        fontSize: "14px",

        textAlign: "center"

    },


    /*
        Карта существа.

        5 таких карт спокойно
        помещаются в игровое поле.
    */

    unit: {

        position: "relative",

        width: "140px",

        minWidth: "0",

        height: "190px",

        minHeight: "190px",

        flex: "1 1 0",

        maxWidth: "140px",

        background: "#292929",

        borderRadius: "10px",

        padding: "7px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        cursor: "pointer",

        transition:
            "transform 0.15s ease, box-shadow 0.15s ease"

    },


    cost: {

        position: "absolute",

        top: "5px",

        left: "5px",

        width: "25px",

        height: "25px",

        borderRadius: "50%",

        background: "#3478db",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontWeight: "bold",

        fontSize: "12px",

        zIndex: 5

    },


    name: {

        height: "24px",

        minHeight: "24px",

        lineHeight: "24px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "12px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    imageBox: {

        width: "100%",

        height: "100px",

        minHeight: "100px",

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

        height: "22px",

        minHeight: "22px",

        lineHeight: "22px",

        textAlign: "center",

        fontSize: "9px",

        color: "#aaa"

    },


    stats: {

        height: "25px",

        minHeight: "25px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "2px 4px",

        fontSize: "12px",

        fontWeight: "bold"

    }

};
