// addInputValue - поле с названием новой задачи (input)
// addTaskButton - кнопка добавления задачи (button)
// toDoWrapper - общая оболочка для делегирования
// taskList - родитель списка для вставки задач (ul)
// tasks - существующуие задачи (li)
// errorMsg - блок с сообщением об ошибке

const TASK_CLASSES = {
    COMPLETE: 'todo-item__complete',
    DELETE: 'todo-item__delete',
    FILTER: 'todo__filter-btn',
}

const STATE_CLASSES = {
    COMPLETED: 'completed',
}

const FILTER_TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
}

export class ToDo {
    /**
     *
     * @param {function(): Object} getStaticElements - Ф-я, которая возвращает статические node элементы для управления
     * @param {function(): HTMLUListElement} createTaskNode - Ф-я создает новый node элемент задачи и возвращает его
     */
    constructor(getStaticElements, createTaskNode) {
        this.staticElements = getStaticElements();
        this.createTask = createTaskNode;
        this.tasks = this.staticElements.tasks;
        this.isEmptyValue = true;
    }

    setErrorMsg = () => {
        const { errorMsg } = this.staticElements;

        errorMsg.style.display = this.isEmptyValue ? 'block' : 'none';
    }

    /**
     * Создает и вставляет новую задачу в список.
     */
    setTask = () => {
        if (this.isEmptyValue) return;

        const { taskList, addInputValue } = this.staticElements;
        const taskText = addInputValue.value;
        const newTask = this.createTask(taskText);

        this.tasks.push(newTask);
        taskList.append(newTask);
        addInputValue.value = '';
    }

    /**
     * Функция обновляет все задачи путем стирания и перезаписывания актуальных задач.
     */
    updateTasks = (tasks) => {
        const { taskList } = this.staticElements;

        taskList.innerHTML = '';

        taskList.append(...tasks);
    }

    setCompleteTask = (taskElem) => {
        taskElem.classList.add(STATE_CLASSES.COMPLETED);
    }

    /**
     * Функция принимает элемен задачи, которую нужно удалить и фильтрует все задачи
     *
     * @param {HTMLLIElement} taskElem - HTML элемент текущей задачи, которую нужно удалить.
     */
    deleteTask = (taskElem) => {
        const filteredTasks = this.tasks.find(item => item === taskElem);

        if (!filteredTasks) return;

        filteredTasks.remove();

        this.tasks = this.tasks.filter(item => item !== taskElem);
    }

    /**
     * Функция принимает тип фильтрации и исходя из типа фильтрует задачи.
     *
     * @param {string} filterType - Тип фильтрации из трех. all, active, completed
     */
    filterTasks = (filterType) => {
        let filteredTasks = [];

        switch (filterType) {
            case FILTER_TYPES.COMPLETED: {
                filteredTasks = this.tasks.filter(task => task.classList.contains(STATE_CLASSES.COMPLETED))

                this.updateTasks(filteredTasks);

                break;
            }

            case FILTER_TYPES.ACTIVE: {
                filteredTasks = this.tasks.filter(task => !task.classList.contains(STATE_CLASSES.COMPLETED))

                this.updateTasks(filteredTasks);

                break;
            }

            default: {
                this.updateTasks(this.tasks);
            }

        }
    }

    /**
     * Функция принимает HTML элемент button, берет из него текст и из текста получает тип фильтрации.
     *
     * @param {HTMLButtonElement} buttonElem - Текущая нажатая кнопка фильтрации
     * @return {string}
     */
    #getFilterTypeFromBtn = (buttonElem) => {
        const buttonSplitText = buttonElem.textContent.split(' ');

        if (buttonSplitText.length > 1) {
            return buttonSplitText[1].toLowerCase();
        }

        return buttonSplitText[0].toLowerCase();
    }


    /**
     * Ф-я навешивает слушатель на родительский блок методом делегирования выполняются нужные манипуляции с задачами.
     */
    setListener = () => {
        const { toDoWrapper, addTaskButton, addInputValue } = this.staticElements;

        toDoWrapper.addEventListener('click', (event) => {
            const target = event.target;
            const parent = target.parentNode
            const conditions = {
                isFilter: target.classList.contains(TASK_CLASSES.FILTER),
                isAddTask: target === addTaskButton || parent === addTaskButton,
                isCompleteTask: target.classList.contains(TASK_CLASSES.COMPLETE)
                     || parent.classList.contains(TASK_CLASSES.COMPLETE),
                isDeleteTask: target.classList.contains(TASK_CLASSES.DELETE)
                    || parent.classList.contains(TASK_CLASSES.DELETE),
            };

            // Проверка на клик кнопки фильтрации
            if (conditions.isFilter) {
                const filterType = this.#getFilterTypeFromBtn(target);

                this.filterTasks(filterType);
            }

            // Проверка на клик кнопки добавления задачи
            if (conditions.isAddTask) {
                this.isEmptyValue = !addInputValue.value;
                this.setErrorMsg()
                this.setTask();
            }

            // Проверка на клик кнопки выполнения задачи
            if (conditions.isCompleteTask) {
                this.setCompleteTask(target.closest('li'));
            }

            // Проверка на клик кнопки удаления задачи
            if (conditions.isDeleteTask) {
                this.deleteTask(target.closest('li'));
            }
        })
    }

}

