import { createPost, createUrlImgPost } from '../lib/user/postsService.js';
import { hearSign } from '../lib/user/userService.js';
import { renderPostUser } from './posts.js';

export default () => {
  const viewHome = document.createElement('section');
  viewHome.classList.add('containerHome');
  viewHome.classList.add('gridTemplate');
  // const usernameId = firebase.auth().currentUser.uid;
  viewHome.innerHTML = `
  
        <aside class="userPrincipal">

        </aside>
        <div class="createPost">
          <form action="" id="iNeed">
            <textarea id="descriptionPost" class="descriptionPost" placeholder="¿Qué estás pensando?" spellcheck = "false" required></textarea>
            <input type="file" class="inputFile" id="postPhoto">
            <div class="optionSeccion">
              <select id="privacy-option">
                <option value="public" title = "Public">Public</option>
                <option value="private" title = "Private">Private</option>
              </select>
              <button  id="btnPost" class="btnDangerPost" >Publicar</button>
            </div>
          </form>
        </div>
      
       `;

  const btnPost = viewHome.querySelector('#btnPost');
  const descriptionPost = viewHome.querySelector('#descriptionPost');
  const postPhoto = viewHome.querySelector('#postPhoto');

  const userPrincipal = viewHome.querySelector('.userPrincipal');
  /*
  <img class="photoProfile" src="${user.photoURL}"/>
          <div class="userAndStatus">
            <h3 >${user.displayName}</h3>
            <div class="status">
              <img  src="img/greenDot.png"/>
              <span>${user.email}</span>
            </div>
          </div> */

  hearSign((user) => {
    const html = `
    
          <div class="containerBox">
            <img src="img/FunkoHome.jpg" class="banner"> </img>
              <img src="${user.photoURL}" alt="profile_user" class="profileImg">
              <div class="userAndStatus">
              <h1 class="userName">${user.displayName}</h1>
              <div class="status">
                <img  src="img/greenDot.png"/>
                <span class="description">${user.email}</span>
                </div>
              </div>
               <!-- <p class="userName editName" contenteditable="true">James&nbsp;</p> --!>         
              <button class="btnProfile" onclick="window.location.hash = '#/Profile'">Edita tu perfil</button>
          </div>

          `;
    userPrincipal.innerHTML = html;
  });
  const validatePost = (datafile) => {
    if (descriptionPost.value.trim().length === 0 && datafile === undefined) {
      btnPost.disable = false;
      console.log('hola campos basios');
      btnPost.classList.remove('btnCreatePost');
      btnPost.classList.add('btnDangerPost');
      viewHome.querySelector('.descriptionPost').value = '';
    } else if (datafile === undefined && descriptionPost.value) {
      console.log('sin imagen');
      const user = firebase.auth().currentUser;
      createPost(user.uid, user.displayName, user.photoURL, descriptionPost.value, '');
      viewHome.querySelector('.descriptionPost').value = '';
      viewHome.querySelector('.inputFile').value = '';
    } else {
      console.log('subir imagen');
      createUrlImgPost(postPhoto.files[0])
        .then((urlImg) => {
          const user = firebase.auth().currentUser;
          createPost(user.uid, user.displayName, user.photoURL, descriptionPost.value, urlImg);
          viewHome.querySelector('.descriptionPost').value = '';
          viewHome.querySelector('.inputFile').value = '';
        })
        .catch((error) => console.log(error));
    }
  };

  btnPost.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('click-crearPost');
    // console.log(descriptionPost.value.trim().length);
    validatePost(postPhoto.files[0]);
  });

  descriptionPost.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && descriptionPost.value === '' && postPhoto.files[0] === undefined) {
      btnPost.classList.remove('btnCreatePost');
      btnPost.classList.add('btnDangerPost');
    } else {
      btnPost.classList.remove('btnDangerPost');
      btnPost.classList.add('btnCreatePost');
    }
  });

  postPhoto.addEventListener('change', (e) => {
    console.log('mundo file');
    if (e.target.value !== '') {
      btnPost.classList.remove('btnDangerPost');
      btnPost.classList.add('btnCreatePost');
    }
  });

  renderPostUser(viewHome);

  return viewHome;
};
