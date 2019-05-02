import * as React from 'react';

interface Props {
  input?: string;
}

declare const browser: any; // tslint:disable-line no-any
declare const chrome: any; // tslint:disable-line no-any

class Js extends React.PureComponent<Props> {
  componentDidMount() {
    this.runScript();
  }

  componentDidUpdate() {
    this.cleanup();
    this.runScript();
  }

  componentWillUnmount() {
    this.cleanup();
  }

  render() {
    return null;
  }

  private cleanup() {
    if (process.env.BUILD_TARGET === 'web') {
      const script = document.getElementById('CustomJs');

      if (script) {
        document.head.removeChild(script);
      }
    }
  }

  private runScript() {
    if (this.props.input) {
      if (process.env.BUILD_TARGET === 'web') {
        const script = document.createElement('script');

        script.id = 'CustomJs';
        script.type = 'text/javascript';
        script.appendChild(document.createTextNode(this.props.input || ''));

        document.head.appendChild(script);
      } else if (process.env.BUILD_TARGET === 'firefox') {
        browser.tabs.executeScript({
          allFrames: false,
          code: '(function() {' + this.props.input + '})();'
        });
      } else if (process.env.BUILD_TARGET === 'chrome') {
        chrome.tabs.executeScript({
          allFrames: false,
          code: '(function() {' + this.props.input + '})();'
        });
      }
    }
  }
}

export default Js;
