/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
let list = [];
let n = 1;
$(document).ready(() => {
  $('.add-todo').keypress((e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const text = {
        id: n,
        content: $('.add-todo').val(),
        isCompleted: false,
      };
      addTodo(text);
    }
  });

  $('.todo-list').on('click', '.btn-mark', function () {
    $(this).parent().toggleClass('list-item-done');
    $(this).toggleClass('todo__undone').toggleClass('todo__done');
    $(this).text($(this).hasClass('todo__undone') ? '完成' : '未完成');
    const listId = $(this).parent().attr('id');
    list = list.filter((item) => {
      if (item.id == listId) {
        item.isCompleted = !item.isCompleted;
        return true;
      }
      return true;
    });
  });

  $('.todo-list').on('click', '.todo__delete', function () {
    const deletedId = $(this).parent().parent().attr('id');
    removeTodo(deletedId);
  });
});

function addTodo(text) {
  list.push(text);
  $('.add-todo').val('');
  render();
  n += 1;
}

function removeTodo(id) {
  list = list.filter(item => item.id != id);
  render();
}

function render() {
  $('.todo-list').empty();
  list.forEach((el) => {
    if (el.isCompleted) {
      $('.todo-list').append(`
      <li id=${el.id} class="list-item list-item-done">
        <div class="list-item-prepend">
          <div  class="btn todo__delete">x</div>
          ${el.content}
        </div>
        <div class="btn todo__done btn-mark">未完成</div>
      </li>`);
    } else {
      $('.todo-list').append(`
      <li id=${el.id} class="list-item">
        <div class="list-item-prepend">
          <div  class="btn todo__delete">x</div>
          ${el.content}
        </div>
        <div class="btn todo__undone btn-mark">完成</div>
      </li>`);
    }
  });
}
