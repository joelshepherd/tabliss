import { OidcClient } from 'oidc-client';

type Settings = {
  authority: string;
  client_id: string;
  scope?: string;
};

export async function getAccessToken(settings: Settings, interactive = false) {
  const client = new OidcClient(settings);

  const execute =
    process.env.BUILD_TARGET === 'web' ? executeWeb : executeExtension;

  const request = await client.createSigninRequest();
  const responseUrl = await execute(request.url, interactive);
  const response = await client.processSigninResponse(responseUrl);

  return {
    accessToken: response.access_token,
    expiresAt: Date.now() + (response.expires_in || 3600) * 1000,
  };
}

function executeExtension(url: string, interactive: boolean) {
  return browser.identity.launchWebAuthFlow({ url, interactive });
}

function executeWeb(url: string, interactive: boolean) {
  return (interactive ? executeWebInteractive : executeWebNoninteractive)(url);
}

function executeWebInteractive(url: string) {
  return new Promise<string>((resolve, reject) => {
    const popup = window.open(
      url,
      '_blank',
      'location=no,toolbar=no,width=500,height=500;',
    );

    if (!popup) {
      return reject(new Error('Unable to open authentication popup'));
    }

    const listener = (event: MessageEvent) => {
      const isOurMessage =
        event.source === popup && event.data.type === 'OAUTH_CALLBACK';

      if (isOurMessage) {
        resolve(event.data.url);
        window.removeEventListener('message', listener);
        popup.close();
      }
    };

    window.addEventListener('message', listener);
  });
}

function executeWebNoninteractive(url: string) {
  return new Promise<string>((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.style.height = '0px';
    iframe.style.width = '0px';
    iframe.src = url;

    document.body.appendChild(iframe);

    const listener = (event: MessageEvent) => {
      const isOurMessage =
        event.source === iframe.contentWindow &&
        event.data.type === 'OAUTH_CALLBACK';

      if (isOurMessage) {
        resolve(event.data.url);
        window.removeEventListener('message', listener);
        document.body.removeChild(iframe);
      }
    };

    window.addEventListener('message', listener);
  });
}
