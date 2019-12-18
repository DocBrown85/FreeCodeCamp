class TimerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="timer-display">
        <div id="timer-label" className="label">
          {this.props.name}
        </div>
        <div id="time-left" className="display">
          {this.props.timeLeft}
        </div>
      </div>
    );
  }
}

class TimerLengthControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="timer-length-control">
        <div id={`${this.props.quantityName}-label`} className="label-quantity">
          {this.props.quantityName} length
        </div>
        <div className="timer-length-control-buttons">
          <div
            id={`${this.props.quantityName}-increment`}
            className="button fa fa-arrow-up fa-2x"
            onClick={this.props.quantityIncrement}
          />
          <div id={`${this.props.quantityName}-length`} className="display">
            {this.props.quantity}
          </div>
          <div
            id={`${this.props.quantityName}-decrement`}
            className="button fa fa-arrow-down fa-2x"
            onClick={this.props.quantityDecrement}
          />
        </div>
      </div>
    );
  }
}

class TimerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="timer-controls-container">
        <div id="timer-lenght-controls-container">
          <TimerLengthControl
            quantityName="break"
            quantity={this.props.breakLength}
            quantityIncrement={this.props.breakIncrement}
            quantityDecrement={this.props.breakDecrement}
          />
          <TimerLengthControl
            quantityName="session"
            quantity={this.props.sessionLength}
            quantityIncrement={this.props.sessionIncrement}
            quantityDecrement={this.props.sessionDecrement}
          />
        </div>
        <div id="timer-buttons-container">
          <div id="start_stop" onClick={this.props.timerStartStopBtnOnClick}>
            <div id="timer-button-play" className="button fa fa-play fa-2x" />
            <div id="timer-button-pause" className="button fa fa-pause fa-2x" />
          </div>
          <div
            id="reset"
            className="button fa fa-refresh fa-2x"
            onClick={this.props.timerReset}
          />
        </div>
      </div>
    );
  }
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.defaults = {
      breakLength: 5,
      sessionLength: 25
    };
    this.state = {
      breakLength: this.defaults.breakLength,
      sessionLength: this.defaults.sessionLength,
      contextRunning: false,
      currentContext: {
        name: "session",
        timeLeft: this.defaults.sessionLength * 60
      }
    };
    this.timer = null;
    this.beeper = null;
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.timerCallback = this.timerCallback.bind(this);
    this.contextSwitch = this.contextSwitch.bind(this);
    this.clockify = this.clockify.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerStartStopBtnOnClick = this.timerStartStopBtnOnClick.bind(this);
  }

  sessionIncrement() {
    if (this.state.contextRunning == true) {
      return;
    }
    let nextState = Object.assign({}, this.state);
    nextState.sessionLength = this.lengthControl(nextState.sessionLength, +1);
    nextState.currentContext.timeLeft = nextState.sessionLength * 60;
    this.setState(nextState);
  }

  sessionDecrement() {
    if (this.state.contextRunning == true) {
      return;
    }
    let nextState = Object.assign({}, this.state);
    nextState.sessionLength = this.lengthControl(nextState.sessionLength, -1);
    nextState.currentContext.timeLeft = nextState.sessionLength * 60;
    this.setState(nextState);
  }

  breakIncrement() {
    if (this.state.contextRunning == true) {
      return;
    }
    let nextState = Object.assign({}, this.state);
    nextState.breakLength = this.lengthControl(nextState.breakLength, +1);
    this.setState(nextState);
  }

  breakDecrement() {
    if (this.state.contextRunning == true) {
      return;
    }
    let nextState = Object.assign({}, this.state);
    nextState.breakLength = this.lengthControl(nextState.breakLength, -1);
    this.setState(nextState);
  }

  timerStart() {
    let nextState = Object.assign({}, this.state);
    nextState.contextRunning = true;
    this.timer = setInterval(this.timerCallback, 1000);
    this.setState(nextState);
  }

  timerStop() {
    clearInterval(this.timer);
    this.timer = null;

    let nextState = Object.assign({}, this.state);
    nextState.contextRunning = false;
    this.setState(nextState);
  }

  timerReset() {
    clearInterval(this.timer);
    this.timer = null;

    this.beeper.pause();
    this.beeper.currentTime = 0;

    let nextState = Object.assign({}, this.state);
    nextState.contextRunning = false;
    nextState.breakLength = this.defaults.breakLength;
    nextState.sessionLength = this.defaults.sessionLength;
    nextState.currentContext = {
      name: "session",
      timeLeft: this.defaults.sessionLength * 60
    };
    this.setState(nextState);
  }

  timerCallback() {
    if (this.state.currentContext.timeLeft === 0) {
      this.contextSwitch();
      this.beeper.play();
    } else {
      let nextState = Object.assign({}, this.state);
      nextState.currentContext.timeLeft -= 1;
      this.setState(nextState);
    }
  }

  contextSwitch() {
    let nextState = Object.assign({}, this.state);
    if (this.state.currentContext.name == "session") {
      nextState.currentContext.name = "break";
      nextState.currentContext.timeLeft = this.state.breakLength * 60;
    } else {
      nextState.currentContext.name = "session";
      nextState.currentContext.timeLeft = this.state.sessionLength * 60;
    }
    this.setState(nextState);
  }

  clockify(timer) {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  lengthControl(length, delta) {
    let result = length + delta;
    if (result > 60) {
      result = 60;
    } else if (result <= 0) {
      result = 1;
    }
    return result;
  }

  timerStartStopBtnOnClick() {
    if (this.state.contextRunning == true) {
      this.timerStop();
    } else {
      this.timerStart();
    }
  }

  render() {
    return (
      <div id="pomodoro-clock">
        <h2 className="application-title">Pomodoro Clock</h2>
        <TimerDisplay
          name={this.state.currentContext.name}
          timeLeft={this.clockify(this.state.currentContext.timeLeft)}
        />
        <TimerControls
          sessionLength={this.state.sessionLength}
          sessionIncrement={this.sessionIncrement}
          sessionDecrement={this.sessionDecrement}
          breakLength={this.state.breakLength}
          breakIncrement={this.breakIncrement}
          breakDecrement={this.breakDecrement}
          timerStartStopBtnOnClick={this.timerStartStopBtnOnClick}
          timerReset={this.timerReset}
        />
        <audio
          id="beep"
          src="https://goo.gl/65cBl1"
          ref={element => {
            this.beeper = element;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <PomodoroClock />,
  document.getElementById("pomodoro-clock-root")
);
