```jsx
import React from "react";

import CARDS from "../data/cards.js";
import Card from "./Card.jsx";


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


    /*
        Пока это тестовая рука.

        Позже она будет находиться
        внутри GameState и управляться engine.js.
    */

    const playerHand = [
        CARDS.baba_yaga,
        CARDS.shaman
    ];


    /*
        Пока просто проверяем,
        что нажатие на карту работает.
    */

    function handleCardClick(card) {

        console.log("Выбрана карта:", card);

    }


    return (

        <div style={styles.game}>


            {/* =========================
                HEADER
            ========================= */}

            <header style={styles.header}>

                <h1>
                    Тридевятое царство
                </h1>

                <div style={styles.turn}>
                    Ход: игрок
                </div>

            </header>



            {/* =========================
                ПРОТИВНИК
            ========================= */}

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



            {/* =========================
                ЦЕНТР
            ========================= */}

            <div style={styles.divider}>

                Мана противника: 1 / 1

            </div>



            {/* =========================
                ИГРОК
            ========================= */}

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



            {/* =========================
                РУКА
            ========================= */}

            <section style={styles.hand}>


                {playerHand.map(card => (

                    <Card
                        key={card.id}
                        card={card}
                        onClick={handleCardClick}
                    />

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

        padding: "5px",

        color: "#777"
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
    }

};


export default Game;
```
