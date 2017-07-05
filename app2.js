const setPropsToObj = (obj, props) => {
  Object.keys(props).forEach((key) => {
    obj[key] = props[key];
  });
};

const createElement = (type, params = {}, parent) => {
  const {content} = params;
  const elem = type !== 'text'? document.createElement(type): document.createTextNode(content);

  Object.keys(params).forEach((key) => {
    if (typeof elem[key] === 'object') {
      setPropsToObj(elem[key], params[key]);
    } else {
      elem[key] = params[key];
    }
  });

  if (parent) {
    parent.appendChild(elem);
  }

  return elem;
};

const clearNode = (node) => node.innerHTML = '';


const people = (() => {

  const people = [];

  //cache DOM
  const el = document.querySelector('.peopleModule');
  const button = el.querySelector('button');
  const input = el.querySelector('input');
  const ul = el.querySelector('ul');


  const addPerson = (value) => {
    const name = (typeof value === 'string') ? value : input.value;
    people.push(name);
    render();
    input.value = '';
  };

  const deletePerson = (event) => {
    let i;
    if (typeof event === 'number'){
      i = event;
    } else {
      console.log(event);
      i = people.indexOf(event.target.innerHTML);
    }

    people.splice(i, 1);
    render();
  };

  //bind events
  button.addEventListener('click', addPerson);
  ul.addEventListener('click', deletePerson);

  const render = () => {
    clearNode(ul);
    people.forEach(name => {
      const li = createElement('li', {}, ul);
      const span = createElement('span', {}, li);
      const content = createElement('text', {
        content: name,
      }, span);
      const closeBtn = createElement('i', {
        className: 'del',
      }, li);
      const closeIcon = createElement('text', {
        content: 'X',
      }, closeBtn);
    });
  };

  render();

  return {
    addPerson,
    deletePerson,
  }
})();
