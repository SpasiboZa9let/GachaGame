function Board({
    units,
    onUnitClick,
    selectedUnitId
}) {

    return (

        <div style={styles.board}>

            {units.length === 0 ? (

                <div style={styles.empty}>
                    Поле пусто
                </div>

            ) : (

                units.map(unit => {

                    const card =
                        CARDS[unit.cardId];


                    const selected =
                        unit.instanceId ===
                        selectedUnitId;


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
                                        : 0.65
                            }}
                        >

                            <div style={styles.name}>
                                {card.name}
                            </div>


                            <div style={styles.status}>

                                {unit.canAttack
                                    ? "⚔️ Готов"
                                    : "💤 Ожидание"}

                            </div>


                            <div>
                                ⚔️ {unit.attack}
                            </div>


                            <div>
                                ❤️ {unit.health}
                            </div>

                        </div>

                    );

                })

            )}

        </div>

    );

}


const styles = {

    board: {

        minHeight: "150px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        gap: "15px",

        padding: "15px"

    },


    empty: {

        color: "#555"

    },


    unit: {

        width: "120px",

        height: "130px",

        background: "#292929",

        borderRadius: "10px",

        padding: "10px",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        cursor: "pointer",

        transition: "0.15s"

    },


    name: {

        fontWeight: "bold",

        textAlign: "center"

    },


    status: {

        fontSize: "11px",

        textAlign: "center",

        color: "#aaa"

    }

};
