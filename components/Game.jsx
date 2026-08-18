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


    function handleEndTurn() {

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


    return (

        <div style={gameStyles.game}>


            <section style={gameStyles.opponentSection}>


                <div style={gameStyles.hero}>


                    <strong>

                        {opponentHero
                            ? opponentHero.name
                            : "Противник"}

                    </strong>


                    <span>

                        ❤️ {opponent.hp}

                    </span>


                    <span>

                        🛡️ {opponentHero
                            ? opponentHero.defense
                            : 0}

                    </span>


                    <span>

                        ⚔️ Сила {opponentHero
                            ? opponentHero.strength
                            : 0}

                    </span>


                    <span
                        style={
                            gameStyles.mana
                        }
                    >

                        🔵 {opponent.mana} / {opponent.maxMana}

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


            <div style={gameStyles.center}>


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

                        {playerHero
                            ? playerHero.name
                            : "Игрок"}

                    </strong>


                    <span>

                        ❤️ {player.hp}

                    </span>


                    <span>

                        🛡️ {playerHero
                            ? playerHero.defense
                            : 0}

                    </span>


                    <span>

                        ⚔️ Сила {playerHero
                            ? playerHero.strength
                            : 0}

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


            <div style={gameStyles.handWrapper}>


                <Hand
                    cards={handCards}
                    onCardClick={handleCardClick}
                />


            </div>


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

        color: "#ddd"

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

    }

};


window.Game = Game;
