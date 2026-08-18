function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {

    return (

        <div style={styles.board}>

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
                                        ? "4px solid #ffd700"
                                        : "2px solid #777",

                                opacity:
                                    unit.canAttack
                                        ? 1
                                        : 0.65,

                                boxShadow:
                                    selected
                                        ? "0 0 25px rgba(255,215,0,0.8)"
                                        : "0 5px 15px rgba(0,0,0,0.6)"
                            }}
                        >

                            {/* COST */}

                            <div style={styles.cost}>
                                {card.cost}
                            </div>


                            {/* NAME */}

                            <div style={styles.name}>
                                {card.name}
                            </div>


                            {/* IMAGE */}

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


                            {/* STATUS */}

                            <div style={styles.status}>

                                {unit.canAttack
                                    ? "⚔️ Готов"
                                    : "💤 Ожидание"}

                            </div>


                            {/* STATS */}

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
        САМО ПОЛЕ

        Только горизонтальный ряд.
    */

    board: {

        width: "100%",

        minHeight: "300px",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "center",

        justifyContent: "flex-start",

        gap: "20px",

        padding: "20px",

        boxSizing: "border-box",

        overflowX: "auto",

        overflowY: "hidden"

    },


    empty: {

        width: "100%",

        textAlign: "center",

        color: "#555",

        fontSize: "16px"

    },


    /*
        КАРТА НА ПОЛЕ

        Теперь она РОВНО такого же
        физического размера, как карта
        в руке.

        Никаких 120x165.
        Никаких ограничений родителя.
    */

    unit: {

        width: "180px",

        minWidth: "180px",

        maxWidth: "180px",

        height: "260px",

        minHeight: "260px",

        maxHeight: "260px",

        flex: "0 0 180px",

        flexShrink: 0,

        position: "relative",

        background: "#292929",

        borderRadius: "12px",

        padding: "8px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        cursor: "pointer",

        overflow: "hidden",

        transition:
            "transform 0.15s ease, box-shadow 0.15s ease"

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

        fontSize: "14px",

        fontWeight: "bold",

        zIndex: 3

    },


    name: {

        height: "25px",

        minHeight: "25px",

        lineHeight: "25px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "14px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    imageBox: {

        width: "100%",

        height: "150px",

        minHeight: "150px",

        background: "#111",

        border: "1px solid #555",

        borderRadius: "7px",

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

        color: "#555"

    },


    status: {

        textAlign: "center",

        fontSize: "11px",

        color: "#aaa",

        paddingTop: "6px"

    },


    stats: {

        display: "flex",

        justifyContent: "space-between",

        padding: "6px 5px",

        fontSize: "14px",

        fontWeight: "bold"

    }

};
