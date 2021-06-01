/* eslint-disable no-undef */
// aqui exportaras las funciones que necesites

// ****** SIGN UP ********
export const createUser = (email, password) => {
  const user = firebase.auth();
  return user.createUserWithEmailAndPassword(email, password);
};

export const sendEmail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};

export const upDateUser = (displayName, photoURL) => {
  // console.log('hola update user');
  // console.log(displayName, photoURL);

  const user = firebase.auth().currentUser;
  // console.log(user.updateProfile({ displayName, photoURL }));
  return user.updateProfile({ displayName, photoURL });
};

export const uploadFileUserImg = (file) => {
  const storageRef = firebase.storage().ref();
  const metadata = {
    contentType: 'image/jpg',
  };

  // Upload the file and metadata
  const uploadTask = storageRef
    .child(`imgUser/${file.name}`)
    .put(file, metadata)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((downloadURL) => downloadURL)
    .catch((error) => console.log(error));

  return uploadTask;
};

// **************************
export const hearSign = (callback) => {
  const hearChanged = firebase.auth();
  hearChanged.onAuthStateChanged((user) => {
    if (user) {
      // console.log(user.displayName);
      // console.log(user.photoURL);
      // console.log(user.email);

      // console.log('sign in :3');
      const emailVerified = user.emailVerified;
      // let textoVerificado = '';
      if (emailVerified === false) {
        console.log('no verificado');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Do not forget to confirm your email address!',
        });
        window.location.hash = '';
      } else {
        // console.log('verificado');
        // window.location.hash = '#/Home';
        // textoVerificado = 'Email verificado';
      }
      callback(user);
    } else {
      // console.log('sign out :c');
    }
  });
  /* return firebase.auth().currentUser; */
};
// ******** SIGN IN *******

export const signIn = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// ***** Sign in with google ******
export const signInGoogle = () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

// ************************** SIGN out

export const signOut = () => firebase.auth().signOut();
