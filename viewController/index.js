import { components } from '../view/App.js';

const changeView = (route) => {
  const container = document.getElementById('root');
  container.innerHTML = '';
  switch (route) {
    case '':
      container.appendChild(components.signIn());
      break;
    case '#/Register':
      container.appendChild(components.signUp());
      break;
    case '#/Home':
      container.appendChild(components.header());
      container.appendChild(components.home());
      break;
    case '#/Profile':
      container.appendChild(components.header());
      container.appendChild(components.profile());
      break;
    case '#/RecoverPassword':
      container.appendChild(components.recoverPassword());
      break;
    default:
      container.appendChild(components.header());
      container.appendChild(components.different());
      break;
  }
};

export { changeView };
