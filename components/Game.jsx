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
        =========================
        КЛИК ПО СВОЕМУ СУЩЕСТВУ
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
        КЛИК ПО СУЩЕСТВУ ПРОТИВНИКА
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


    console.log(
        "GAME STATE:",
        "turn:",
        gameState.turn,
        "mana:",
        player.mana,
        "maxMana:",
        player.maxMana
    );


    return (

        <div style={gameStyles.game}>


            {/* HEADER */}

            <header style={gameStyles.header}>

                <h1>
                    Тридевятое царство
                </h1>


                <div>

                    Ход:
                    {" "}
                    {gameState.turn}

                </div>

            </header>



            {/* ПРОТИВНИК */}

            <section>

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

            <section>

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

                        🔵
                        {" "}
                        {player.mana}
                        {" / "}
                        {player.maxMana}

                    </span>

                </div>

            </section>



            {/* РУКА */}

            <Hand
                cards={handCards}
                onCardClick={handleCardClick}
            />



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

        minHeight: "100vh",

        width: "100%",

        padding: "20px",

        boxSizing: "border-box",

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

        color: "#55aaff",

        fontWeight: "bold"

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
