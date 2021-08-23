// main
const data = [];

const addBtn = document.querySelector('.add_btn');
const addInput = document.querySelector('.add_input');
const list = document.querySelector('.list');
const rollBtn = document.querySelector('.roll_btn');

addBtn.addEventListener('click', () => addMenu(data));
addInput.addEventListener('keypress', (e) => e.code === 'Enter' && addMenu(data));
list.addEventListener('click', ({ target }) => target.tagName === 'BUTTON' && deleteMenu(data, target.dataset.index));
rollBtn.addEventListener('click', () => list.classList.contains('rolling') || rollMenu(data));


// add
function add(data) {
  const inputValue = addInput.value;
  const index = data.length;

  const li = document.createElement('li');
  li.classList.add('item');
  li.innerHTML = `<b>${index + 1}</b>${inputValue}<button class="del_btn" data-index="${index}">x</div>`;
  list.append(li);

  data.push(inputValue);

  addInput.value = '';
  addInput.focus();
}

function emptyAlert() {
  alert('고민되는 메뉴를 입력해 주세요.');
  addInput.focus();
}

function maxAlert() {
  alert('메뉴는 최대 5개 까지만 고민할 수 있습니다.');
  addInput.value = '';
}

function addMenu(data) {
  const inputValue = addInput.value;
  if (inputValue === '') {
    emptyAlert();
  } else if (data.length > 4) {
    maxAlert();
  } else {
    add(data);
  }
}

// delete
function reloadMenu(data) {
  list.innerHTML = '';

  data.forEach((title, index) => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = `<b>${index + 1}</b>${title}<button class="del_btn" data-index="${index}">x</div>`;
    list.append(li);
  });
}

function deleteMenu(data, index) {
  data.splice(index, 1);
  reloadMenu(data);
}

// roll
function selectMenu(data) {
  list.classList.remove('rolling');
  list.innerHTML = '';

  const selectedIndex = (Math.floor(Math.random() * data.length));

  const li = document.createElement('li');
  li.classList.add('item', 'selected');
  li.innerHTML = `<b>${selectedIndex + 1}</b>${data[selectedIndex]}`;
  list.append(li);

  rollBtn.textContent = 'Clear';
}

function minAlert() {
  alert('최소 1개 이상의 메뉴를 입력해 주세요.');
  addInput.focus();
}

function clearMenu(data) {
  data.splice(0);
  list.innerHTML = '';
  rollBtn.textContent = 'Roll';
}

function rollMenu(data) {
  if (data.length === 0) {
    minAlert();
  } else if (rollBtn.textContent === 'Clear') {
    clearMenu(data);
  } else {
    list.classList.add('rolling');
    setTimeout(() => selectMenu(data), 1200);
  }
}

