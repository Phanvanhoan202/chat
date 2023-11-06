import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

function Message({ message }) {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={chatRef} className={`message ${message.senderID === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                <img src={message.image} alt="" />
            </div>
        </div>
    );
}

export default Message;
