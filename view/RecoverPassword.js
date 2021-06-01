export default () => {
  const viewRecoverPassword = document.createElement('div');
  viewRecoverPassword.innerHTML = `
      <header>
      <h1 class="title">Funk-ook recover password</h1>
      <p class="text">Enter the email address associated with your account :</p>
    </header>
    <form id="recoverPassForm">
      <div class="div-input">
      <input type="email" id="email" placeholder="E-mail" />
      </div>
      <button class="btn-recoverPass">Recover Password</button>
      <button class="backLogin">atras</button>
    </form>`;
  /* -----------------------handle back to Sign In--------------- */
  const btnBackLogin = viewRecoverPassword.querySelector('.backLogin');
  btnBackLogin.addEventListener('click', () => {
    window.location.hash = '';
  });
  return viewRecoverPassword;
};
