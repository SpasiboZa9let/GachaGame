const HEROES = [

{
    id: "ilya_muromets",
    name: "Илья Муромец",


    faction: "Явь",


    level: 1,


    health: 10000,
    maxHealth: 10000,


    defense: 1100,


    strength: 16,


    strengthMultiplier: 10,


    role: "Богатырь",


    passive: {
        name: "Богатырская стать",
        description: "Богатырские существа получают бонус к атаке и защите."
    },


    active: {
        name: "Богатырский удар",
        description: "Один раз за ход выбранное союзное существо получает бонус к атаке для следующей атаки."
    },


    image: "./assets/heroes/ilya_muromets.png",


    description: "Богатырь прямого действия. Делает ставку на мощных существ и физическую силу."
},


{
    id: "vasilisa_premudraya",
    name: "Василиса Премудрая",


    faction: "Правь",


    level: 1,


    health: 9000,
    maxHealth: 9000,


    defense: 900,


    strength: 15,


    strengthMultiplier: 10,


    role: "Маг",


    passive: {
        name: "Мудрость",


        description: "Эффекты специальных способностей карт получают бонус к эффективности."
    },


    active: {
        name: "Волшебное слово",


        description: "Один раз за ход позволяет усилить эффект способности союзной карты или ослабить эффект способности вражеской карты."
    },


    image: "./assets/heroes/vasilisa_premudraya.png",


    description: "Мудрая волшебница, полагающаяся на способности карт, контроль и хитрые решения."
}

];

window.HEROES = HEROES;
