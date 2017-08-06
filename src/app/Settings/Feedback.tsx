import * as React from 'react';

interface State {
  body: string;
}

class Feedback extends React.PureComponent<{}, State> {
  state: State = {
    body: '',
  };

  send() {
    const request = new Request(
      'https://formspree.io/joel@swivid.ink',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...this.state }),
      }
    );

    fetch(request)
      .then(res => {
        if (res.ok) {
          alert('Thank you for your feedback!');
          this.setState({ body: '' });
        } else {
          alert('Unable to send your feedback :( Please try again soon.');
        }
      });
  }

  render() {
    return (
      <div>
        <h3>Feedback</h3>
        <label>
          <textarea
            rows={3}
            placeholder="Give feedback or suggestions"
            value={this.state.body}
            onChange={event => this.setState({ body: event.target.value })}
          />
        </label>
        <button onClick={() => this.send()}>Send</button>
      </div>
    );
  }
}

export default Feedback;
