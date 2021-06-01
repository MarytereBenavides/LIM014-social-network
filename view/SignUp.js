import {
  createUser,
  sendEmail,
  upDateUser,
  uploadFileUserImg,
} from '../lib/user/userService.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.innerHTML = `
  <section class="container container-signUp"> 
  <h1>Sign Up</h1>
    <section class="signInUp-input signUp-input">
      <label>Full Name</label>
      <input type="text"  id="signUpFullname" placeholder=" Enter your Name"  />
      <label>Email</label>
      <input type="email" id="signUpEmail" placeholder=" name@example.com" />
      <label>Password</label>
      <input type="password" id="signUpPassword" placeholder=" Enter your Password"  />
      
      <label>Chosse your photo</label>
      <span>
      <input type="file" id="signUpPhoto" aria-describedby="inputGroupPrepend" />
      <p class="errMessage" id="errMessage"></p> 
    </section>

    <button class="buttonAllLogin" id="buttonRegister"  >REGISTER</button>
    <section class="signIn-dontAccount">
      <span>Have an Account?</span>
      <span><a id="buttonSignIn" class="signInUp-buttonSignInUp" href="" > <b>Sign In</b> </a></span>
    </section>
  </section>
  `;

  const signUpEmail = viewSignUp.querySelector('#signUpEmail');
  const signUpPassword = viewSignUp.querySelector('#signUpPassword');
  const signUpFullname = viewSignUp.querySelector('#signUpFullname');
  const buttonRegister = viewSignUp.querySelector('#buttonRegister');
  const signUpPhoto = viewSignUp.querySelector('#signUpPhoto');
  const errMessage = viewSignUp.querySelector('#errMessage');
  // const lengthFiles = signUpPhoto.files.length;
  console.log(signUpPhoto.files.length);

  buttonRegister.addEventListener('click', () => {
    // e.preventDefault();
    console.log('hola user');
    console.log(signUpPhoto.files.length);
    const signUpname = document.querySelector('#signUpFullname');
    const passwordWrong = document.querySelector('#signUpPassword');
    const emailWrong = document.querySelector('#signUpEmail');
    if (signUpname.value === '' || passwordWrong.value === '' || emailWrong.value === '' || signUpPhoto.files.length === 0) {
      // console.log(signUpname.value);
      // console.log(passwordWrong.value);
      // console.log(emailWrong.value);
      // console.log(signUpPhoto.files.length);
      // console.log('help');
      signUpname.classList.add('wrong');
      passwordWrong.classList.add('wrong');
      emailWrong.classList.add('wrong');
      signUpPhoto.classList.add('wrong');
      errMessage.innerHTML = '*All fields required ';
    } else {
      createUser(signUpEmail.value, signUpPassword.value)
        .then(() => {
          console.log('registrado');
          sendEmail();
          // signupForm.reset();
          uploadFileUserImg(signUpPhoto.files[0]).then((urlImg) => {
            upDateUser(signUpFullname.value, urlImg);
          });
          window.location.hash = '';
        // window.location.hash = '#/Home';
        })
        .catch((error) => {
          console.log('hola error');
          console.log(error);
          console.log(error.message);

          console.log(error.message.length);
          errMessage.innerHTML = error.message;
          window.location.hash = '#/Register';
        });
      sendEmail()
        .then(() => {
          errMessage.textContent = 'Please check your inbox to verify your account';
        })
        .catch((err) => {
          errMessage.textContent = err.message;
        });
    }
  });

  return viewSignUp;
};
