import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup  , Table , Modal, Button} from "react-bootstrap";
import { inboxActions } from "../../store/inboxSlice";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Link} from 'react-router-dom';
import OpenMail from "./OpenMail";

const InboxMail = () => {

    const auth = useSelector(state => state.auth)

    const inbox = useSelector(state => state.inbox)

    const userMail = localStorage.getItem('email').split('@')
    const userMailData = userMail[0]

    const [inBoxMail , setInboxMail] = useState([])

    const dispatch = useDispatch()

    const [selectedEmail, setSelectedEmail] = useState(null);

    const [isOpenMail , setIsOpenMail] = useState(false)

    // const history = useHistory()
    const history = useHistory()

    useEffect(()=>{

        const res = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/inbox.json`)


        res.then( res => {

            if(res.ok){
                res.json().then(data => {
                    console.log('Inbox data', data)
                    setInboxMail(Object.values(data))
                    setInboxMail(data)
                    dispatch(inboxActions.getMessages(data))
                    dispatch(inboxActions.unReadMail(Object.values(data)))
                })
            }
            else{
                res.json().then(err => {
                    console(err)
                })
            }
        })

    } , [])

    

    const setKey = (key) => {
        localStorage.setItem('keyto',key)
        // dispatch(inboxActions.setRead())

        const res1 = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/inbox/${key}.json`,{
            method : 'PATCH',
            body : JSON.stringify({
                read : true
            }),
            headers : {
                'content-type':'application/json'
            }
        })

        res1.then( res => {
            if(res.ok){
                res.json().then(data => {
                     console.log(data)
                     setSelectedEmail(inBoxMail[key])
                     
                })
            }
            else{
                res.json().then(err => {
                    console.log(err)
                })
            }
        })

        setIsOpenMail(true)

    }

    const handleClose = () => {
        setSelectedEmail(null);
      };

    const closeMail = () => {
        setIsOpenMail(false)
    }

    return (
        <Fragment>
            <div>

                {!isOpenMail &&
                   <Table striped bordered hover variant="light" className="container">
                        
                        <tbody>
                        
                        { Object.keys(inBoxMail).reverse().map((key,index)=>(
                           
                            <tr key={key} onClick={() => {setKey(key)}}>
                                {!inBoxMail[key].read && 
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        marginRight: "5px",
                                    }}
                                >
                                </span>}
                                <td><b>{inBoxMail[key].sender}</b></td>
                                <td>{inBoxMail[key].subject}</td>
                                <td>{inBoxMail[key].message}</td>
                               
                            </tr>
                            
                        )) }
                        </tbody>
                    </Table>

                }

                {isOpenMail && 
                    <div>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={closeMail}>
                                <i class="fa-solid fa-xmark"></i>
                            </Button>
                            
                        </div>
                        <OpenMail/>
                    </div>
                }

            </div>

        </Fragment>
    )
}

export default InboxMail;