import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Modal from './Modal';
import MenuIcon from '../img/menu.svg';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        
      ],
      isOpenModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleTodo = this.handleTodo.bind(this);
  }

  openModal() {
    this.setState({
      isOpenModal: true,
    });
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  addItem(value) {
    if (!value) {
      return;
    }

    this.setState({
      todoItems: [
        {
          title: value,
          isComplete: false,
        },
        ...this.state.todoItems,
      ],
      isOpenModal: false,
    });
  }

  handleTodo(index) {
    return () => {
      this.setState({
        todoItems: this.state.todoItems.map((todo, i) => {
          if (i === index) {
            return {
              ...todo,
              isComplete: !todo.isComplete,
            };
          }
          return todo;
        }),
      });
    };
  }

  render() {
    const { isOpenModal, todoItems } = this.state;
    const activeTodo = todoItems.reduce((acc, todo, index) => {
      if (!todo.isComplete) {
        return [
          ...acc,
          {
            ...todo,
            index,
          },
        ];
      }
      return acc;
    }, []);
    const finishTodo = todoItems.reduce((acc, todo, index) => {
      if (todo.isComplete) {
        return [
          ...acc,
          {
            ...todo,
            index,
          },
        ];
      }
      return acc;
    }, []);

    return (
      <div className="todo">
        <div className="header">
          <img src={MenuIcon} width={16} height={16} />
          <h2>Dailist</h2>
        </div>
        <div className="todo-list">
          {todoItems.length === 0 && <div className="no-item"></div>}
          {activeTodo.length > 0 && (
            <div className="todo-body">
              <div className="todo-header">Upcoming</div>
              {activeTodo.map((todo, index) => (
                <TodoItem
                  item={todo}
                  key={index}
                  handleTodo={this.handleTodo}
                />
              ))}
            </div>
          )}
          {finishTodo.length > 0 && (
            <div className="todo-body">
              <div className="todo-header">Finished</div>
              {finishTodo.map((todo, index) => (
                <TodoItem
                  item={todo}
                  key={index}
                  handleTodo={this.handleTodo}
                />
              ))}
            </div>
          )}
        </div>
        <div className="footer">
          <button className="btn-add" onClick={this.openModal}>
            +
          </button>
        </div>
        {isOpenModal && (
          <Modal closeModal={this.closeModal} addItem={this.addItem} />
        )}
      </div>
    );
  }
}

// Requirements:
// Viết một app todo-list có giao diện như hình https://cdn.glitch.com/780fd866-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Không cần phải giống 100%, nhưng càng giống càng tốt và phải có tính thẩm mỹ
// Illustration có thể tải ở đây https://undraw.co/illustrations hoặc các nguồn khác và upload lên Glitch assets
// Cần làm:
// - Màn hình danh sách todo list, nếu trống thì hiển thị một hình nào đó như trong ảnh
// - Khi ấn nút + để tạo todo mới thì hiển thị modal có chứa 1 text input và nút để add
// - Khi ấn vào 1 item thì sẽ toggle trạng thái isDone của nó
// - Nếu isDone là true thì cho vào danh sách Finished, còn không thì ở Upcoming
