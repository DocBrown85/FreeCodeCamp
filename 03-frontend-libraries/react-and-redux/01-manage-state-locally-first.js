class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(event) {
    let nextState = Object.assign({}, this.state);
    nextState.input = event.target.value;
    this.setState(nextState);
  }

  submitMessage() {
    const message = this.state.input;
    let nextState = {
      input: '',
      messages: [...this.state.messages, message]
    };
    this.setState(nextState);
  }

  render() {

    const listItems = this.state.messages.map((item, index) => {
      return <li key={index}>{item}</li>
    });

    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* render an input, button, and ul here */ }
          <input type="text" onChange={this.handleChange} value={this.state.input}></input>
          <button onClick={this.submitMessage}>Add</button>
          <ul>
            {listItems}
          </ul>
        { /* change code above this line */ }
      </div>
    );
  }
};
