import Add from '../images/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        setError(false);
        e.preventDefault();

        const displayName = e.target[0].value.trim();
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        // update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        // create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        navigate('/login');
                    } catch (error) {
                        setLoading(false);
                        setError(true);
                    }
                });
            });

            console.log(res);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo"> Messenger</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" id="file" style={{ display: 'none' }} />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {error && <span className="error">Error! An error occurred. Please try again later</span>}
                    {loading && <span className="loading">Đang đăng kí tài khoản ...</span>}
                </form>
                <p>
                    Do you have account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
