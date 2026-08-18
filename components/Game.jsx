function Game() {

    const [gameState, setGameState] =
        React.useState(
            createInitialGameState()
        );


    const [selectedAttacker, setSelectedAttacker] =
        React.useState(null);


    /*
        =========================
        РАЗЫГРЫВАНИЕ КАРТЫ
        =========================
    */

    function handleCardClick(card) {

        if (!card) {
            return;
        }

        if (gameState.activePlayer !== "player") {
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
        =========================
        СВОЁ СУЩЕСТВО
        =========================
    */

    function handlePlayerUnitClick(unit) {

        if (!unit) {
            return;
        }


        if (
            selectedAttacker ===
            unit.instanceId
        ) {

            setSelectedAttacker(null);

            return;

        }


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
        =========================
        СУЩЕСТВО ПРОТИВНИКА
        =========================
    */

    function handleOpponentUnitClick(unit) {

        if (!unit) {
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


        setGameState(newState);

        setSelectedAttacker(null);

    }


    /*
        =========================
        ЗАВЕРШЕНИЕ ХОДА
        =========================
    */

    function handleEndTurn() {

        console.log(
            "🔥 КНОПКА ЗАВЕРШИТЬ ХОД"
        );


        setSelectedAttacker(null);


        const newState =
            endTurn(gameState);


        setGameState(newState);

    }


    const player =
        gameState.player;


    const opponent =
        gameState.opponent;


    /*
        =========================
        КАРТЫ В РУКЕ
        =========================
    */

    const handCards =
        (player.hand || [])
            .map(card => {

                if (
                    card &&
                    typeof card === "object"
                ) {

                    return card;

                }


                if (
                    typeof card === "string" ||
                    typeof card === "number"
                ) {

                    return CARDS.find(
                        item =>
                            item.id === card
                    );

                }


                return null;

            })
            .filter(Boolean);


    return (

        <div style={gameStyles.game}>


            {/* =========================
                HEADER
            ========================== */}

            <header style={gameStyles.header}>

                <h1>
                    Тридевятое царство
                </h1>


                <div>
                    Ход: {gameState.turn}
                </div>

            </header>



            {/* =========================
                ИГРОВАЯ АРЕНА
            ========================== */}

            <div style={gameStyles.arena}>


                {/* =====================
                    ПРОТИВНИК
                ====================== */}

                <div style={gameStyles.playerPanel}>


                    <div style={gameStyles.hero}>

                        <strong>
                            Противник
                        </strong>


                        <span>
                            ❤️ {opponent.hp}
                        </span>

                    </div>


                    <div style={gameStyles.boardArea}>

                        <Board
                            units={
                                opponent.board || []
                            }

                            onUnitClick={
                                handleOpponentUnitClick
                            }

                            selectedUnitId={null}
                        />

                    </div>

                </div>



                {/* =====================
                    ЦЕНТР
                ====================== */}

                <div style={gameStyles.center}>

                    <div style={gameStyles.divider} />


                    {selectedAttacker ? (

                        <span
                            style={
                                gameStyles.attackMode
                            }
                        >

                            ⚔️ Выберите цель

                        </span>

                    ) : (

                        <span>

                            {
                                gameState.activePlayer ===
                                "player"

                                    ? "Ваш ход"

                                    : "Ход противника"
                            }

                        </span>

                    )}


                    <div style={gameStyles.divider} />

                </div>



                {/* =====================
                    ИГРОК
                ====================== */}

                <div style={gameStyles.playerPanel}>


                    <div style={gameStyles.boardArea}>

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

                    </div>


                    <div style={gameStyles.hero}>

                        <strong>
                            Игрок
                        </strong>


                        <span>
                            ❤️ {player.hp}
                        </span>


                        <span
                            style={
                                gameStyles.mana
                            }
                        >

                            🔵 {player.mana}
                            {" / "}
                            {player.maxMana}

                        </span>

                    </div>

                </div>

            </div>



            {/* =========================
                РУКА
            ========================== */}

            <div style={gameStyles.handArea}>

                <Hand
                    cards={handCards}
                    onCardClick={handleCardClick}
                />

            </div>



            {/* =========================
                КНОПКА
            ========================== */}

            <button
                onClick={handleEndTurn}
                style={gameStyles.endTurn}
            >

                Завершить ход

            </button>


        </div>

    );

}



const gameStyles = {

    /*
        =========================
        ОСНОВНАЯ СТРАНИЦА
        =========================
    */

    game: {

        width: "100%",

        minHeight: "100vh",

        padding: "20px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        gap: "12px"

    },


    /*
        =========================
        HEADER
        =========================
    */

    header: {

        width: "100%",

        height: "55px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        borderBottom: "1px solid #444",

        padding: "0 10px",

        boxSizing: "border-box"

    },


    /*
        =========================
        ГЛАВНАЯ АРЕНА
        =========================

        ФИКСИРОВАННЫЙ РАЗМЕР.

        Именно это нам сейчас нужно.
    */

    arena: {

        width: "100%",

        height: "570px",

        minHeight: "570px",

        maxHeight: "570px",

        background: "#111",

        border: "1px solid #444",

        borderRadius: "14px",

        padding: "10px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        overflow: "hidden"

    },


    /*
        =========================
        ПАНЕЛЬ ИГРОКА
        =========================
    */

    playerPanel: {

        width: "100%",

        height: "210px",

        minHeight: "210px",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        boxSizing: "border-box"

    },


    /*
        =========================
        HERO
        =========================
    */

    hero: {

        width: "100%",

        height: "35px",

        minHeight: "35px",

        display: "flex",

        alignItems: "center",

        gap: "20px",

        padding: "0 10px",

        boxSizing: "border-box"

    },


    /*
        =========================
        ОБЛАСТЬ ПОЛЯ
        =========================
    */

    boardArea: {

        width: "100%",

        height: "165px",

        minHeight: "165px",

        overflow: "hidden",

        boxSizing: "border-box"

    },


    /*
        =========================
        ЦЕНТР
        =========================
    */

    center: {

        width: "100%",

        height: "130px",

        minHeight: "130px",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        gap: "15px",

        color: "#777"

    },


    divider: {

        width: "80%",

        height: "1px",

        background: "#333"

    },


    attackMode: {

        color: "#ffd700",

        fontWeight: "bold",

        fontSize: "16px"

    },


    mana: {

        color: "#55aaff",

        fontWeight: "bold"

    },


    /*
        =========================
        РУКА
        =========================
    */

    handArea: {

        width: "100%",

        height: "270px",

        minHeight: "270px",

        overflow: "hidden",

        display: "flex",

        justifyContent: "center",

        boxSizing: "border-box"

    },


    /*
        =========================
        КНОПКА
        =========================
    */

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
