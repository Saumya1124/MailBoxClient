import { Fragment, useState , useRef } from "react";
import { Form , FloatingLabel, Button  } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

import './PostMail.css';
import { useSelector } from "react-redux";

const PostMail = () => {

    const toRef = useRef();
    const subjectRef = useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState)
    }

    const auth = useSelector(state => state.auth)

    


    const submitHandler = (event) => {
        event.preventDefault()

        const to = toRef.current.value;
        const subject = subjectRef.current.value;
        const message = editorState.getCurrentContent().getPlainText();

        const recieverMail = to.split('@')
        const recieverMailData = recieverMail[0]

        const senderMail = localStorage.getItem('email').split('@');
        const senderMailData = senderMail[0]


        // Sending mail to inbox of receiver

        const res =  fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${recieverMailData}/inbox.json`,{
            method : 'POST',
            body : JSON.stringify({
                to : to,
                sender : senderMailData,
                subject : subject,
                message : message,
                read : false
                
            })
        })

        res.then( res => {

            if(res.ok){
                res.json().then(data => {
                    console.log('Mail sent successfully.', data);
                    toRef.current.value = '';
                    subjectRef.current.value = '';
                    setEditorState('')
                })
            }
            else{
                res.json().then(err => {
                    console.log('Mail not sent',err)
                })
            }
        })


        // Sending mail in sentbox of sender

        const res1 =  fetch(`https://expensetracker-af59e-default-rtdb.firebaseio.com/${senderMailData}/outbox.json`,{
            method : 'POST',
            body : JSON.stringify({
                to : to,
                senderMail : senderMailData,
                subject : subject,
                message : message
                
            })
        })

        res1.then( res => {

            if(res.ok){
                res.json().then(data => {
                    console.log('Mail sent successfully.', data);
                    toRef.current.value = '';
                    subjectRef.current.value = '';
                    setEditorState('')
                })
            }
            else{
                res.json().then(err => {
                    console.log('Mail not sent',err)
                })
            }
        })


    }

 
    return(
        <Fragment>
            <div className="form d-flex justify-content-center ">
                <Form className="col-lg-5 col-md-6 col-12" onSubmit={submitHandler}>
                    <FloatingLabel label="To">
                        <Form.Control type="email" placeholder="To" ref={toRef}/>
                    </FloatingLabel>
                    <FloatingLabel label="Subject">
                        <Form.Control type="text" placeholder="Subject" ref={subjectRef}/>
                    </FloatingLabel>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />;
                    <button variant="info">Compose</button>
                </Form>
            </div>

        </Fragment>
    )
}

export default PostMail;