import 'normalize.css';
import styled from './index.css';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack';
    return element;
}

document.body.appendChild(component());