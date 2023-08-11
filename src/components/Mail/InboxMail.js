import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup  , Table} from "react-bootstrap";

const InboxMail = () => {

    const auth = useSelector(state => state.auth)

    const userMail = auth.loggedEmail.split('@')
    const userMailData = userMail[0]

    const [inBoxMail , setInboxMail] = useState([])

    useEffect(()=>{

        const res = fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${userMailData}/inbox.json`)


        res.then( res => {

            if(res.ok){
                res.json().then(data => {
                    console.log('Inbox data', data)
                    setInboxMail(Object.values(data))
                })
            }
            else{
                res.json().then(err => {
                    console(err)
                })
            }
        })

    } , [])


    return (
        <Fragment>
            <div>
                   <Table striped bordered hover variant="light" className="container">
                        {/* <thead>
                        <tr>                            
                            <th>From</th>
                            <th>Subject</th>
                            <th>Message</th>
                        </tr>
                        </thead> */}
                        <tbody>
                        
                        { inBoxMail.map((message,index)=>(
                            <tr key={index}>
                                <td><b>{message.sender}</b></td>
                                <td>{message.subject}</td>
                                <td>{message.message}</td>
                               
                            </tr>
                        )) }
                        </tbody>
                    </Table>

                    
                </div>

        </Fragment>
    )
}

export default InboxMail;