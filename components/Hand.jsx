function Hand({
    cards,
    onCardClick
}) {


    if(
        !cards ||
        cards.length===0
    ){
        return null;
    }



    return (

        <div style={handStyles.hand}>


        {

            cards.map(
                (card,index)=>(


                    <div

                        key={
                            card.id+
                            "_" +
                            index
                        }

                        style={{
                            transform:
                                `rotate(${(index - cards.length / 2) * 3}deg)`
                        }}


                    >


                        <Card

                            card={card}


                            mode="hand"


                            onClick={
                                onCardClick
                            }

                        />


                    </div>


                )

            )

        }


        </div>

    );


}







const handStyles={


    hand:{


        display:"flex",


        gap:"8px",


        justifyContent:"center",


        alignItems:"flex-end",


        width:"100%",


        minHeight:"280px",


        padding:"10px",


        overflowX:"auto",


        overflowY:"hidden"


    }



};







window.Hand = Hand;
