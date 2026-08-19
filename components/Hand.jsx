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


                    <Card

                        key={
                            card.id+
                            "_" +
                            index
                        }


                        card={card}


                        onClick={
                            onCardClick
                        }

                    />


                )

            )

        }


        </div>

    );


}





const handStyles={


hand:{


display:"flex",


gap:"12px",


justifyContent:"center",


alignItems:"flex-end",


width:"100%",


minHeight:"230px",


overflowX:"auto"


}



};
