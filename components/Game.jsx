function Game() {

    const [gameState, setGameState] =
        React.useState(
            createInitialGameState()
        );


    /*
        ID выбранного атакующего.
    */

    const [selectedAttacker, setSelectedAttacker] =
        React.useState(null);


    /*
        Разыгрывание карты.
    */

    function handleCardClick(card) {

        if (
            gameState.activePlayer !==
            "player"
        ) {

            return;

        }


        const newState =
            playCard(
                gameState,
                "player",
                card.id
            );


        setGameState(newState);

    }


    /*
        Клик по своему существу.
    */

    function handlePlayerUnitClick(unit) {

        /*
            Если существо уже выбрано,
            повторный клик снимает выбор.
        */

        if (
            selectedAttacker ===
            unit.instanceId
        ) {

            setSelectedAttacker(null);

            return;

        }


        /*
            Проверяем, может ли оно атаковать.
        */

        if (!unit.canAttack) {

            console.log(
                "Это существо пока не может атаковать."
            );

            return;

        }


        setSelectedAttacker(
            unit.instanceId
        );

    }


    /*
        Клик по существу противника.
    */

    function handleOpponentUnitClick(unit) {

        if (!selectedAttacker) {

            return;

        }


        /*
            Проводим атаку.
        */

        const newState =
            attackUnit(
                gameState,

                "player",

                selectedAttacker,

                unit.instanceId
            );


        setGameState(newState);


        /*
            Сбрасываем выбор.
        */

        setSelectedAttacker(null);

    }


    /*
        Завершить ход.
    */

    function handleEndTurn() {

        setSelectedAttacker(null);

        const newState =
            endTurn(gameState);

        setGameState(newState);

    }


    const player =
        gameState.player;


    const opponent =
        gameState.opponent;


    const handCards =
        player.hand.map(
            cardId =>
                CARDS[cardId]
        );


    return (

        <div style={styles.game}>


            {/* =========================
                HEADER
            ========================== */}

            <header style={styles.header}>

                <h1>
                    Тридевятое царство
                </h1>


                <div>

                    Ход:
                    {" "}
                    {gameState.turn}

                </div>

            </header>



            {/* =========================
                ПРОТИВНИК
            ========================== */}

            <section>

                <div style={styles.hero}>

                    <strong>
                        Противник
                    </strong>


                    <span>
                        ❤️ {opponent.hp}
                    </span>

                </div>


                <div style={styles.board}>

                    <Board
                        units={opponent.board}

                        onUnitClick={
                            handleOpponentUnitClick
                        }

                        selectedUnitId={null}
                    />

                </div>

            </section>



            {/* =========================
                ИНДИКАТОР АТАКИ
            ========================== */}

            <div style={styles.center}>

                {selectedAttacker ? (

                    <span style={styles.attackMode}>

                        ⚔️ Выберите цель

                    </span>

                ) : (

                    <span>
                        Ваш ход
                    </span>

                )}

            </div>



            {/* =========================
                ИГРОК
            ========================== */}

            <section>

                <div style={styles.board}>

                    <Board
                        units={player.board}

                        onUnitClick={
                            handlePlayerUnitClick
                        }

                        selectedUnitId={
                            selectedAttacker
                        }

                    />

                </div>


                <div style={styles.hero}>

                    <strong>
                        Игрок
                    </strong>


                    <span>
                        ❤️ {player.hp}
                    </span>


                    <span style={styles.mana}>

                        🔵

                        {" "}

                        {player.mana}

                        {" / "}

                        {player.maxMana}

                    </span>

                </div>

            </section>



            {/* =========================
                РУКА
            ========================== */}

            <Hand
                cards={handCards}
                onCardClick={handleCardClick}
            />



            {/* =========================
                КНОПКА ХОДА
            ========================== */}

            <button
                onClick={handleEndTurn}
                style={styles.endTurn}
            >

                Завершить ход

            </button>


        </div>

    );

}



const styles = {

    game: {

        minHeight: "100vh",

        padding: "20px",

        display: "flex",

        flexDirection: "column",

        gap: "15px"

    },


    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        borderBottom: "1px solid #444",

        paddingBottom: "10px"

    },


    hero: {

        display: "flex",

        gap: "20px",

        alignItems: "center",

        padding: "10px"

    },


    board: {

        background: "#202020",

        border: "1px solid #444",

        borderRadius: "10px"

    },


    center: {

        textAlign: "center",

        color: "#777",

        minHeight: "25px"

    },


    attackMode: {

        color: "#ffd700",

        fontWeight: "bold"

    },


    mana: {

        color: "#55aaff"

    },


    endTurn: {

        alignSelf: "center",

        padding: "12px 30px",

        border: "none",

        borderRadius: "8px",

        background: "#444",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px"

    }

};
