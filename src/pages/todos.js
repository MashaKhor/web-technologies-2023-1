import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";
import Form from "../components/form.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const getAll = async () => {
        const todos = await Todos.getAll();
        document.querySelector('.todo-list').innerHTML = '';
        loading.stop();
        todos.forEach(todo => {
            document.querySelector('.todo-list').insertAdjacentElement("beforeend", createNewTodo(todo));
        });
    }

    function createNewTodo(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.checked = todo.completed;
        todoCheckbox.onchange = async function(e) {
            await updateStatusTodo(e, todo.id);
        }

        const todoDesc = document.createElement('span');
        todoDesc.classList.add('todo_description');
        todoDesc.innerText = todo.description;

        const todoButton = document.createElement('button');
        todoButton.classList.add('todo_but_remove');
        todoButton.innerText = 'Удалить';
        todoButton.addEventListener('click', async () => {
            await Todos.deleteById(todo.id);
            await getAll();
        })

        todoDiv.insertAdjacentElement("beforeend", todoCheckbox);
        todoDiv.insertAdjacentElement("beforeend", todoDesc);
        todoDiv.insertAdjacentElement("beforeend", todoButton);

        return todoDiv;
    }

    const updateStatusTodo = async(e, todoId) => {
        loading.start();
        const checkboxValue = e.target.checked;
        e.target.checked = !e.target.checked;
        const response = await Todos.updateById(todoId, checkboxValue);
        loading.stop();
        if (response) {
            e.target.checked = !e.target.checked;
        } else {
            console.log('Не удалось отправить запрос.');
        }
    }

    const form = document.getElementById('add-form');
    new Form(form, {
        'description': () => false,
    }, (values) => {
        addTodo(values.description);
    })

    const addTodo = async (desc) => {
        const response = await Todos.create(desc);
        if (response) {
            await getAll();
        } else {
            console.log('Ошибка добавления Todo');
        }
    }

    await getAll();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
