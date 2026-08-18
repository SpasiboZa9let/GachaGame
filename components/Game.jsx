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


        if (
            gameState.gameOver
        ) {
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


        if (
            gameState.gameOver
        ) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (
            selectedAttacker
        ) {

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


        if (
            gameState.gameOver
        ) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (
            !selectedAttacker
        ) {
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

        if (
            gameState.gameOver
        ) {
            return;
        }


        if (
            gameState.activePlayer !==
            "player"
        ) {
            return;
        }


        if (
            !selectedAttacker
        ) {
            return;
        }


        if (
            opponent.hp <= 0
        ) {
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

        if (
            gameState.gameOver
        ) {
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


    const winnerText =

        gameState.winner ===
        "player"

            ? "ПОБЕДА"

            : gameState.winner ===
              "opponent"

                ? "ПОРАЖЕНИЕ"

                : "";


    return (

        <div style={gameStyles.game}>


            {/* =========================
                GAME OVER
            ========================== */}

            {gameState.gameOver && (

                <div
                    style={
                        gameStyles.gameOverOverlay
                    }
                >

                    <div
                        style={
                            gameStyles.gameOverBox
                        }
                    >

                        <div
                            style={
                                gameStyles.gameOverTitle
                            }
                        >
                            {winnerText}
                        </div>


                        <div
                            style={
                                gameStyles.gameOverText
                            }
                        >

                            {gameState.winner ===
                            "player"

                                ? "Илья Муромец одержал победу."

                                : "Василиса Премудрая одержала победу."}

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
                    style={
                        gameStyles.heroRow
                    }
                >

                   <Hero
    hero={playerHero}
    hp={player.hp}
    mana={player.mana}
    maxMana={player.maxMana}
/>

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

                {selectedAttacker ? (

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
                    gameStyles.log
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

                    {(gameState.combatLog || [])
                        .slice(-5)
                        .map(
                            (message, index) => (

                                <div
                                    key={index}
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


                <Hero
    hero={playerHero}
    hp={player.hp}
    mana={player.mana}
    maxMana={player.maxMana}
/>

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
                ЗАВЕРШЕНИЕ ХОДА
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

        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        padding: "0 10px 20px 10px",

        boxSizing: "border-box",

        position: "relative"

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


    heroRow: {

        display: "flex",

        justifyContent: "center",

        width: "100%"

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

        cursor: "default"

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


    log: {

        width: "100%",

        maxWidth: "700px",

        height: "110px",

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

        fontWeight: "bold",

        marginBottom: "5px"

    },


    logMessages: {

        height: "75px",

        overflowY: "auto",

        display: "flex",

        flexDirection: "column",

        gap: "3px"

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


    gameOverOverlay: {

        position: "fixed",

        left: "0",

        top: "0",

        width: "100%",

        height: "100%",

        background:
            "rgba(0,0,0,0.75)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 1000

    },


    gameOverBox: {

        width: "min(420px, 90%)",

        background: "#222",

        border: "1px solid #555",

        borderRadius: "12px",

        padding: "30px",

        boxSizing: "border-box",

        textAlign: "center",

        boxShadow:
            "0 10px 40px rgba(0,0,0,0.7)"

    },


    gameOverTitle: {

        fontSize: "32px",

        fontWeight: "bold",

        marginBottom: "15px",

        color: "#ffd700"

    },


    gameOverText: {

        fontSize: "16px",

        color: "#bbb",

        marginBottom: "25px"

    },


    restartButton: {

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
