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



                <span style={heroStyles.mana}>

                    🔵 {mana}/{maxMana}

                </span>


            </div>


        </div>

    );

}





const heroStyles = {


    container:{


        display:"flex",

        alignItems:"center",

        gap:"8px",

        padding:"5px 8px",

        borderRadius:"12px",

        background:"#202020",

        width:"170px",

        boxSizing:"border-box"


    },





    warrior:{


        border:

        "2px solid #c99a3d",


        boxShadow:

        "0 0 10px rgba(255,180,40,0.25)"


    },





    mage:{


        border:

        "2px solid #4ca6ff",


        boxShadow:

        "0 0 10px rgba(60,160,255,0.25)"


    },





    portraitFrame:{


        width:"45px",

        height:"45px",

        flexShrink:0,

        borderRadius:"50%",

        overflow:"hidden",

        border:"3px solid #777",

        background:"#111"


    },





    portrait:{


        width:"100%",

        height:"100%",

        objectFit:"cover"


    },





    info:{


        display:"flex",

        flexDirection:"column",

        gap:"2px",

        color:"#eee",

        fontSize:"11px"


    },





    mana:{


        color:"#55aaff",

        fontWeight:"bold"


    }


};





window.Hero = Hero;
