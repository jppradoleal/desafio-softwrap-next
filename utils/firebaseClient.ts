import firebase from 'firebase';
import config from '../secrets.json'
const FIREBASE_CONFIG = config;

export default async function firebaseClient() {
    if(!(firebase.apps.length)) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
}