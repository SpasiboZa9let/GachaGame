```jsx
function Game() {
    const [playerMana, setPlayerMana] = React.useState(1);
    const [playerMaxMana, setPlayerMaxMana] = React.useState(1);

    const player = {
        name: "Игрок",
        hp: 30
    };

    const opponent = {
        name: "Противник",
        hp: 30
    };

    const testCards = [
        {
            id: "baba_yaga",
            name: "Баба-Яга",
            cost: 5,
            attack: 6,
            health: 7
        },
        {
            id: "shaman",
            name: "Шаман",
            cost: 3,
            attack: 3,
            health: 4
        }
    ];

    return (
        <div style={styles.game}>

            <header style={styles.header}>
                <h1>Тридевятое царство</h1>
                <div style={styles.turn}>
                    Ход: игрок
                </div>
            </header>


            {/* ПРОТИВНИК */}

            <section style={styles.playerArea}>

                <div style={styles.hero}>
                    <div style={styles.heroName}>
                        {opponent.name}
                    </div>

                    <div style={styles.hp}>
                        ❤️ {opponent.hp}
                    </div>
                </div>

                <div style={styles.board}>
                    <div style={styles.emptyBoard}>
                        Поле противника
                    </div>
                </div>

            </section>


            {/* ЦЕНТР */}

            <div style={styles.divider}>
                <div style={styles.mana}>
                    Мана противника: 1 / 1
                </div>
            </div>


            {/* ИГРОК */}

            <section style={styles.playerArea}>

                <div style={styles.board}>

                    <div style={styles.emptyBoard}>
                        Поле игрока
                    </div>

                </div>

                <div style={styles.hero}>

                    <div style={styles.heroName}>
                        {player.name}
                    </div>

                    <div style={styles.hp}>
                        ❤️ {player.hp}
                    </div>

                    <div style={styles.mana}>
                        🔵 {playerMana} / {playerMaxMana}
                    </div>

                </div>

            </section>


            {/* РУКА */}

            <section style={styles.hand}>

                {testCards.map(card => (

                    <div
                        key={card.id}
                        style={styles.card}
                    >

                        <div style={styles.cardCost}>
                            {card.cost}
                        </div>

                        <div style={styles.cardName}>
                            {card.name}
                        </div>

                        <div style={styles.cardArt}>
                            <span>Арт</span>
                        </div>

                        <div style={styles.cardStats}>
                            <span>⚔️ {card.attack}</span>
                            <span>❤️ {card.health}</span>
                        </div>

                    </div>

                ))}

            </section>

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

    turn: {
        color: "#aaa"
    },

    playerArea: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    hero: {
        display: "flex",
        alignItems: "center",
        gap: "15px"
    },

    heroName: {
        fontWeight: "bold",
        fontSize: "18px"
    },

    hp: {
        fontWeight: "bold"
    },

    mana: {
        color: "#61a9ff"
    },

    board: {
        minHeight: "150px",
        border: "1px solid #444",
        borderRadius: "10px",
        background: "#202020",
        padding: "15px"
    },

    emptyBoard: {
        height: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#555"
    },

    divider: {
        display: "flex",
        justifyContent: "center",
        padding: "5px"
    },

    hand: {
        minHeight: "230px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "15px",
        padding: "20px",
        borderTop: "1px solid #333",
        background: "#111"
    },

    card: {
        width: "150px",
        height: "210px",
        background: "#292929",
        border: "2px solid #666",
        borderRadius: "10px",
        padding: "10px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
    },

    cardCost: {
        position: "absolute",
        top: "6px",
        left: "6px",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#3478db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    },

    cardName: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "5px"
    },

    cardArt: {
        flex: 1,
        background: "#181818",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#555"
    },

    cardStats: {
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold"
    }
};
```

