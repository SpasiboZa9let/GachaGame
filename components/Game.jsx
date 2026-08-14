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
        КЛИК ПО СВОЕМУ СУЩЕСТВУ
        =========================
    */

    function handlePlayerUnitClick(unit) {

        if (!unit) {
            return;
        }


        /*
            Повторный клик снимает выбор.
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

        setSelectedAttacker(null);


        const newState =
            endTurn(gameState);


        setGameState(newState);

    }


    /*
        =========================
        ДАННЫЕ ИГРОКОВ
        =========================
    */

    const player =
        gameState.player;


    const opponent =
        gameState.opponent;


    /*
        =========================
        КАРТЫ В РУКЕ
        =========================

        В руке могут находиться:
        1. ID карты
        2. уже готовый объект карты

        Обрабатываем оба варианта.
    */

    const handCards =
    (player.hand || [])
        .map(card => {

            /*
                Если в руке уже полноценный
                объект карты — используем его.
            */

            if (
                card &&
                typeof card === "object"
            ) {

                return card;

            }


            /*
                Если в руке находится ID,
                ищем карту внутри массива CARDS.
            */

            if (
                typeof card === "string" ||
                typeof card === "number"
            ) {

                return CARDS.find(
                    item => item.id === card
                );

            }


            return null;

        })
        .filter(Boolean);


    /*
        Временно выводим количество карт
        в консоль для диагностики.
    */

    console.log(
        "Карты в руке:",
        player.hand
    );

    console.log(
        "Готовые карты:",
        handCards
    );


    /*
        =========================
        RENDER
        =========================
    */

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
                        units={opponent.board || []}

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

                    <span style={styles.attackMode}>

                        ⚔️ Выберите цель

                    </span>

                ) : (

                    <span>

                        {
                            gameState.activePlayer === "player"
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
                        units={player.board || []}

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


    board: {

        background: "#202020",

        border: "1px solid #444",

        borderRadius: "10px",

        padding: "10px",

        overflowX: "auto"

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
