const todotlistButton = document.querySelector('.todotlistButton');
const modalContainer = document.querySelector('.modalContainer');
const modalCloseButton = document.querySelector('.modalCloseButton');
const categoryContainer = document.querySelector('.categoryContainer');
const categories = categoryContainer.querySelectorAll('div');
const todoInput = document.querySelector('.todoInput');
const todoSaveButton = document.querySelector('.todoSaveButton');
let selectCategory = null;
let categoryClass = '';
let categoryText = '';
const todostatus = document.querySelector('.todostatus');
const pTag = document.querySelector('.pTag');

const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todolistContainer = document.querySelector('.todolistContainer');
    todolistContainer.innerHTML = ''; 
    todos.forEach(todo => {
        todolistContainer.innerHTML += `
            <div class="todolist">
                <input type="checkbox" name="todostatus" class="todostatus" ${todo.checked ? 'checked' : ''}>
                <p class="pTag">${todo.text}</p>
                <div class="listCate">
                    <div class="${todo.categoryClass}">${todo.categoryText}</div>
                </div>
                <div class="todoManage">
                    <i class="fa-solid fa-trash"></i>
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.todostatus').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos[index].checked = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        });
    });
}

document.addEventListener('DOMContentLoaded', loadTodos);

todotlistButton.addEventListener('click', () => {
    categories.forEach(c => c.style.filter = 'grayscale(0)');
    todoInput.value = '';
    todoInput.focus();
    modalContainer.classList.add('show');
});

modalCloseButton.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        if (confirm('창을 닫을 시 입력된 내용은 모두 사라집니다.')) {
            modalContainer.classList.remove('show');
        } else {
            todoInput.focus();
            return;
        }
    } else {
        modalContainer.classList.remove('show');
    }
});

categories.forEach((c) => {
    c.addEventListener('click', () => {
        categories.forEach((other) => {
            if (other !== c) {
                other.style.filter = 'grayscale(0.7)';
            } else {
                other.style.filter = 'grayscale(0)';
            }
        });
        selectCategory = c;
        categoryText = c.innerText;
        categoryClass = c.className;
    });
});

todoSaveButton.addEventListener('click', () => {
    if (!selectCategory) {
        alert('카테고리를 선택해주세요.');
        return;
    }
    if (todoInput.value.trim() === '') {
        alert('할 일을 입력해주세요.');
        todoInput.focus();
        return;
    }

    let inputText = todoInput.value;
    const todolistContainer = document.querySelector('.todolistContainer');

    // Add todo to localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = {
        text: inputText,
        categoryClass: categoryClass,
        categoryText: categoryText,
        checked: false
    };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    todolistContainer.innerHTML += `
        <div class="todolist">
            <input type="checkbox" name="todostatus" class="todostatus">
            <p class="pTag">${inputText}</p>
            <div class="listCate">
                <div class="${categoryClass}">${categoryText}</div>
            </div>
            <div class="todoManage">
                <i class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-pen"></i>
            </div>
        </div>
    `;

    const newCheckbox = todolistContainer.lastElementChild.querySelector('.todostatus');
    newCheckbox.addEventListener('change', () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[todos.length - 1].checked = newCheckbox.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
    });

    modalContainer.classList.remove('show');
});