class TimerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="timer-display">Timer Display</div>;
  }
}

class TimerLengthControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="timer-lenght-control">Length Control</div>;
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
          <TimerLengthControl />
          <TimerLengthControl />
        </div>
        <div id="timer-buttons-container">
          <div
            id="timer-button-play"
            className="timer-button fa fa-play fa-2x"
          />
          <div
            id="timer-button-pause"
            className="timer-button fa fa-pause fa-2x"
          />
          <div
            id="timer-button-reset"
            className="timer-button fa fa-refresh fa-2x"
          />
        </div>
      </div>
    );
  }
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="pomodoro-clock">
        <h2 className="application-title">Pomodoro Clock</h2>
        <TimerDisplay />
        <TimerControls />
      </div>
    );
  }
}

ReactDOM.render(
  <PomodoroClock />,
  document.getElementById("pomodoro-clock-root")
);
