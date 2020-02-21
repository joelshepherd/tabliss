import React from 'react';

import { CollapseIcon, IconButton } from '../shared';
import { CardBody, Card, Input, Button, CardText, CardTitle } from 'reactstrap';

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
      <Card>
        <CardBody onClick={this.toggle}>
          <CardTitle>
            <h4>Send feedback or suggestions</h4>
          </CardTitle>

          {!this.state.open && (
            <CardText>
              Send us an idea or bug. You can also open an issue on Github.
            </CardText>
          )}

          {this.state.open && (
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
          )}
        </CardBody>
      </Card>
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
