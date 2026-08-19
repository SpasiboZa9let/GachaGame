/*
============================
GameLog.jsx

Отображение журнала боя

Показывает:
- последние события боя
- действия игрока
- действия противника

Логику не содержит
============================
*/


function GameLog({


    log


}){


    const messages =

        (log || [])

        .slice(-10);







    return (


        <div style={window.gameStyles.log}>


            <h4>

                Лог боя

            </h4>





            {


                messages.map(


                    (text,index)=>(


                        <div key={index}>


                            {text}


                        </div>


                    )


                )


            }





        </div>


    );


}





window.GameLog = GameLog;
