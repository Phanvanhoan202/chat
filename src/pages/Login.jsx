import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';

function Login() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setError(false);
        setLoading(true);
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            // Create user
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo"> Messenger</span>
                <span className="title">Register</span>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />

                    <button>Sign Up</button>
                    {error && <span className="error">Email or password is incorrect!</span>}
                    {loading && <span className="loading">Đang đăng nhập...</span>}
                </form>
                <p>
                    Create Account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
