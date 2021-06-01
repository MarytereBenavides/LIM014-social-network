export const renderModalPost = (data) => {
  console.log(data.posting);
  const modalEditPost = document.createElement('div');
  modalEditPost.classList.add('modal-content');
  modalEditPost.innerHTML = `
      <section class="editPostClose">
      <span >Edit post</span>
      <span class="close">&times;</span>
      </section>
      <section class="dataUser">
        <img class="photoProfilePost" src="${data.userImg}" width="26" height="26"/>
        <span>${data.user}</span>
      </section>
      <textarea id="inputPost" class="userEditPost" type="text">${data.posting}</textarea>  
        <section class="editPostImagen">
          <input type="file">
        </section>
        <button id="btnPostUpdate" class="btnPostUpdate">Update</button>
      `;
  return modalEditPost;
};
