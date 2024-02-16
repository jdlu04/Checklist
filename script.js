let textInput = document.querySelector("#text-input");
let addButton = document.querySelector("#add-button");
let todoList = document.querySelector("#todo-list");
let todoItemTemplate = document.querySelector("#todo-item-template");

let state = [];
loadState();

addButton.addEventListener("click", function () {
	let item = {
		id: Date.now(),
		content: textInput.value,
		checked: false,
	};

	state.push(item);
	saveState();

	let todoItem = createItemElement(item);
	todoList.append(todoItem);
});

function createItemElement(item) {
	let todoItemTemplate = document.querySelector("#todo-item-template");
	let todoItem = todoItemTemplate.content.cloneNode(true);
	let listItem = todoItem.firstElementChild;

	let content = todoItem.querySelector(".todo-item-content");
	content.textContent = item.content;

	let checkbox = todoItem.querySelector(".todo-item-checkbox");
	checkbox.checked = item.checked;
	checkbox.addEventListener("input", function () {
		item.checked = checkbox.checked;
		saveState();
	});

	let removeButton = todoItem.querySelector(".remove-button");
		removeButton.addEventListener("click", function () {
		state = state.filter(function (listItem) {
			return listItem.id !== item.id;
		});
		saveState();
	
		listItem.remove();
	});

	return todoItem;
}

function saveState() {
	localStorage.setItem("state", JSON.stringify(state));
}

function loadState() {
	let loadedState = JSON.parse(localStorage.getItem("state"));

	if (loadedState) {
		state = loadedState;
	
		for (let item of state) {
			let todoItem = createItemElement(item);
			todoList.append(todoItem);
		}
	}
}

