function Hero({
    hero,
    hp,
    mana,
    maxMana
}) {


    if (!hero) {

        return null;

    }


    return (

        <div
            style={{
                ...heroStyles.container,
                ...(hero.frame === "mage"
                    ? heroStyles.mage
                    : heroStyles.warrior)
            }}
        >


            <div style={heroStyles.portraitFrame}>


                <img
                    src={hero.image}
                    alt={hero.name}
                    style={heroStyles.portrait}
                />


            </div>



            <div style={heroStyles.info}>


                <strong>
                    {hero.name}
                </strong>


                <span>
                    ❤️ {hp}
                </span>


                <span>
                    🛡️ {hero.defense}
                </span>


                <span>
                    ⚔️ Сила {hero.strength}
                </span>


                <span>
                    ⭐ Ур. {hero.level}
                </span>


                <span style={heroStyles.mana}>
                    🔵 {mana}/{maxMana}
                </span>


            </div>


        </div>

    );

}



const heroStyles = {


    container: {

        display:"flex",

        alignItems:"center",

        gap:"15px",

        padding:"10px 20px",

        borderRadius:"20px",

        background:"#202020",

    },


    warrior: {

        border:
        "3px solid #c99a3d",

        boxShadow:
        "0 0 20px rgba(255,180,40,0.35)"

    },


    mage: {

        border:
        "3px solid #4ca6ff",

        boxShadow:
        "0 0 20px rgba(60,160,255,0.35)"

    },


    portraitFrame: {

        width:"120px",

        height:"120px",

        borderRadius:"50%",

        overflow:"hidden",

        border:"6px solid #777",

        background:"#111"

    },


    portrait: {

        width:"100%",

        height:"100%",

        objectFit:"cover"

    },


    info: {

        display:"flex",

        flexDirection:"column",

        gap:"5px",

        color:"#eee",

        fontSize:"15px"

    },


    mana: {

        color:"#55aaff",

        fontWeight:"bold"

    }


};



window.Hero = Hero;
