function Game() {

    const [gameState, setGameState] =
        React.useState(
            createInitialGameState()
        );


    /*
        ID выбранного атакующего существа.
    */

    const [selectedAttacker, setSelectedAttacker] =
        React.useState(null);


    /*
        Получаем каталог карт.
    */

    const cards =
        window.CARDS || [];


    /*
        Разыгрывание карты из руки.
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


        /*
            Проверяем наличие маны.
        */

        if (
            card.cost >
            gameState.player.mana
        ) {

            console.log(
                "Недостаточно маны."
            );

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

        if (!unit) {
            return;
        }


        /*
            Если существо уже выбрано —
            снимаем выбор.
        */

        if (
            selectedAttacker ===
            unit.instanceId
        ) {

            setSelectedAttacker(null);

            return;

        }


        /*
            Проверяем возможность атаки.
        */

        if (!unit.canAttack) {

            console.log(
                "Это существо пока не может атаковать."
            );

            return;

        }


        /*
            Выбираем атакующего.
        */

        setSelectedAttacker(
            unit.instanceId
        );

    }


    /*
        Клик по существу противника.
    */

    function handleOpponentUnitClick(unit) {

        if (!unit) {
            return;
        }


        /*
            Если атакующий не выбран —
            ничего не делаем.
        */

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
            Сбрасываем выбранного атакующего.
        */

        setSelectedAttacker(null);

    }


    /*
        Завершение хода.
    */

    function handleEndTurn() {

        setSelectedAttacker(null);


        const newState =
            endTurn(gameState);


        setGameState(newState);

    }


    /*
        Состояния игроков.
    */

    const player =
        gameState.player;


    const opponent =
        gameState.opponent;


    /*
        Преобразуем ID карт в реальные объекты карт.
    */

    const handCards =
        (player.hand || [])
            .map(cardId => {

                /*
                    Если hand уже содержит объект карты,
                    используем его напрямую.
                */

                if (
                    typeof cardId ===
                    "object"
                ) {

                    return cardId;

                }


                /*
                    Если hand содержит ID —
                    ищем карту в каталоге.
                */

                return cards.find(
                    card =>
                        card.id === cardId
                );

            })
            .filter(Boolean);


    return (

        <div style={styles.game}>


            {/* =========================
                HEADER
            ========================== */}

            <header style={styles.header}>

                <h1>
                    Тридевятое царство
                </h1>


                <div style={styles.turn}>

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
                        units={
                            opponent.board || []
                        }

                        onUnitClick={
                            handleOpponentUnitClick
                        }

                        selectedUnitId={null}
                    />

                </div>

            </section>



            {/* =========================
                ЦЕНТР
            ========================== */}

            <div style={styles.center}>

                {selectedAttacker ? (

                    <span
                        style={
                            styles.attackMode
                        }
                    >

                        ⚔️ Выберите цель

                    </span>

                ) : (

                    <span>
                        {gameState.activePlayer ===
                        "player"
                            ? "Ваш ход"
                            : "Ход противника"
                        }
                    </span>

                )}

            </div>



            {/* =========================
                ИГРОК
            ========================== */}

            <section>

                <div style={styles.board}>

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

        gap: "15px",

        boxSizing: "border-box",

        background: "#101010",

        color: "#fff"

    },


    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        borderBottom: "1px solid #444",

        paddingBottom: "10px"

    },


    turn: {

        color: "#aaa"

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

        borderRadius: "10px",

        minHeight: "120px",

        padding: "10px",

        boxSizing: "border-box"

    },


    center: {

        textAlign: "center",

        color: "#777",

        minHeight: "25px",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"

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

        border: "1px solid #666",

        borderRadius: "8px",

        background: "#444",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px"

    }

};
