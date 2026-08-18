function Game() {

const [gameState, setGameState] =


                    }


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
