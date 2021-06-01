// Para comentarios

export const creatingComment = (userName, idPost, comment, uid) => {
  const db = firebase.firestore();
  return db.collection('comments').add({
    userName,
    idPost,
    comment,
    userId: uid,
    time: new Date().toLocaleString('GMT-0500'),
  });
};

export const getComment = (id, callback) => firebase.firestore().collection('comments')
  .where('idPost', '==', id)
  .orderBy('time', 'asc')
  .onSnapshot((querySnapshot) => {
    const allComment = [];
    querySnapshot.forEach((doc) => {
      /*  console.log('El objeto con todas las propiedades: ', doc.data());
        console.log('id del usuario: ', doc.data().userId);
        console.log('Nombre del usuario: ', doc.data().userName);
        console.log('id del docuemento: ', doc.id); */
      allComment.push({
        idUser: doc.data().userId,
        nameUser: doc.data().userName,
        comments: doc.data().comment,
        postId: doc.id,
      });
    });
    callback(allComment);
  });

export const getCommentById = (id) => {
  const db = firebase.firestore();
  return db.collection('comments').doc(id).get();
};
