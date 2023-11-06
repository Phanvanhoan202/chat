import cam from '../images/cam.png';
import add from '../images/add.png';
import more from '../images/more.png';
import Messages from './Messages';
import Input from './Input';
import { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';

function Chat() {
    const { data } = useContext(ChatContext);
    const user = data.user;

    console.log(data.showChat);

    return (
        <div className="chat">
            {!data.showChat && <div className="showChat"> Choose a chat to start the conversation </div>}
            {data.showChat && (
                <div className="chatWrapper">
                    <div className="chatInfo">
                        <span>{user.displayName}</span>
                        <div className="chatIcons">
                            <img src={cam} alt="" />
                            <img src={add} alt="" />
                            <img src={more} alt="" />
                        </div>
                    </div>
                    <Messages />
                    <Input />
                </div>
            )}
        </div>
    );
}

export default Chat;
