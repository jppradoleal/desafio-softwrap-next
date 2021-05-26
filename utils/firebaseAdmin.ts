import admin, { ServiceAccount } from 'firebase-admin';
import adminConfig from '../admin-secret.json';
import appConfig from '../secrets.json';

export const verifyIdToken = (token) => {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(<ServiceAccount>adminConfig),
            databaseURL: appConfig.databaseURL
        });
    }

    return admin.auth().verifyIdToken(token).catch((err) => {
        throw err;
    });
}