function Editor() {
  return <h1 > Editor < /h1>;
}

function Preview() {
  return <h1 > Preview < /h1>;
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div > < Editor / > < Preview / > < /div>;
  }
}

ReactDOM.render( < MarkdownPreviewer / > , document.querySelector('#markdown_previewer'));