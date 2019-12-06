class TimerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="timer-display">42</div>;
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
        <div className="button fa fa-arrow-up fa-2x" />
        <div className="display">42</div>
        <div className="button fa fa-arrow-down fa-2x" />
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
          <TimerLengthControl />
          <TimerLengthControl />
        </div>
        <div id="timer-buttons-container">
          <div id="timer-button-play" className="button fa fa-play fa-2x" />
          <div id="timer-button-pause" className="button fa fa-pause fa-2x" />
          <div id="timer-button-reset" className="button fa fa-refresh fa-2x" />
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
