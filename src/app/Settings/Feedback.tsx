import * as React from 'react';
const closeIcon = require('feather-icons/dist/icons/x.svg');

interface State {
  body: string;
  open: boolean;
  pending: boolean;
}

class Feedback extends React.PureComponent<{}, State> {
  state: State = {
    body: '',
    open: false,
    pending: false,
  };

  render() {
    return (
      <div className="Feedback">
        {! this.state.open &&
          <p><a href="javascript:;" onClick={this.toggle}>Feedback or suggestions</a></p>
        }

        {this.state.open &&
          <div>
            <textarea
              value={this.state.body}
              onChange={event => this.setState({ body: event.target.value })}
              placeholder="Add your feedback or suggestion..."
            />

            <button className="button--icon" onClick={this.toggle} style={{ float: 'right' }}>
              <i dangerouslySetInnerHTML={{ __html: closeIcon }} />
            </button>
            <button className="button--primary" disabled={this.state.pending} onClick={this.send}>Send</button>
          </div>
        }
      </div>
    );
  }

  private send = () => {
    if (this.state.pending) {
      return;
    }

    this.setState({ pending: true });

    const request = new Request(`${process.env.API_ENDPOINT}/v1/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: this.state.body }),
    });

    fetch(request)
      .then(() => {
        alert('Thank you for your feedback!');
        this.setState({
          body: '',
          pending: false
        });
      })
      .catch(() => {
        alert('Sorry, we were unable to send your feedback. Please try emailing feedback@tabliss instead.');
        this.setState({ pending: false });
      });
  }

  private toggle = () => this.setState({ open: ! this.state.open });
}

export default Feedback;
