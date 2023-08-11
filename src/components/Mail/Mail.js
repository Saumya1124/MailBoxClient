import { Fragment, useState } from "react";
import './Mail.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button , Dropdown} from "react-bootstrap";
import PostMail from "./PostMail";
import InboxMail from "./InboxMail";
import { useSelector } from "react-redux";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Mail = () => {

    const [isCompose , setIsCompose] = useState(false)
    const [isInbox , setIsInbox] = useState(false)

    const composeHandler = () => {
        setIsInbox(false)
        setIsCompose(true)
    }
    const inboxHandler = () => {
        setIsInbox(true)
        setIsCompose(false)
    }

    const auth = useSelector(state => state.auth)
    const userEmail = localStorage.getItem('email').split('@')
    const userEmailData = userEmail[0]

    const inbox = useSelector(state => state.inbox)

    console.log(inbox.unReadCount)

    return (
        <Fragment>
            
             <div className="d-flex head">
                    <div className="col-lg-6 col-md-6 col-12">
                        <h4 className="p-2">Mail</h4>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-end">
                        <h4 className="p-2">{userEmailData}</h4>                       
                    </div> 

              </div>

              <hr />

              <div className="d-flex">
                   <div className="col-lg-3 col-md-3 col-5 d-flex flex-column ">
                        <Button variant="info" onClick={composeHandler} className="col-6">Compose</Button>
                        <br />
                        <Button className="col-6" onClick={inboxHandler} >Inbox ({inbox.unReadCount})</Button>
                   </div>
                   <div className="col-lg-8 col-md-8 col-11">
                        {isCompose && <PostMail />}
                        {isInbox && <InboxMail />}
                        
                   </div>
              </div>
              
        </Fragment>
    )
}
export default Mail;