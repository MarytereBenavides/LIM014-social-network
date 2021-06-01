/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import {
  getPost, deletePost, getPostById, updatePost, likingPost,
// eslint-disable-next-line import/named
} from '../lib/user/postsService.js';
import { renderModalPost } from './ModalPost.js';
/* import { renderComment } from './comment.js'; */

export const renderPostUser = (element) => {
  const postUser = document.createElement('section');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'myModal');

  getPost((dataPost) => {
    // console.log('Devuelve un objeto con idPost, img, likes, postUs', dataPost[0].idPost);
    // console.log(dataPost)
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
                
                </img>
              </div>
            </div>
            <p class="datePost" >${doc.time}</p>
            <p id="formPostShare" class="formPostShare" spellcheck = "false" >${doc.postUs}</p>
            ${renderImgPost}
            <div class="likesAndComments">
              <p class="valueLikes">${doc.likes.length} likes</p>
              <p>5 comments</p>
            </div>
            <div class="buttonLikeComment">
           
            <i  class="fa fa-thumbs-up fa-lg" id="buttonLikePost" data-id=${doc.idPost}></i>
              <button class="buttonCommentPost">Comment</button>
            </div>
              
              `;

      const userPost = postUnique.querySelector('.editByOwner');

      const user = firebase.auth().currentUser;

      // console.log(user.displayName, doc.userSign);
      if (user.displayName === doc.userSign) {
        const html = ` <img src="img/editButton.PNG" width="20" height="20" class="btnPostEdit" data-id=${doc.idPost}>
          <img src="img/deleteButton.PNG" width="20" height="20" class="btnPostDelete" data-id=${doc.idPost}>`;
        userPost.innerHTML = html;
      } else {
        // console.log('suerte');
      }
      // Funcionalidad para borrar post
      postUser.querySelectorAll('.btnPostDelete').forEach((btnPostDelete) => btnPostDelete.addEventListener('click', (e) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            );
            const idPost = e.target.dataset.id;
            // console.log(idPost);
            deletePost(idPost).then(() => console.log('elemento eliminado'));
          }
        });
      }));
      // Funcionalidad para editar post
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
              // console.log('hola');
              modal.style.display = 'none';
            });
            btnUpdate.addEventListener('click', () => {
              // console.log('hola');
              const inputPost = modalContent.querySelector('#inputPost');
              updatePost(idPost, {
                posting: inputPost.value,
              });
              console.log(idPost, {
                posting: inputPost.value,
              });
              modal.style.display = 'none';
            });
            modal.appendChild(modalContent);
            element.appendChild(modal);
            modal.style.display = 'block';
          });
      }));
      // const valueLikes = postUnique.querySelector('.valueLikes');
      //   const blueLike = postUser.querySelector('#buttonLikePost');
      // console.log(valueLikes);
      // console.log(valueLikes.textContent);
      // if (valueLikes.textContent === '0 likes') {
      //   postUser.querySelector('#buttonLikePost').styleSheets[0].cssRules[0].style('content');
      //   blueLike.classList.add('likeActive');
      // }

      postUser.appendChild(postUnique);
    });

    // Funcionalidad para darle like a los post
    postUser.querySelectorAll('#buttonLikePost').forEach((btnLike) => btnLike.addEventListener('click', (e) => {
      const userUid = firebase.auth().currentUser.uid;
      // console.log('id de usuario : ', userUid)
      const idPost = e.target.dataset.id;
      // console.log('id del post: ', idPost);

      getPostById(idPost)
        .then((infoId) => infoId.data())
        .then((data) => {
          // console.log(data);

          const newArray = [...data.likes];
          // console.log('Array con el id de todos los usuarios que dieron like: ', newArray);

          const idUnicos = [...new Set(newArray)];
          // console.log('Filtra los id de usuarios repetidos', idUnicos);

          // console.log('Devuelve la posición de cada id unico', idUnicos.indexOf(userUid));

          if (idUnicos.indexOf(userUid) === -1) {
            newArray.push(userUid);
            // console.log(newArray);
            // console.log(idUnicos.indexOf(userUid));
            likingPost(idPost, newArray);
          } else {
            // console.log(idUnicos.indexOf(userUid));

            const unlike = idUnicos.filter((element) => {
              if (userUid !== element) {
                return element;
              }
            });
            // console.log(unlike);
            likingPost(idPost, unlike);
          }
        });
    }));
    element.appendChild(postUser);
    // console.log(postUser);
  });
};
