const { Component } = require("react");
const ReactDOM = require("react-dom");

// class App extends Component {
//   state = { counter: 0 };

//   increment = () =>
//     this.setState({
//       counter: this.state.counter + 1
//     });

//   render = () => (
//     <button onClick={this.increment}>{"Counter: " + this.state.counter}</button>
//   );
// }

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));
