const modal = () => {
    const todotlistButton = document.querySelector('.todotlistButton');
    const modalCloseButton = document.querySelector('.modalCloseButton');
    const modalContainer = document.querySelector('.modalContainer');
    const categories = document.querySelectorAll('.categoryContainer > div');
    const todoInput = document.querySelector('.todoInput');
    const submitTodoButton = document.querySelector('.submitTodoButton');
    let selectedCategory = null;

    todotlistButton.addEventListener('click' , () => {
        modalContainer.classList.add('show');
        todoInput.value = '';
        categories.forEach(c => c.classList.remove('dimmed'));
        selectedCategory = null;
        todoInput.focus();
        categories.forEach(c => c.classList.remove('dimmed'));
    });

    modalCloseButton.addEventListener('click' , () => {
        if(todoInput.value.trim() !== '') {
            if(confirm('종료시 내용이 사라집니다. 종료하시겠습니까?') == true) {
                modalContainer.classList.remove('show');
                todoInput.value = '';
            }  else {
                return true;
            }
        }
        modalContainer.classList.remove('show');
    });

    categories.forEach((c) => {
        c.addEventListener('click' , () => {
            categories.forEach((other) => {
                if(other !== c) {
                    other.classList.add('dimmed')
                } else {
                    other.classList.remove('dimmed');
                    selectedCategory = c;
                }
            })
        })
    })

    todoInput.addEventListener('input' , () => {
        if(todoInput.value.trim() !== '') {
            submitTodoButton.style.visibility = 'visible'
        } else {
            submitTodoButton.style.visibility = 'hidden'
        }
    })

    submitTodoButton.addEventListener('click' , () => {
        if(!selectedCategory) {
            alert('카테고리를 선택해주세요');
            return;
        }
    })
}
modal();