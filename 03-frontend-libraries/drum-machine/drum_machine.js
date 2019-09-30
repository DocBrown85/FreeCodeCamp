/*
 * DrumMachine component
 */

const Display = (props) => {
  return ( <
    div id = "display" > DISPLAY < /div>
  )
}

const DrumPad = (props) => {
  return ( <
    div id = {
      `drum-pad-${props.padId}`
    }
    class = 'drum-pad' > {
      props.padId
    } < /div>
  )
}

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
    let drumPads = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map((item, index) => {
      return <DrumPad padId = {
        item
      }
      key = {
        index
      }
      / >
    });
    return <div id = "drum-machine" > < Display / > < div id = "pads-container" > {
      drumPads
    } < /div > < /div >
  }
}

ReactDOM.render( < DrumMachine / > , document.querySelector('#drum-machine-root'));