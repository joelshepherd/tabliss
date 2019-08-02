import React from 'react';

import { CollapseIcon, IconButton } from '../shared';

interface State {
  body: string;
  email: string;
  open: boolean;
  pending: boolean;
}

class Feedback extends React.PureComponent<{}, State> {
  state: State = {
    body: '',
    email: '',
    open: false,
    pending: false,
  };

  render() {
    return (
      <div className="Feedback">
        {!this.state.open && (
          <p>
            <a onClick={this.toggle}>Send feedback or suggestions</a>
          </p>
        )}

        {this.state.open && (
          <div>
            <input
              type="email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
              placeholder="Your email (optional)"
            />

            <textarea
              value={this.state.body}
              rows={3}
              onChange={event => this.setState({ body: event.target.value })}
              placeholder="Your feedback or suggestion"
            />

            <div style={{ float: 'right' }}>
              <IconButton onClick={this.toggle} title="Close feedback form">
                <CollapseIcon />
              </IconButton>
            </div>
            <button
              className="button--primary"
              disabled={this.state.pending}
              onClick={this.send}
            >
              Send
            </button>
          </div>
        )}
      </div>
    );
  }

  private send = () => {
    if (this.state.pending) {
      return;
    }

    if (!this.state.body) {
      this.setState({ open: false });
      return;
    }

    this.setState({ pending: true });

    const request = new Request(`${process.env.API_ENDPOINT}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email || undefined,
        feedback: this.state.body,
      }),
    });

    fetch(request)
      .then(res => {
        if (!res.ok) {
          throw new Error('Feedback API request was not successful');
        }

        alert('Thank you for your feedback!');
        this.setState({
          body: '',
          pending: false,
        });
      })
      .catch(() => {
        alert(
          'Sorry, we were unable to send your feedback :( Please email your feedback to feedback@tabliss instead.',
        );
        this.setState({ pending: false });
      });
  };

  private toggle = () => this.setState({ open: !this.state.open });
}

export default Feedback;
