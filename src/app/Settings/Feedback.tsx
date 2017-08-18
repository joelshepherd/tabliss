import * as React from 'react';

interface State {
  body: string;
  pending: boolean;
}

class Feedback extends React.PureComponent<{}, State> {
  state: State = {
    body: '',
    pending: false,
  };

  send() {
    // Form data
    const body = new FormData();
    body.append('body', '(Start) ' + this.state.body);

    const request = new Request(
      'https://api.question.cafe/api/feedback',
      {
        mode: 'no-cors',
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
        body,
      }
    );

    this.setState({ pending: true });

    fetch(request)
      .then(res => {
        const state = {
          ...this.state,
          pending: false,
        };

        if (res.ok || res.type === 'opaque') {
          alert('Thank you for your feedback!');
          state.body = '';
        } else {
          alert('Unable to send your feedback :( Please try again soon.');
        }

        this.setState(state);
      });
  }

  render() {
    return (
      <div>
        <h3>Feedback</h3>

        <label>
          <textarea
            rows={3}
            placeholder="Send your feedback, ideas or suggestions..."
            value={this.state.body}
            onChange={event => this.setState({ body: event.target.value })}
          />
        </label>

        {this.state.pending
          ? <button disabled={true}>Sending</button>
          : <button onClick={() => this.send()}>Send feedback</button>
        }
      </div>
    );
  }
}

export default Feedback;
