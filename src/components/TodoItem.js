import React from "react";
import classNames from 'classnames';

class TodoItem extends React.Component {
  render() {
      const {item} = this.props;
      return (
        <div
        className={classNames('todo-item', {'is-complete': item.isComplete})}
        onClick={this.props.handleTodo(item.index)}
        >
            <span>
              {item.index + 1 + '. '}
            </span>
            <span>
              {item.title}
            </span>
        </div>
      );
  }
}

export default TodoItem;
