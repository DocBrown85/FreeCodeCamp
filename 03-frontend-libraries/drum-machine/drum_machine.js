/*
 * DrumMachine component
 */
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePadOnClick = this.handlePadOnClick.bind(this);
  }

  handlePadOnClick(e) {
    this.setState({});
  }

  render() {
    return <div id = "drum-machine" > DRUM MACHINE </div>
 }
}

ReactDOM.render( < DrumMachine / > , document.querySelector('#drum-machine-root'));
