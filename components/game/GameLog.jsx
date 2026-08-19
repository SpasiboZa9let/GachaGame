/*
============================
GameLog.jsx

Отображение журнала боя

============================
*/


function GameLog({

    log

}){


    return (


        <div style={gameStyles.log}>


            <h4>

                Лог боя

            </h4>





            {

                (log || [])

                .slice(-10)

                .map(

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
