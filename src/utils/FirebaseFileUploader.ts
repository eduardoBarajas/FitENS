import firebase from 'firebase';
import { EEXIST } from 'constants';
const axios = require('axios').default;
const firebaseConfig = {
    apiKey: "AIzaSyB1LKzSELcOuXiHRhdxY2fXecKyaRotM6Y",
    authDomain: "codens-18ad2.firebaseapp.com",
    databaseURL: "https://codens-18ad2.firebaseio.com",
    projectId: "codens-18ad2",
    storageBucket: "codens-18ad2.appspot.com",
    messagingSenderId: "311440713794",
    appId: "1:311440713794:web:d22301ef7ab5af1f12a5db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fileUpload = async function(ref_location: string, file: File) {
    let response = {state: 'error', url: ''};
    const storage = firebase.storage();
    let result = await storage.ref(ref_location).put(file);
    if (result.state === 'success') {
        let download_url = await storage.ref(ref_location).getDownloadURL();
        response = {state: 'success', url: download_url};
    }
    return response;
}

export const fileDelete = async function(ref_location: string, file: string) {
    let response = {state: 'error', message: 'No se pudo eliminar.'};
    try {
        const storage = firebase.storage();
        await storage.ref(ref_location).child(file).delete();
        response = {state: 'success', message: 'Se elimino.'};
    } catch (e) {}
    return response;
}