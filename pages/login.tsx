import {useState} from 'react';
import firebaseClient from '../utils/firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function Login() {
    firebaseClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button disabled={email === "" || password === ""} onClick={
                    async (e) => {
                        e.preventDefault();
                        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
                            alert("Sign up successfully");
                            window.location.href = "/";
                        }).catch(function (err) {
                            const message = err.message;
                            alert(message);
                        });
                    }
                }>Sign up</button>
                <button onClick={
                    async (e) => {
                        e.preventDefault();
                        await firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                            alert("Sign in successfully");
                            window.location.href = "/";
                        }).catch(function (err) {
                            const message = err.message;
                            alert(message);
                        });
                    }
                }>Log in</button>
            </form>
        </div>
    );
}