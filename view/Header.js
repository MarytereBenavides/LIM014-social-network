import { signOut } from '../lib/user/userService.js';

export default () => {
  const viewHeader = document.createElement('header');
  viewHeader.innerHTML = `
   <img class="imgHeader" src="img/funkOokWhite.png" width="160" height="60"  alt="logo">
    <button id="hamburger" class="hamburger">
      <i class="fa fa-bars"></i>
    </button>
    <ul class="menuList" id="menuList">
        <li class=""><a href="#/Home"><i class=""></i>Home</a></li>
        <li class=""><a href="#/Profile"><i class=""></i>Profile</a></li>
        <li id="" class=""><span id =""><i class=""></i> <button id="btnLogOut" class="btnLogOut" >Log out</button></li>
    </ul>
`;
  // *********************************************logOut

  const btnLogOut = viewHeader.querySelector('#btnLogOut');
  const hamburger = viewHeader.querySelector('#hamburger');
  const menuList = viewHeader.querySelector('#menuList');
  const imgHeader = viewHeader.querySelector('.imgHeader');

  imgHeader.addEventListener('click', () => {
    window.location.hash = '#/Home';
  });
  hamburger.addEventListener('click', () => {
    menuList.classList.toggle('show');
  });

  btnLogOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOut()
      .then(() => {
        console.log('Cerrando sesión...');
        window.location.hash = '';
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return viewHeader;
};
// ************ok
