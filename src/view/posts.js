import { getPost, deletePost, getPostById, updatePost , likingPost} from '../lib/user/postsService.js';
import { renderModalPost } from './ModalPost.js';

export const renderPostUser = (element) => {
  const postUser = document.createElement('section');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'myModal');
  
  
  getPost((dataPost) => { 
    //console.log('Devuelve un objeto con idPost, img, likes, postUs', dataPost[0].idPost);
    //console.log(dataPost)
    postUser.innerHTML = '';
    dataPost.forEach((doc) => {
      // console.log(doc);
      // console.log(doc.postUs);
      // console.log(`post: ${doc.userImg}`);
      const renderImgPost = doc.img === '' ? '' : `<img src=${doc.img} width="280" height="200" />`;
      const postUnique = document.createElement('article');
      postUnique.classList.add('postsAllUsers');
      postUnique.innerHTML = `
                
            <div class="userInformation">
              <section >
                <img class="photoProfilePost" src="${doc.userImg}" width="26" height="26"/>
                <span>${doc.userSign}</span>
              </section>
              <div class="editByOwner">
                <img src="img/editButton.PNG" width="20" height="20" class="btnPostEdit" data-id=${doc.idPost}></img>
                <img src="img/deleteButton.PNG" width="20" height="20" class="btnPostDelete" data-id=${doc.idPost}></img>
              </div>
            </div>

            <p id="formPostShare" class="formPostShare" spellcheck = "false" required>${doc.postUs}</p>
            ${renderImgPost}
            <div class="likesAndComments">
              <p>${doc.likes.length} likes</p>
              <p>5 comments</p>
            </div>
            <div class="buttonLikeComment">
              <img src="img/likeButton.PNG" width="18.6" height="18" class="buttonLikePost" id="buttonLikePost" data-id=${doc.idPost}/>
            <button class="buttonCommentPost">Comment</button>
            </div>


            <section id="commentContainer">
              <div class="writteComment">
                <textarea class="comment" placeholder="Escribe algo!" required></textarea>
                <button class="publicar" data-id=${doc.idPost}>Publicar</button>
              </div>

              <div id="${doc.idPost}"></div>
              </section>
              
              `;
              
      postUser.appendChild(postUnique);

    });

    //Funcionalidad para borrar post
    postUser.querySelectorAll('.btnPostDelete').forEach((btnPostDelete) => btnPostDelete.addEventListener('click', (e) => {
      const idPost = e.target.dataset.id;
      console.log(idPost);
      deletePost(idPost).then(() => console.log('elemento eliminado'));
    }));

    //Funcionalidad para editar post
    postUser.querySelectorAll('.btnPostEdit').forEach((btnPostEdit) => btnPostEdit.addEventListener('click', (e) => {
          const idPost = e.target.dataset.id;
          getPostById(idPost)
            .then((infoId) => infoId.data())
            .then((data) => {
              modal.innerHTML = '';
              const modalContent = renderModalPost(data);
              const btnClose = modalContent.querySelector('.close');
              const btnUpdate = modalContent.querySelector('#btnPostUpdate');
              btnClose.addEventListener('click', () => {
                console.log('hola');
                modal.style.display = 'none';
              });
              btnUpdate.addEventListener('click', () => {
                console.log('hola');
                const inputPost = modalContent.querySelector('#inputPost');
                updatePost(idPost, {
                  posting: inputPost.value,
                });
                modal.style.display = 'none';
              });
              modal.appendChild(modalContent);
              element.appendChild(modal);
              modal.style.display = 'block';
            });
        })); 

        //Funcionalidad para darle like a los post
    postUser.querySelectorAll('#buttonLikePost').forEach((btnLike) => btnLike.addEventListener('click', (e) => {
      const userUid = firebase.auth().currentUser.uid;
      // console.log('id de usuario : ', userUid)
      const idPost = e.target.dataset.id;

      console.log('id del post: ', idPost);

      getPostById(idPost)
        .then((infoId) => infoId.data())
        .then((data) => {
          console.log(data);

          const newArray = [...data.likes];
          console.log('Array con el id de todos los usuarios que dieron like: ', newArray);

        const idUnicos = [...new Set(newArray)]
        console.log('Filtra los id de usuarios repetidos', idUnicos);
      
        console.log('Devuelve la posición de cada id unico', idUnicos.indexOf(userUid));
  
        if (idUnicos.indexOf(userUid) == -1 ) {
          newArray.push(userUid);
          console.log(newArray)
          likingPost(idPost, newArray);
        } else {
          const unlike = idUnicos.filter((element) => {
            if(userUid !== element) {
              return element
            }
          })
          console.log(unlike)
          likingPost(idPost , unlike);
        }
    });
  }))

    element.appendChild(postUser);
     // console.log(postUser);
  });
};
