// Objeto con todas las propiedades
export const createPost = (uid, displayName, photoURL, saveInformation, img) => {
  const db = firebase.firestore();
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: 'false',
  };
  return db.collection('posts').add({
    id: uid,
    user: displayName,
    userImg: photoURL,
    posting: saveInformation,
    date: new Date().toLocaleString('es-PE', options),
    image: img,
    likes: [],

  });
};

export const getPost = (callback) => {
  const db = firebase.firestore();
  // return db.collection('posts').get();
  db.collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      // console.log(querySnapshot);
      const post = [];
      querySnapshot.forEach((doc) => {
        /* console.log('El objeto con todas las propiedades: ', doc.data());
        console.log('id del usuario: ', doc.data().id);
        console.log('Nombre del usuario: ', doc.data().user);
        console.log('id del docuemento: ', doc.id); */

        post.push({
          postUs: doc.data().posting,
          idPost: doc.id,
          userImg: doc.data().userImg,
          img: doc.data().image,
          userSign: doc.data().user,
          likes: doc.data().likes,
          time: doc.data().date,
        });
        // console.log(post);
        /* callback(post); */
      });
      // console.log(post);
      callback(post);
    });
};

export const getPostById = (id) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(id).get();
};

export const deletePost = (id) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(id).delete();
};

export const updatePost = (id, updatedPost) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(id)
    .update(
      updatedPost,
    );
};

export const createUrlImgPost = (file) => {
  console.log(file);
  const storageRef = firebase.storage().ref();
  const metadata = {
    contentType: 'image/jpeg',
  };
  const uploadImg = storageRef
    .child(`imgPost/${file.name}`)
    .put(file, metadata)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((downloadURL) => downloadURL)
    .catch((error) => console.log(error));
  return uploadImg;
};

// Updating likes
export const likingPost = (id, likeUser) => {
  firebase.firestore().collection('posts').doc(id)
    .update({
      likes: likeUser,
    });
};

export const updateInfoUserPost = (id, userId) => {
  const db = firebase.firestore();
  return db.collection('posts').where(id, '==', userId).get();
};
