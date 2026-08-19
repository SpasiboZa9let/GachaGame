/*
============================

OpponentHand.jsx

Рука противника

Карты скрыты

============================
*/


function OpponentHand({

    cards=[]

}){


    return (


        <div className="opponent-hand">



            {

                cards.map((card,index)=>(


                    <div


                        key={index}


                        className="card card-back"


                    >


                        <div>


                            🂠


                        </div>


                    </div>


                ))

            }



        </div>


    );


}





window.OpponentHand = OpponentHand;
