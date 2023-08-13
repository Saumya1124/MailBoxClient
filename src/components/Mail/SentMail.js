import { Fragment, useEffect, useState } from "react";
import { Button , Table } from "react-bootstrap";
import OpenMail from "./OpenMail";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { outboxActions } from "../../store/outboxSlice";
import OpenSentMail from "./OpenSentMail";

const SentMail = () => {

    const userEmail = localStorage.getItem('email').split('@')
    const userMailData = userEmail[0]

    const [sentMail , setSentMail] = useState([])

    const [isOpenMail , setIsOpenMail] = useState(false)

    const dispatch = useDispatch()

    const setKey = (key) => {
        localStorage.setItem('keyto',key)
        // dispatch(inboxActions.setRead())

        const res1 = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/outbox/${key}.json`,{
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

    useEffect( () =>  {

        const res = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/outbox.json`)

        res.then( res => {
        if(res.ok){
            res.json().then(data => {
                console.log('Outbox', data)
                setSentMail(data)
                dispatch(outboxActions.sentMessages(data))

            })
        }
        else{
            res.json().then(data => {
                console.log('Fetching sent mails failed!', data)
            })
        }
    })


    }, [])
  

    const closeMail = () => {
        setIsOpenMail(false)
    }

    const deleteHandler = (key) => {
        // const key = localStorage.getItem('keyto')
        const deleteData = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/outbox/${key}.json`,{
            method : 'DELETE',
        })

        deleteData.then( res => {
            if(res.ok){
                res.json().then(data => {
                    console.log(data)
                    const updatedMessages = {...sentMail}
                    delete updatedMessages[key]
                    setSentMail(updatedMessages)
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
                        { Object.keys(sentMail).reverse().map((key,index)=>(

                            <tr key={key}>

                                <td onClick={() => {setKey(key)}}>
                                {!sentMail[key].read ?
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
                                <td onClick={() => {setKey(key)}}><b>{sentMail[key].to}</b></td>
                                <td onClick={() => {setKey(key)}}>{sentMail[key].subject}</td>
                                <td onClick={() => {setKey(key)}}>{sentMail[key].message}</td>
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
                        <OpenSentMail />
                    </div>
                }

            </div>
        </Fragment>
    )
}

export default SentMail