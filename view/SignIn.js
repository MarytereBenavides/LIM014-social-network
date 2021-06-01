/* eslint-disable no-unused-vars */
import { signIn, signInGoogle } from '../lib/user/userService.js';

export default () => {
  const viewSignIn = document.createElement('div');
  viewSignIn.classList.add('signInGrid');
  viewSignIn.innerHTML = `

 <img src="img/funkoLogoSignIn.jpg"  class="homeFunkOok" alt="logo"> 
    <section class="container container-signIn" >
      <figure class="signIn-images">
        <img src="img/logo.png" width="118" height="95"  alt="logo">
        <img src="img/funkOok.png" width="136" height="50"  alt="">
      </figure>
      <section class="signInUp-input signIn-input">
        <label>Email</label>
        <input type="email" id="signInEmail" placeholder="name@example.com" />
        <label >Password</label>
        <input type="password" id="signInPassword" placeholder="*********"/>
        <p id="errMessage"></p> 
      </section>
     
      
      
      <!-- <a class = "recoverPass" href="#/RecoverPassword">Did you forget your password?</a> -->
      
      <button id="buttonLogin" class="buttonAllLogin" > Login </button>
      
      <section class="signIn-google">
        <p class="">-OR-</p>
        <p class=""> <b>Sign in with</b></p>
        <img src="img/googleIcon.png" width="39" height="40" class="button-google" id=   "buttonLoginGoogle"/>
      </section>
      <section class="signIn-dontAccount">
        <span>Don't have an Account?</span>
        <span><a id="buttonSignUp" class ="signInUp-buttonSignInUp" href="#/Register" > <b>Sign Up</b> </a></span>
      </section>

    </section>`;
  // console.log('hola mundo  ');

  const btnLogin = viewSignIn.querySelector('#buttonLogin');

  // const inputPassword = viewSignIn.querySelector('#signInPassword');

  // function maskify(str) {
  //   const passwordToHide = str.value;
  //   const x = passwordToHide.length;
  //   let output = '';
  //   for (let i = 0; i < x; i += 1) {
  //     output += '*';
  //   }
  //   return output;
  // }
  // inputPassword.addEventListener('keyup', (e) => {
  //   e.preventDefault();
  //   inputPassword.value = maskify(inputPassword);
  //   console.log(maskify(inputPassword));
  //   console.log(maskify(inputPassword));
  // });

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signInEmail').value;
    const password = document.querySelector('#signInPassword').value;
    signIn(email, password)
      .then((userCredential) => {
        // document.querySelector('#userSignInForm').reset();
        window.location.hash = '#/Home';
      })
      .catch((err) => {
        const errMessage = viewSignIn.querySelector('#errMessage');
        console.log(err);
        console.log(err.message.length);
        errMessage.innerHTML = err.message;
        window.location.hash = '';
        if (err.message.length === 37) {
          const emailWrong = document.querySelector('#signInEmail');
          const passwordWrong = document.querySelector('#signInPassword');
          emailWrong.style.cssText = 'border-bottom: 1px solid rgb(255 0 0);';
          passwordWrong.style.cssText = 'border-bottom: 1px solid rgb(95, 93, 93);';
        } else if (err.message.length === 61) {
          const emailWrong = document.querySelector('#signInEmail');
          const passwordWrong = document.querySelector('#signInPassword');
          passwordWrong.style.cssText = 'border-bottom: 1px solid rgb(255 0 0);';
          emailWrong.style.cssText = 'border-bottom: 1px solid rgb(95, 93, 93);';
        } else {
          const emailWrong = document.querySelector('#signInEmail');
          const passwordWrong = document.querySelector('#signInPassword');
          passwordWrong.style.cssText = 'border-bottom: 1px solid rgb(255 0 0);';
          emailWrong.style.cssText = 'border-bottom: 1px solid rgb(255 0 0);';
        }
      });
    console.log(password);
  });

  const btnGoogle = viewSignIn.querySelector('#buttonLoginGoogle');

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle()
      .then((result) => {
        console.log(result);
        console.log('hola');
        const user = result.user;
        console.log(user);
        window.location.hash = '#/Home';
      })
      .catch((err) => {
        console.log(err);
        window.location.hash = '';
      });
  });

  return viewSignIn;
};
