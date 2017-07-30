import * as React from 'react';

interface State {
  body: string;
}

class Feedback extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      body: '',
    };
  }

  send() {
    fetch(`https://formspree.io/joel@swivid.ink`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...this.state }),
    })
      .then(res => {
        if (res.ok) {
          alert('Thank you for your feedback!');
        } else {
          alert('Unable to send your feedback :(');
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
