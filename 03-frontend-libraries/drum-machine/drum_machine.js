/*
 * DrumMachine component
 */
const soundBanks = [
  {
    bankName: "Heater Kit",
    bankSounds: [
      {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
      },
      {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
      },
      {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
      },
      {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
      },
      {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
      },
      {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
      },
      {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
      },
      {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
      },
      {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
      }
    ]
  },
  {
    bankName: "Smooth Piano Kit",
    bankSounds: [
      {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Chord-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
      },
      {
        keyCode: 87,
        keyTrigger: "W",
        id: "Chord-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
      },
      {
        keyCode: 69,
        keyTrigger: "E",
        id: "Chord-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
      },
      {
        keyCode: 65,
        keyTrigger: "A",
        id: "Shaker",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
      },
      {
        keyCode: 83,
        keyTrigger: "S",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
      },
      {
        keyCode: 68,
        keyTrigger: "D",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
      },
      {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Punchy-Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
      },
      {
        keyCode: 88,
        keyTrigger: "X",
        id: "Side-Stick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
      },
      {
        keyCode: 67,
        keyTrigger: "C",
        id: "Snare",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
      }
    ]
  }
];

const Display = props => {
  return <div id="display"> {props.display} </div>;
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", e =>
      this.props.handleKeyPress(e, this.props)
    );
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", e =>
      this.props.handleKeyPress(e, this.props)
    );
  }

  render() {
    return (
      <a
        id={`drum-pad-${this.props.keyTrigger}`}
        className="drum-pad"
        onClick={e => this.props.handlePadOnClick(e, this.props)}
      >
        <audio
          className="clip"
          src={this.props.clip}
          id={this.props.keyTrigger}
        />{" "}
        {this.props.keyTrigger}{" "}
      </a>
    );
  }
}

const BankSelector = props => {
  return (
    <div id="bank-selector-container">
      <span className="label">Bank</span>
      <label className="switch">
        <input type="checkbox" onChange={props.handleOnClick} />
        <span className="slider" />
      </label>
    </div>
  );
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      currentSoundBank: 0
    };
    this.handlePadOnClick = this.handlePadOnClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePadTrigger = this.handlePadTrigger.bind(this);
    this.handleBankSelectorOnClick = this.handleBankSelectorOnClick.bind(this);
  }

  handlePadOnClick(e, data) {
    this.handlePadTrigger(data);
  }

  handleKeyPress(e, data) {
    if (e.keyCode == data.keyCode) {
      this.handlePadTrigger(data);
    }
  }

  handlePadTrigger(data) {
    let nextState = Object.assign({}, this.state);
    nextState.display = data.clipId;
    this.setState(nextState);
    this.playClip(data);
  }

  handleBankSelectorOnClick(e) {
    let nextState = Object.assign({}, this.state);
    nextState.currentSoundBank += 1;
    nextState.currentSoundBank = nextState.currentSoundBank % 2;
    nextState.display = soundBanks[this.state.currentSoundBank].bankName;
    this.setState(nextState);
  }

  playClip(data) {
    const sound = document.getElementById(data.keyTrigger);
    sound.play();
  }

  render() {
    let drumPads = soundBanks[this.state.currentSoundBank].bankSounds.map(
      (item, index) => {
        return (
          <DrumPad
            keyCode={item.keyCode}
            keyTrigger={item.keyTrigger}
            clipId={item.id}
            clip={item.url}
            key={index}
            handlePadOnClick={this.handlePadOnClick}
            handleKeyPress={this.handleKeyPress}
          />
        );
      }
    );

    return (
      <div id="drum-machine">
        {" "}
        <Display display={this.state.display} />{" "}
        <div id="wrapper">
          <div id="pads-container"> {drumPads} </div>{" "}
          <div id="controls-container">
            <BankSelector handleOnClick={this.handleBankSelectorOnClick} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.querySelector("#drum-machine-root"));
