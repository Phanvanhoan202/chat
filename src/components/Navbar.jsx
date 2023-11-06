import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Navbar() {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const handleLogout = () => {
        signOut(auth);

        dispatch({
            type: 'CHANGE_USER',
            payload: {
                displayName: 'Thu Quyền',
                photoURL:
                    'https://firebasestorage.googleapis.com/v0/b/chat2-5f9ef.appspot.com/o/Thu%20Quy%E1%BB%81n1698981230824?alt=media&token=ba4e21d2-2c9a-4964-978f-ecf1d83eb4be',
                uid: 'oXNRtgBXCxWIXKPvXTf69vjmMAi1',
            },
            showChat: false,
        });
    };
    return (
        <div className="navbar">
            <div className="logo">Messenger</div>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
}

export default Navbar;
