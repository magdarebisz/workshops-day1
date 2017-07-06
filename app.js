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

const clearNode = (node) => node.innerHTML = '';

const people = (() => {

  const people = [];

  const el = document.querySelector('.peopleModule');
  const button = el.querySelector('button');
  const input = el.querySelector('input');
  const ul = el.querySelector('ul');


  const addPerson = (name) => {
    people.push(name);
    render();
    input.value = '';
  };

  const deletePerson = (index) => {
    people.splice(index, 1);
    render();
  };

  const addPersonHandler = () => {
    addPerson(input.value);
  };

  const deletePersonHandler = (event) => {
    const indexToRemove = people.indexOf(event.target.innerHTML);
    deletePerson(indexToRemove);
  };

  button.addEventListener('click', addPersonHandler);
  ul.addEventListener('click', deletePersonHandler);

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

  const render = () => {
    clearNode(ul);
    people.forEach(name => {
      const personHtmlItem = getPersonHtmlItem(name);
      ul.appendChild(personHtmlItem);
    });
  };

  render();

  return {
    addPerson,
    deletePerson,
  }
})();
