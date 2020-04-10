import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Input, Button } from 'reactstrap';
import ToggleCard from '../shared/bootstrap/ToggleCard';

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
      <>
        <h2>
          <FormattedMessage
            id="other"
            defaultMessage="Other"
            description="Other title"
          />
        </h2>

        <ToggleCard title="Send feedback or suggestions">
          <>
            <Input
              type="email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
              placeholder="Your email (optional)"
            />

            <Input
              type="textarea"
              value={this.state.body}
              rows={3}
              onChange={event => this.setState({ body: event.target.value })}
              placeholder="Your feedback or suggestion"
            />

            <Button
              color="primary"
              disabled={this.state.pending}
              onClick={this.send}
            >
              Send
            </Button>
          </>
        </ToggleCard>
      </>
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
