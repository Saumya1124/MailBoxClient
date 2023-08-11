import { Fragment } from "react";
import { useSelector } from "react-redux";


const OpenMail = () => {

    const inbox = useSelector(state => state.inbox.messages)

    const key = localStorage.getItem('keyto')

    const message = inbox[key]

    return(
        <Fragment>
                
                    <div>
                         <p><b>To : </b>{message.to}</p>
                         <p><b>{message.subject}</b></p>
                         <hr />
                         <p>{message.message}</p>

                    </div>
               
        </Fragment>
    )
}

export default OpenMail;