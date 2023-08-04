<div align="center"><img height="175" src="src/views/shared/logo.svg"/></div>

<h1 align="center">Welcome to Tab Nine</h1>

<p align="center">A modern and highly customisable New Tab page for Firefox and Chrome.</p>

## Index

1. [What is Tab Nine?](#what-is-tab-nine)
2. [Why 'Tab Nine'?](#why-tab-nine)
3. [Download](#download)
4. [Usage](#usage)
5. [Translations](#translations)
6. [Improvements over Tabliss](#improvements-over-tabliss)
7. [Attributions and acknowledgments](#attributions-and-acknowledgments)

## What is Tab Nine?

Tab Nine is a fork and spiritual successor to [Tabliss](https://tabliss.io/). The developer has not given the project any attention over the last year (as of writing this, the last update on browser plugin stores was April 2022), issues have been pilling up, dependencies are out of date, and generally Tabliss is falling victim to bit rot. I really like Tabliss, it was my favourite browser, but a year without even maintenance updates is a problem

Tab Nine aims to be a modern, highly customisable New Tab extension. You should be able to change whatever you want, and anything you can't change in settings you can change with custom CSS.

## Why 'Tab Nine'?

Much like the project as a whole, the name 'Tab Nine' keeps with the sprit of the original project's name.

Tabliss is a combination of two words: 'tab' and 'bliss'. In a similar way, Tab Nine is a combination of 'Tab' and 'cloud nine'. What is 'cloud nine'? Well, it's actually another way of saying 'bliss' - rather the saying "I'm on cloud nine" or simply "on cloud nine" is another way of saying 'blissful'. [According to The Times](https://www.thetimes.co.uk/article/weather-eye-7ftq5tvd2) <sub><sup>(Pay walled, but relevant info is visible)</sup></sub> the saying comes from an old classification system for clouds - the cumulonimbus was classified as Cloud 9.

## Download

<a href="https://chrome.google.com/webstore/detail/nncfaanaclanikcbpijbjmlonplbmcjm/"><img height="64" src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png"></a> <a href="https://addons.mozilla.org/en-GB/firefox/addon/tab-nine/"><img height="64" src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg"></a>

(Currently pending review)

## Usage

Install dependencies with `npm install` before running the following scripts.

- `npm run dev[:target]` Local development server
- `npm run build[:target]` Production build
- `npm run translations` Manage translation files

To develop with external services you will additionally need to signup for your own API keys
and enter them into your `.env` file. Get started by copying the example provided `cp .env.example .env`.

## Translations

Checkout the guide to [adding translations](TRANSLATING.md).

## Improvements over Tabliss

### Dark mode

The settings dashboard has a dark mode!

### Choose an accent color

You can choose an accent colour to change the colour of the buttons!

## Attributions and acknowledgments
A huge thank you for all the hard work Joel Shepard did on Tabliss, the project which this is forked from. He created something that I really enjoyed, and I want to continue the hard work he has put into it.

Additionally, thank you to everyone who has worked on the upstream and this project:

<a href="https://github.com/the-wright-jamie/tab-nine/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=the-wright-jamie/tab-nine&columns=16&max=128" />
</a>

Also, thank you to all the dependencies. Without the hard work that is freely given so that projects like this can exist, the internet would be a much different place. It is amazing to me that everyone can benefit from the talent that these engineers have and I will be forever grateful.

Finally, thank you - yes you, the reader. And if you are a user, thank you! Your time and attention makes all this effort worthwhile.
