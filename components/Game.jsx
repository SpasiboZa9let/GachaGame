function Game() {

    const [gameState, setGameState] =
        React.useState(
            () => createInitialGameState()
        );


    const [selectedAttacker, setSelectedAttacker] =
        React.useState(null);


    const player =
        gameState.player;


    const opponent =
        gameState.opponent;


    const playerHero =
        player.hero;


    const opponentHero =
        opponent.hero;


    const handCards =
        (player.hand || [])
            .map(cardId =>
                getCardById(cardId)
            )
            .filter(card => card);


    function handleCardClick(card) {

        if (!card) {
            return;
        }


        if (gameState.gameOver) {
            return;
        }


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


        setGameState(
            newState
        );

    }


    function handlePlayerUnitClick(unit) {

        if (!unit) {
            return;
        }


        if (gameState.gameOver) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (selectedAttacker) {

            if (
                selectedAttacker ===
                unit.instanceId
            ) {

                setSelectedAttacker(
                    null
                );

                return;

            }

            return;

        }


        if (
            !canUnitAttack(unit)
        ) {

            return;

        }


        setSelectedAttacker(
            unit.instanceId
        );

    }


    function handleOpponentUnitClick(unit) {

        if (!unit) {
            return;
        }


        if (gameState.gameOver) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (!selectedAttacker) {
            return;
        }


        const newState =
            attackUnit(
                gameState,
                "player",
                selectedAttacker,
                unit.instanceId
            );


        setGameState(
            newState
        );


        setSelectedAttacker(
            null
        );

    }


    function handleOpponentHeroClick() {

        if (gameState.gameOver) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (!selectedAttacker) {
            return;
        }


        const newState =
            attackHero(
                gameState,
                "player",
                selectedAttacker
            );


        setGameState(
            newState
        );


        setSelectedAttacker(
            null
        );

    }


    function handleEndTurn() {

        if (gameState.gameOver) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        setSelectedAttacker(
            null
        );


        const newState =
            endTurn(
                gameState
            );


        setGameState(
            newState
        );

    }


    function handleRestart() {

        setSelectedAttacker(
            null
        );


        setGameState(
            createInitialGameState()
        );

    }


    /*
        Последние сообщения журнала.
    */

    const combatLog =
        gameState.combatLog || [];


    const visibleLog =
        combatLog.slice(-8);


    return (

        <div style={gameStyles.game}>


            {/* =========================
                GAME OVER
            ========================== */}

            {gameState.gameOver && (

                <div style={gameStyles.gameOver}>

                    <div
                        style={
                            gameStyles.gameOverTitle
                        }
                    >

                        {gameState.winner ===
                        "player"

                            ? "ПОБЕДА"

                            : "ПОРАЖЕНИЕ"

                        }

                    </div>


                    <div
                        style={
                            gameStyles.gameOverText
                        }
                    >

                        {gameState.winner ===
                        "player"

                            ? "Герой противника повержен."

                            : "Ваш герой повержен."

                        }

                    </div>


                    <button
                        onClick={
                            handleRestart
                        }

                        style={
                            gameStyles.restartButton
                        }
                    >

                        Начать заново

                    </button>

                </div>

            )}


            {/* =========================
                ПРОТИВНИК
            ========================== */}

            <section
                style={
                    gameStyles.opponentSection
                }
            >

                <div
                    onClick={
                        handleOpponentHeroClick
                    }

                    style={{
                        ...gameStyles.hero,

                        cursor:
                            selectedAttacker
                                ? "crosshair"
                                : "default",

                        border:
                            selectedAttacker
                                ? "2px solid #ffd700"
                                : "2px solid transparent"
                    }}
                >

                    <strong>

                        {opponentHero
                            ? opponentHero.name
                            : "Противник"}

                    </strong>


                    <span>

                        ❤️ {opponent.hp}

                    </span>


                    <span>

                        🛡️ {

                            opponentHero
                                ? opponentHero.defense
                                : 0

                        }

                    </span>


                    <span>

                        ⚔️ Сила {

                            opponentHero
                                ? opponentHero.strength
                                : 0

                        }

                    </span>


                    <span
                        style={
                            gameStyles.mana
                        }
                    >

                        🔵 {opponent.mana}
                        /
                        {opponent.maxMana}

                    </span>

                </div>


                <Board
                    units={
                        opponent.board || []
                    }

                    onUnitClick={
                        handleOpponentUnitClick
                    }

                    selectedUnitId={
                        null
                    }
                />

            </section>


            {/* =========================
                ЦЕНТР
            ========================== */}

            <div
                style={
                    gameStyles.center
                }
            >

                {gameState.gameOver ? (

                    <span
                        style={
                            gameStyles.attackMode
                        }
                    >
                        Игра окончена
                    </span>

                ) : selectedAttacker ? (

                    <span
                        style={
                            gameStyles.attackMode
                        }
                    >
                        Выберите цель для атаки
                    </span>

                ) : (

                    <span>
                        Ход: {gameState.turn}
                    </span>

                )}

            </div>


            {/* =========================
                ЖУРНАЛ БОЯ
            ========================== */}

            <div
                style={
                    gameStyles.combatLog
                }
            >

                <div
                    style={
                        gameStyles.logTitle
                    }
                >
                    Журнал боя
                </div>


                <div
                    style={
                        gameStyles.logMessages
                    }
                >

                    {visibleLog.map(
                        (message, index) => (

                            <div
                                key={
                                    index
                                }

                                style={
                                    gameStyles.logMessage
                                }
                            >
                                {message}
                            </div>

                        )
                    )}

                </div>

            </div>


            {/* =========================
                ИГРОК
            ========================== */}

            <section
                style={
                    gameStyles.playerSection
                }
            >

                <Board
                    units={
                        player.board || []
                    }

                    onUnitClick={
                        handlePlayerUnitClick
                    }

                    selectedUnitId={
                        selectedAttacker
                    }
                />


                <div
                    style={
                        gameStyles.hero
                    }
                >

                    <strong>

                        {playerHero
                            ? playerHero.name
                            : "Игрок"}

                    </strong>


                    <span>

                        ❤️ {player.hp}

                    </span>


                    <span>

                        🛡️ {

                            playerHero
                                ? playerHero.defense
                                : 0

                        }

                    </span>


                    <span>

                        ⚔️ Сила {

                            playerHero
                                ? playerHero.strength
                                : 0

                        }

                    </span>


                    <span
                        style={
                            gameStyles.mana
                        }
                    >

                        🔵 {player.mana}
                        /
                        {player.maxMana}

                    </span>

                </div>

            </section>


            {/* =========================
                РУКА
            ========================== */}

            <div
                style={
                    gameStyles.handWrapper
                }
            >

                <Hand
                    cards={handCards}
                    onCardClick={
                        handleCardClick
                    }
                />

            </div>


            {/* =========================
                КНОПКА ХОДА
            ========================== */}

            {!gameState.gameOver && (

                <button
                    onClick={
                        handleEndTurn
                    }

                    style={
                        gameStyles.endTurn
                    }
                >
                    Завершить ход
                </button>

            )}

        </div>

    );

}


const gameStyles = {

    game: {

        width: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        padding: "0 10px",

        boxSizing: "border-box"

    },


    opponentSection: {

        width: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center"

    },


    playerSection: {

        width: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center"

    },


    hero: {

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        gap: "18px",

        minHeight: "45px",

        padding: "8px 12px",

        boxSizing: "border-box",

        color: "#ddd",

        borderRadius: "8px",

        transition:
            "border 0.15s ease"

    },


    center: {

        height: "30px",

        minHeight: "30px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#777"

    },


    attackMode: {

        color: "#ffd700",

        fontWeight: "bold"

    },


    mana: {

        color: "#55aaff",

        fontWeight: "bold"

    },


    combatLog: {

        width: "min(700px, 95%)",

        height: "130px",

        background: "#111",

        border: "1px solid #333",

        borderRadius: "8px",

        margin: "5px 0 10px 0",

        padding: "8px",

        boxSizing: "border-box",

        overflow: "hidden"

    },


    logTitle: {

        fontSize: "12px",

        color: "#888",

        borderBottom:
            "1px solid #333",

        paddingBottom: "5px",

        marginBottom: "5px"

    },


    logMessages: {

        display: "flex",

        flexDirection: "column",

        gap: "3px",

        overflowY: "auto",

        height: "90px"

    },


    logMessage: {

        fontSize: "12px",

        color: "#bbb",

        lineHeight: "16px"

    },


    handWrapper: {

        width: "100%",

        minHeight: "230px",

        display: "flex",

        alignItems: "flex-end",

        justifyContent: "center",

        paddingTop: "10px",

        boxSizing: "border-box",

        overflow: "hidden"

    },


    endTurn: {

        alignSelf: "center",

        padding: "12px 30px",

        marginTop: "5px",

        marginBottom: "15px",

        border: "none",

        borderRadius: "8px",

        background: "#444",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px"

    },


    gameOver: {

        position: "fixed",

        top: "50%",

        left: "50%",

        transform:
            "translate(-50%, -50%)",

        width: "min(420px, 90%)",

        background: "#181818",

        border: "2px solid #555",

        borderRadius: "12px",

        padding: "30px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        gap: "15px",

        zIndex: 1000,

        boxShadow:
            "0 10px 40px rgba(0,0,0,0.8)"

    },


    gameOverTitle: {

        fontSize: "32px",

        fontWeight: "bold",

        color: "#ffd700"

    },


    gameOverText: {

        color: "#aaa",

        fontSize: "14px",

        textAlign: "center"

    },


    restartButton: {

        marginTop: "10px",

        padding: "12px 28px",

        border: "none",

        borderRadius: "8px",

        background: "#555",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px"

    }

};


window.Game = Game;
