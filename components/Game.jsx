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

            <h1 style={styles.title}>
                Тридевятое царство
            </h1>

            <div style={styles.turn}>
                Ход: {gameState.turn}
            </div>

        </header>


        {/* =========================
            ПРОТИВНИК
        ========================== */}

        <section style={styles.playerSection}>

            <div style={styles.hero}>

                <strong>
                    ПРОТИВНИК
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
            ЦЕНТР
        ========================== */}

        <div style={styles.center}>

            {selectedAttacker ? (

                <div style={styles.attackMode}>
                    ⚔️ ВЫБЕРИТЕ ЦЕЛЬ
                </div>

            ) : (

                <div>
                    Ход игрока
                </div>

            )}

        </div>


        {/* =========================
            ИГРОК
        ========================== */}

        <section style={styles.playerSection}>

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
                    ИГРОК
                </strong>

                <span>
                    ❤️ {player.hp}
                </span>

                <span style={styles.mana}>

                    🔵 {player.mana}
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
            КНОПКА
        ========================== */}

        <button
            onClick={handleEndTurn}
            style={styles.endTurn}
        >
            Завершить ход
        </button>

    </div>

);



const styles = {

    game: {

        minHeight: "100vh",

        background:
            "radial-gradient(circle at center, #292929, #101010)",

        color: "#eee",

        padding: "20px",

        boxSizing: "border-box",

        display: "flex",

        flexDirection: "column",

        gap: "12px"
    },


    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        paddingBottom: "10px",

        borderBottom: "1px solid #444"
    },


    title: {

        margin: 0,

        fontSize: "24px"
    },


    turn: {

        color: "#aaa",

        fontSize: "14px"
    },


    playerSection: {

        display: "flex",

        flexDirection: "column",

        gap: "8px"
    },


    hero: {

        display: "flex",

        alignItems: "center",

        gap: "20px",

        padding: "5px 10px",

        color: "#ddd"
    },


    board: {

        minHeight: "130px",

        background:
            "rgba(20,20,20,0.8)",

        border:

            "1px solid #444",

        borderRadius: "12px",

        padding: "10px"
    },


    center: {

        height: "35px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        color: "#777"
    },


    attackMode: {

        color: "#ffd700",

        fontWeight: "bold",

        animation:
            "pulse 1s infinite"
    },


    mana: {

        color: "#55aaff",

        fontWeight: "bold"
    },


    endTurn: {

        alignSelf: "center",

        padding: "12px 35px",

        border: "1px solid #666",

        borderRadius: "8px",

        background: "#333",

        color: "#fff",

        cursor: "pointer",

        fontSize: "16px",

        marginBottom: "10px"
    }

};
