import { hearSign, upDateUser, uploadFileUserImg } from '../lib/user/userService.js';
import { updateInfoUserPost } from '../lib/user/postsService.js';

export default () => {
  const viewProfile = document.createElement('section');
  viewProfile.innerHTML = `
       
       <div class="profile">
      </div>
        `;

  const profile = viewProfile.querySelector('.profile');

  hearSign((user) => {
    const html = `
    <div class="containerBox">
    <img src="img/FunkoHome.jpg" class="banner"> </img>
    <img class="profileImg"  src="${user.photoURL}"/>
    <input type="file" id="editPhoto" aria-describedby="inputGroupPrepend"  class="hide" require />
    <div class="userAndStatus">
      <p class="userName">${user.displayName}</p>
      <p class="description">${user.email}</p>
    </div>
    <button class="editButton">
       Edit
       </button>      
       <button class="hide saveButton">save</button>
       <button class="hide saveCancel">cancel</button>
  </div>


  
    `;
    profile.innerHTML = html;
    // console.log(user.uid);
    const editDisplayName = profile.querySelector('.userName');
    const editPhoto = profile.querySelector('#editPhoto');
    const photoProfile = profile.querySelector('.profileImg');
    const editButton = profile.querySelector('.editButton');
    const saveButton = profile.querySelector('.saveButton');
    const saveCancel = profile.querySelector('.saveCancel');
    // console.log(editDisplayName);
    // console.log(editPhoto);
    // console.log(editPhoto.files.length);
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
      editDisplayName.setAttribute('contenteditable', true);
      editButton.classList.add('hide');
      saveButton.classList.remove('hide');
      saveCancel.classList.remove('hide');
      editPhoto.classList.remove('hide');
      editDisplayName.classList.add('editName');
    });

    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      editButton.classList.remove('hide');
      saveButton.classList.add('hide');
      saveCancel.classList.add('hide');
      editPhoto.classList.add('hide');
      editDisplayName.removeAttribute('contenteditable', true);
      editDisplayName.classList.remove('editName');
      let inputUserName = editDisplayName.textContent;

      // const editPhotoUser = editPhoto.value;
      // const userSign = e.target.dataset.id;
      // console.log(inputUserName);

      const userUpdateProfile = () => {
        if (inputUserName.length > 3) {
          upDateUser(inputUserName, photoProfile.src);
          updateInfoUserPost('id', user.uid).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // console.log(doc.data().id, user.uid);
              doc.ref.update({
                user: `${user.displayName}`,
              });
            });
          });
        } else {
          console.log('no me edto');
          inputUserName = user.displayName;
          editDisplayName.textContent = inputUserName;
        } if (editPhoto.files.length !== 0) {
          uploadFileUserImg(editPhoto.files[0]).then((url) => {
            photoProfile.setAttribute('src', url);
            upDateUser(inputUserName, url);
            updateInfoUserPost('id', user.uid).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data().id, user.uid);
                doc.ref.update({
                  userImg: `${user.photoURL}`,
                });
              });
            });
          });
        }
      };
      userUpdateProfile();
      // console.log(userUpdateProfile);
      // console.log(inputUserName);
      // console.log(photoProfile.src);
      // console.log(`${user.displayName}`);
      // console.log(editPhoto.files[0]);
      // console.log(editPhoto);
      // console.log(editPhotoUser);

      // if (inputUserName.length > 3 || editPhoto.files.length !== 0) {
      //   user.upDateUser({
      //     displayName: inputUserName,
      //     photoURL:,
      //   });
      //   uploadFileUserImg(editPhoto.files[0]).then((url) => {
      //     photoProfile.setAttribute('src', url);
      //     upDateUser(editDisplayName.value, url);
      //   });
      //   const db = firebase.firestore();
      //   db.collection('posts').where('id', '==', user.uid).get().then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       // console.log(doc.data().id, user.uid);
      //       doc.ref.update({
      //         user: `${user.displayName}`,
      //         userImg: `${user.photoURL}`,
      //       });
      //       console.log(`${user.photoURL}`);
      //     });
      //   });
      //   // console.log(inputUserName);
      // }
    });
    saveCancel.addEventListener('click', (e) => {
      e.preventDefault();
      editButton.classList.remove('hide');
      saveButton.classList.add('hide');
      saveCancel.classList.add('hide');
      editPhoto.classList.add('hide');
      editDisplayName.classList.remove('editName');
      editDisplayName.removeAttribute('contenteditable', true);
    });
  });

  return viewProfile;
};
