/**
 * Ф-я находит элементы статичные элементы и возвращает их.
 *
 * @return {{toDoWrapper: HTMLDivElement, addTaskButton: HTMLButtonElement, addInputValue: HTMLInputElement, taskList: HTMLUListElement}}
 */
export const getStaticTaskElements = () => {
    const addInputValue = document.querySelector('.todo__add-input');
    const addTaskButton = document.querySelector('.todo__add-btn');
    const toDoWrapper = document.querySelector('.todo');
    const taskList = document.querySelector('.todo__list');
    const tasks = [...document.querySelectorAll('.todo-item')];
    const errorMsg = document.querySelector('.todo__add-error');

    return {
        addInputValue,
        addTaskButton,
        toDoWrapper,
        taskList,
        tasks,
        errorMsg,
    }
}

/**
 * Функция создает новый элемент задачи с нужными классами и возвращает его.
 *
 * @param {string} taskText - Текст новой добавленной задачи с инпута.
 * @return {HTMLElement}
 */
export const createTaskElement = (taskText) => {
    const IMAGE_URL = {
        COMPLETE: './images/complete.svg',
        DELETE: './images/trash.svg',
    }

    const taskWrapperElem = document.createElement('li');
    taskWrapperElem.classList.add('todo-item', 'todo__list-item');

    const taskTextElem = document.createElement('p');
    taskTextElem.classList.add('todo-item__text');
    taskTextElem.innerText = taskText;
    taskWrapperElem.append(taskTextElem)

    const completeButtonElem = document.createElement('button');
    completeButtonElem.classList.add('todo-item__btn', 'todo-item__complete');
    taskWrapperElem.append(completeButtonElem)

    const deleteButtonElem = document.createElement('button');
    deleteButtonElem.classList.add('todo-item__btn', 'todo-item__delete');
    taskWrapperElem.append(deleteButtonElem)

    const completeIconElem = document.createElement('img');
    completeIconElem.setAttribute('src', IMAGE_URL.COMPLETE);
    completeIconElem.setAttribute('alt', 'complete task');
    completeButtonElem.append(completeIconElem)

    const deleteIconElem = document.createElement('img')
    deleteIconElem.setAttribute('src', IMAGE_URL.DELETE);
    deleteIconElem.setAttribute('alt', 'delete task');
    deleteButtonElem.append(deleteIconElem)

    return taskWrapperElem;
}
