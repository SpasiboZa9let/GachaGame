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
                            onClick={() => {
                                if (onUnitClick) {
                                    onUnitClick(unit);
                                }
                            }}

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

    );

}



const styles = {

    /*
        =========================
        ПОЛЕ
        =========================

        КЛЮЧЕВОЕ:

        display: flex
        flex-direction: row
        flex-wrap: nowrap

        Поэтому:

        [Баба-Яга] [Шаман] [Карта]

        а не:

        [Баба-Яга]
        [Шаман]
        [Карта]
    */

    board: {

        width: "100%",

        minHeight: "210px",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "center",

        justifyContent: "flex-start",

        gap: "16px",

        padding: "20px",

        overflowX: "auto",

        overflowY: "hidden",

        boxSizing: "border-box"

    },


    empty: {

        width: "100%",

        textAlign: "center",

        color: "#555",

        fontSize: "14px"

    },


    /*
        =========================
        КАРТА НА ПОЛЕ
        =========================

        Фиксированный размер.

        Она НЕ должна растягиваться
        вместе с контейнером.
    */

    unit: {

        position: "relative",

        width: "150px",

        minWidth: "150px",

        maxWidth: "150px",

        height: "195px",

        minHeight: "195px",

        maxHeight: "195px",

        flex: "0 0 150px",

        background: "#292929",

        borderRadius: "10px",

        padding: "7px",

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

        top: "5px",

        left: "5px",

        width: "26px",

        height: "26px",

        borderRadius: "50%",

        background: "#3478db",

        color: "#fff",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "12px",

        fontWeight: "bold",

        zIndex: 5

    },


    name: {

        width: "100%",

        height: "24px",

        minHeight: "24px",

        lineHeight: "24px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "13px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    imageBox: {

        width: "100%",

        height: "105px",

        minHeight: "105px",

        maxHeight: "105px",

        background: "#111",

        border: "1px solid #555",

        borderRadius: "6px",

        overflow: "hidden",

        flexShrink: 0

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

        fontSize: "11px"

    },


    status: {

        width: "100%",

        height: "22px",

        minHeight: "22px",

        lineHeight: "22px",

        textAlign: "center",

        fontSize: "10px",

        color: "#aaa",

        overflow: "hidden"

    },


    stats: {

        width: "100%",

        height: "25px",

        minHeight: "25px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "2px 5px",

        fontSize: "13px",

        fontWeight: "bold",

        boxSizing: "border-box"

    }

};
