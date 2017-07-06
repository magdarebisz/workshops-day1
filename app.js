const createElement = (type, params = {}) => {
  const { content } = params;
  let elem;

  if (type === 'text') {
    elem = document.createTextNode(content);
  } else {
    elem = document.createElement(type);
  }

  Object.keys(params).forEach((key) => {
      elem[key] = params[key];
  });

  return elem;
};
  // 11
const clearNode = (node) => node.innerHTML = '';

const people = (() => {
  // 1
  const people = [];
  // 2
  const el = document.querySelector('.peopleModule');
  // 3
  const button = el.querySelector('button');
  // 4
  const input = el.querySelector('input');
  // 10
  const ul = el.querySelector('ul');

  // 7
  const addPerson = (name) => {
    people.push(name);
    render();
    input.value = '';
  };
  // 15
  const deletePerson = (index) => {
    people.splice(index, 1);
    render();
  };
  // 6
  const addPersonHandler = () => {
    addPerson(input.value);
  };
  // 14
  const deletePersonHandler = (event) => {
    const indexToRemove = people.indexOf(event.target.innerHTML);
    deletePerson(indexToRemove);
  };
  // 5
  button.addEventListener('click', addPersonHandler);
  // 13
  ul.addEventListener('click', deletePersonHandler);
  // 9
  const getPersonHtmlItem = (name) => {
      const li = createElement('li');
      const span = createElement('span');
      const content = createElement('text', {
        content: name,
      });
      const closeBtn = createElement('i', {
        className: 'del',
      });
      const closeIcon = createElement('text', {
        content: 'X',
      });

      li.appendChild(span);
      span.appendChild(content);
      li.appendChild(closeBtn);
      closeBtn.appendChild(closeIcon);

      return li;
  };
  // 8
  const render = () => {
    clearNode(ul);
    people.forEach(name => {
      const personHtmlItem = getPersonHtmlItem(name);
      ul.appendChild(personHtmlItem);
    });
  };
  // 12
  // 16
  return {
    addPerson,
    deletePerson,
  }
})();
