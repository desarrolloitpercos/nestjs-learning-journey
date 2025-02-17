import {templateString} from './bases/01-types';
// import { vulpix } from './bases/02-objects';
// import { mew } from './bases/03-classes';
// import { mew } from './bases/04-injection';
// import { vulpix } from './bases/05-decorators';
import { vulpix } from './bases/06-decorators';

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `
    count is ${counter}
    <a>Hi ${vulpix.name}</a>
    </br>
    <a>Además... ${templateString}</a>
    `;
    // <h4>Pokemon ${vulpix.name}</h4>
    // `;
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)

}
