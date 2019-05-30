import * as React from 'react';

interface State {
  open: boolean;
}

class Homepage extends React.PureComponent<{}, State> {
  state: State = { open: false };

  render() {
    return (
      <div>
        {!this.state.open && (
          <p>
            <a onClick={this.handleToggle}>Open Tabliss when Firefox starts</a>
          </p>
        )}

        {this.state.open && (
          <p>
            Tabliss no longer controls your homepage. If you would like Tabliss
            to open when you start Firefox, set your homepage to:
            <input type="text" value={window.location.href} readOnly={true} />
          </p>
        )}
      </div>
    );
  }

  handleToggle = () => this.setState({ open: !this.state.open });
}

export default Homepage;
