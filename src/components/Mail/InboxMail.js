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

    const [isOpenMail , setIsOpenMail] = useState(false)


    
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

    
    useEffect(()=>{

    setInterval( () => {  
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
        .catch( (err)=> {
            console.log(err)
        })

       
    } , 2000)
    } , [])


    



    const closeMail = () => {
        setIsOpenMail(false)
    }

    const deleteHandler = (key) => {
        // const key = localStorage.getItem('keyto')
        const deleteData = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/inbox/${key}.json`,{
            method : 'DELETE',
        })

        deleteData.then( res => {
            if(res.ok){
                res.json().then(data => {
                    console.log(data)
                    const updatedMessages = {...inBoxMail}
                    delete updatedMessages[key]
                    setInboxMail(updatedMessages)
                })

            }
            else{
                console.log('Error occured.')
            }
        })
    }

    return (
        <Fragment>
            <div>

                {!isOpenMail &&

                   <Table striped bordered hover variant="light" className="container">
                        
                    
                        <tbody>
                        { Object.keys(inBoxMail).reverse().map((key,index)=>(

                            <tr key={key}>

                                <td onClick={() => {setKey(key)}}>
                                {!inBoxMail[key].read ?
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
                                </span> :
                                
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "green",
                                        marginRight: "5px",
                                    }}
                                >
                                </span>
                                
                                }
                                </td>
                                <td onClick={() => {setKey(key)}}><b>{inBoxMail[key].sender}</b></td>
                                <td onClick={() => {setKey(key)}}>{inBoxMail[key].subject}</td>
                                <td onClick={() => {setKey(key)}}>{inBoxMail[key].message}</td>
                                <td><Button onClick={() => {deleteHandler(key)}}>Delete</Button></td>
                               
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
                        <OpenMail />
                    </div>
                }

            </div>

        </Fragment>
    )
}

export default InboxMail;