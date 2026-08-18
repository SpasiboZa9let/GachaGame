function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {

    /*
        Защита от undefined.
    */

    const safeUnits =
        Array.isArray(units)
            ? units
            : [];


    return (

        <div style={styles.board}>

            {safeUnits.length === 0 ? (

                <div style={styles.empty}>
                    Поле пусто
                </div>

            ) : (

                safeUnits.map(unit => {

                    /*
                        Получаем исходную карту
                        по её ID.
                    */

                    const card =
                        CARDS[unit.cardId];


                    /*
                        Если карта не найдена,
                        не ломаем весь Board.
                    */

                    if (!card) {

                        console.warn(
                            "Карта не найдена:",
                            unit.cardId
                        );

                        return null;

                    }


                    /*
                        Проверяем,
                        выбрано ли это существо.
                    */

                    const selected =
                        unit.instanceId ===
                        selectedUnitId;


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

                                border:
                                    selected
                                        ? "3px solid #ffd700"
                                        : "2px solid #777",

                                opacity:
                                    unit.canAttack
                                        ? 1
                                        : 0.65,

                                transform:
                                    selected
                                        ? "translateY(-5px)"
                                        : "translateY(0)"
                            }}
                        >

                            {/* НАЗВАНИЕ */}

                            <div style={styles.name}>
                                {card.name}
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
        Главное поле.

        Именно здесь задаётся
        горизонтальное расположение.
    */

    board: {

        width: "100%",

        minHeight: "170px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "center",

        justifyContent: "center",

        gap: "15px",

        padding: "20px",

        overflowX: "auto",

        overflowY: "hidden"

    },


    empty: {

        color: "#555",

        fontSize: "14px"

    },


    /*
        Отдельное существо.
    */

    unit: {

        width: "120px",

        minWidth: "120px",

        maxWidth: "120px",

        height: "130px",

        minHeight: "130px",

        maxHeight: "130px",

        flex: "0 0 120px",

        background: "#292929",

        borderRadius: "10px",

        padding: "10px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        cursor: "pointer",

        transition:
            "transform 0.15s ease, border 0.15s ease",

        userSelect: "none"

    },


    name: {

        fontWeight: "bold",

        textAlign: "center",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    status: {

        fontSize: "11px",

        textAlign: "center",

        color: "#aaa"

    },


    stats: {

        display: "flex",

        justifyContent: "space-between",

        fontWeight: "bold",

        fontSize: "13px"

    }

};
