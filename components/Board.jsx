function Board({ units, onUnitClick }) {

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

                    return (

                        <div
                            key={unit.instanceId}
                            style={styles.unit}
                            onClick={() =>
                                onUnitClick &&
                                onUnitClick(unit)
                            }
                        >

                            <div style={styles.name}>
                                {card.name}
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

        height: "120px",

        background: "#292929",

        border: "2px solid #777",

        borderRadius: "10px",

        padding: "10px",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        cursor: "pointer"

    },


    name: {

        fontWeight: "bold",

        textAlign: "center"

    }

};
