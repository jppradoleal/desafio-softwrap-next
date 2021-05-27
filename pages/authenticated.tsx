import nookies from 'nookies';
import {verifyIdToken} from '../utils/firebaseAdmin';
import firebaseClient from '../utils/firebaseClient';
import firebase from 'firebase/app';
import { NextPageContext } from 'next';

function Authenticated({session}) {
    firebaseClient();
    if(session) {
        return (
            <div>
                <h1>Authenticated</h1>
                <p>You are authenticated {session}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
}

export async function getServerSideProps(context : NextPageContext) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {uid, email} = token;
        return {
            props: {
                session: `Email: ${email}; UID: ${uid}`
            }
        }
    } catch (err) {
        context.res.writeHead(302, {location: '/login'});
        context.res.end();
        return {props: []};
    }
}

export default Authenticated;