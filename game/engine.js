function createInitialGameState() {

const playerHero =
    HEROES.find(
        hero => hero.id === "ilya_muromets"
    );


const opponentHero =
    HEROES.find(
        hero => hero.id === "vasilisa_premudraya"
    );


return {


    turn: 1,


    activePlayer: "player",


    player: {


        hero: playerHero,


        hp: playerHero
            ? playerHero.maxHealth
            : 10000,


        mana: 1,
        maxMana: 1,


        deck: [],


        hand: [
            "baba_yaga",
            "shaman"
        ],


        board: []


    },


    opponent: {


        hero: opponentHero,


        hp: opponentHero
            ? opponentHero.maxHealth
            : 9000,


        mana: 1,
        maxMana: 1,


        deck: [],


        hand: [],


        board: []


    }


};

}

function getCardById(cardId) {

if (!Array.isArray(CARDS)) {


    console.error(
        "CARDS не является массивом"
    );


    return null;


}


return CARDS.find(
    card => card.id === cardId
) || null;

}

function createCardInstance(cardId) {

const card =
    getCardById(cardId);


if (!card) {


    console.error(
        "Карта не найдена:",
        cardId
    );


    return null;


}




return {


    instanceId:
        cardId +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8),


    cardId: cardId,


    attack: card.attack,


    health: card.health,


    maxHealth: card.health,


    defense: card.defense,


    strength: card.strength,


    canAttack: false,


    status: []


};

}

function getCardFromHand(player, cardId) {

if (
    !player ||
    !Array.isArray(player.hand)
) {


    return null;


}


return player.hand.find(
    id => id === cardId
) || null;

}

function playCard(
state,
playerId,
cardId
) {

const player =
if (!card) {
    return state;
}




if (
    player.mana <
    card.cost
) {


    console.log(
        "Недостаточно маны."
    );


    return state;


}




if (
    player.board.length >= 5
) {


    console.log(
        "На поле нет свободного места."
    );


    return state;


}




const instance =
    createCardInstance(
        cardId
    );


if (!instance) {
    return state;
}




return {


    ...state,


    [playerId]: {


        ...player,


        mana:
            player.mana -
            card.cost,


        hand:
            player.hand.filter(
                id =>
                    id !== cardId
            ),


        board: [


            ...player.board,


            instance


        ]


    }


};

}

window.createInitialGameState =
createInitialGameState;

window.getCardById =
getCardById;

window.createCardInstance =
createCardInstance;

window.getCardFromHand =
getCardFromHand;

window.playCard =
playCard;

Теперь полностью замени components/Game.jsx:

function Game() {

const [gameState, setGameState] =
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

window.Game = Game;
