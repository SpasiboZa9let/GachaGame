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
                                item.id ===
                                unit.cardId
                        );


                    if (!card) {
                        return null;
                    }


                    const selected =
                        unit.instanceId ===
                        selectedUnitId;


                    return (

                        <div

                            key={
                                unit.instanceId
                            }

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

                                        ? "0 0 20px rgba(255,215,0,0.7)"

                                        : "0 5px 12px rgba(0,0,0,0.5)"

                            }}

                        >

                            {/* COST */}

                            <div
                                style={styles.cost}
                            >

                                {card.cost}

                            </div>


                            {/* NAME */}

                            <div
                                style={styles.name}
                            >

                                {card.name}

                            </div>


                            {/* IMAGE */}

                            <div
                                style={
                                    styles.imageBox
                                }
                            >

                                {card.image ? (

                                    <img

                                        src={
                                            card.image
                                        }

                                        alt={
                                            card.name
                                        }

                                        style={
                                            styles.image
                                        }

                                    />

                                ) : (

                                    <div
                                        style={
                                            styles.noImage
                                        }
                                    >

                                        АРТ

                                    </div>

                                )}

                            </div>


                            {/* STATUS */}

                            <div
                                style={
                                    styles.status
                                }
                            >

                                {
                                    unit.canAttack

                                        ? "⚔️ Готов"

                                        : "💤 Ожидание"
                                }

                            </div>


                            {/* STATS */}

                            <div
                                style={
                                    styles.stats
                                }
                            >

                                <span>
                                    ⚔️ {
                                        unit.attack
                                    }
                                </span>

                                <span>
                                    ❤️ {
                                        unit.health
                                    }
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
        ПОЛЕ

        Жёстко задаём горизонтальное
        направление.
    */

    board: {

        width: "100%",

        minHeight: "230px",

        display: "flex",

        flexDirection: "row",

        flexWrap: "nowrap",

        alignItems: "center",

        justifyContent: "flex-start",

        gap: "20px",

        padding: "20px",

        overflowX: "auto",

        overflowY: "hidden",

        boxSizing: "border-box"

    },


    empty: {

        width: "100%",

        textAlign: "center",

        color: "#555"

    },


    /*
        КАРТА НА ПОЛЕ

        180 × 260 — карта в руке.

        Здесь примерно в 1.5 раза
        меньше, чтобы поле не раздувалось.
    */

    unit: {

        position: "relative",

        width: "135px",

        minWidth: "135px",

        height: "195px",

        minHeight: "195px",

        flexShrink: 0,

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

        fontSize: "12px",

        fontWeight: "bold",

        zIndex: 3

    },


    name: {

        height: "22px",

        lineHeight: "22px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "12px",

        whiteSpace: "nowrap",

        overflow: "hidden",

        textOverflow: "ellipsis"

    },


    imageBox: {

        width: "100%",

        height: "105px",

        minHeight: "105px",

        background: "#111",

        border:
            "1px solid #555",

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

        color: "#555"

    },


    status: {

        textAlign: "center",

        fontSize: "9px",

        color: "#aaa",

        paddingTop: "4px"

    },


    stats: {

        display: "flex",

        justifyContent:
            "space-between",

        padding:
            "4px",

        fontSize: "12px",

        fontWeight: "bold"

    }

};
