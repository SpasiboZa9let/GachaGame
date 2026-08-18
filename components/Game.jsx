function Game() {

    const [gameState, setGameState] =
        React.useState(
            createInitialGameState()
        );

    const [selectedAttacker, setSelectedAttacker] =
        React.useState(null);


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


            {/* HEADER */}

            <header style={gameStyles.header}>

                <h1>
                    Тридевятое царство
                </h1>

                <div>
                    Ход: {gameState.turn}
                </div>

            </header>



            {/* ПРОТИВНИК */}

            <section style={gameStyles.playerSection}>

                <div style={gameStyles.hero}>

                    <strong>
                        Противник
                    </strong>

                    <span>
                        ❤️ {opponent.hp}
                    </span>

                </div>


                <Board
                    units={
                        opponent.board || []
                    }

                    onUnitClick={
                        handleOpponentUnitClick
                    }

                    selectedUnitId={null}
                />

            </section>



            {/* ЦЕНТР */}

            <div style={gameStyles.center}>

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

            </div>



            {/* ИГРОК */}

            <section style={gameStyles.playerSection}>

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
                        🔵 {player.mana} / {player.maxMana}
                    </span>

                </div>

            </section>



            {/* РУКА */}

            <div style={gameStyles.handWrapper}>

                <Hand
                    cards={handCards}
                    onCardClick={handleCardClick}
                />

            </div>



            {/* КНОПКА */}

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

    game: {

        width: "100%",

        minHeight: "100vh",

        padding: "20px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        gap: "10px"

    },


    header: {

        height: "55px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        borderBottom: "1px solid #444",

        padding: "0 10px",

        boxSizing: "border-box"

    },


    playerSection: {

        width: "100%",

        display: "flex",

        flexDirection: "column",

        gap: "5px"

    },


    hero: {

        height: "35px",

        display: "flex",

        gap: "20px",

        alignItems: "center",

        padding: "0 10px"

    },


    center: {

        height: "30px",

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


    /*
        Рука теперь получает
        отдельную область.

        Она находится ниже поля
        и не залезает на него.
    */

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

        border: "none",

        borderRadius: "8px",

        background: "#444",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px"

    }

};
