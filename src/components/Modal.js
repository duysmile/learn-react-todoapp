import React from 'react';
import CloseIcon from '../img/close.svg';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.onChange = this.onChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({
      text: value,
    });
  }

  addItem() {
    const text = this.state.text && this.state.text.trim();
    if (!text) {
        return;
    }
    this.props.addItem(this.state.text);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <div className="fade-background">
        <div className="modal">
          <div className="modal-header">
            <h3>Add Todo</h3>
            <a className="btn-close" href="#" onClick={this.props.closeModal}>
              <img src={CloseIcon} width={12} height={12} />
            </a>
          </div>
          <div className="modal-body">
            <form className="form" onSubmit={this.addItem}>
              <input
                onChange={this.onChange}
                type="text"
                placeholder="Enter new todo"
              />
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn-add" onClick={this.addItem}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
