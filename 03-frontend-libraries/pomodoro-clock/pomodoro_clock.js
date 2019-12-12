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
          {this.props.elapsedTime}
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
          <div id="start_stop">
            <div
              id="timer-button-play"
              className="button fa fa-play fa-2x"
              onClick={this.props.timerStart}
            />
            <div
              id="timer-button-pause"
              className="button fa fa-pause fa-2x"
              onClick={this.props.timerStop}
            />
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
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      currentSession: {
        name: "session",
        elapsedTime: 23
      }
    };
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.timerReset = this.timerReset.bind(this);
  }

  sessionIncrement() {
    let nextState = Object.assign({}, this.state);
    nextState.sessionLength += 1;
    this.setState(nextState);
  }

  sessionDecrement() {
    let nextState = Object.assign({}, this.state);
    nextState.sessionLength -= 1;
    this.setState(nextState);
  }

  breakIncrement() {
    let nextState = Object.assign({}, this.state);
    nextState.breakLength += 1;
    this.setState(nextState);
  }

  breakDecrement() {
    let nextState = Object.assign({}, this.state);
    nextState.breakLength -= 1;
    this.setState(nextState);
  }

  timerStart() {
    console.log("timer start");
  }

  timerStop() {
    console.log("timer stop");
  }

  timerReset() {
    console.log("timer reset");
  }

  render() {
    return (
      <div id="pomodoro-clock">
        <h2 className="application-title">Pomodoro Clock</h2>
        <TimerDisplay
          name={this.state.currentSession.name}
          elapsedTime={this.state.currentSession.elapsedTime}
        />
        <TimerControls
          sessionLength={this.state.sessionLength}
          sessionIncrement={this.sessionIncrement}
          sessionDecrement={this.sessionDecrement}
          breakLength={this.state.breakLength}
          breakIncrement={this.breakIncrement}
          breakDecrement={this.breakDecrement}
          timerStart={this.timerStart}
          timerStop={this.timerStop}
          timerReset={this.timerReset}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <PomodoroClock />,
  document.getElementById("pomodoro-clock-root")
);
