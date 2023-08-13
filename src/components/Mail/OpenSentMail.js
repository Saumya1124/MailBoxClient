import { Fragment, useState } from "react";
import { useSelector } from "react-redux";


const OpenSentMail = () => {


    const outbox = useSelector(state=> state.outbox.messages)

    const key = localStorage.getItem('keyto')

    const message = outbox[key]

    return(
        <Fragment>
                
                    <div>
                         <p><b>To :</b>{message.to}</p>
                         <p><b>{message.subject}</b></p>
                         <hr />
                         <p>{message.message}</p>

                    </div>
               
        </Fragment>
    )
}

export default OpenSentMail;