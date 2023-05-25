import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Configuración de tu proyecto Firebase
  apiKey: "AIzaSyARA3ZcBYRaBTflt7SPShiTSEjWFJqm7R0",
  authDomain: "reciclaje-27772.firebaseapp.com",
  projectId: "reciclaje-27772",
  storageBucket: "reciclaje-27772.appspot.com",
  messagingSenderId: "304734736109",
  appId: "1:304734736109:web:9ead863fa1bb9fff6686e4",
  measurementId: "G-NTP6MFQJ1W"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const sendVerificationEmail = async (email) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      await user.sendEmailVerification({
        handleCodeInApp: true,
       url: 'https://reciclaje-27772.firebaseapp.com', // Reemplaza con la URL de tu aplicación
      });
      console.log('Correo de verificación enviado.');
    } else {
      console.log('No se pudo enviar el correo de verificación. No hay usuario autenticado.');
    }
  } catch (error) {
    console.log('Error al enviar el correo de verificación:', error);
  }
};

export default firebase;