<div align="center"><img height="175" src="logo.svg"/>&emsp;&emsp;&emsp;<img height="175" src="https://raw.githubusercontent.com/the-wright-jamie/the-wright-jamie/main/memes/Help-Wanted-PNG-Pic.png"/></div>

<h1 align="center">Welcome to Tab Nine</h1>

<p align="center">A modern and highly customisable New Tab page for Firefox and Chrome.</p>
<p align="center">Contributions extremely welcome</p>

<hr>

This project is still under active development, and we are always watching for Issues and PRs. However, the main maintainer is busy with other projects and isn't able to actively develop for the project. [Read more here](https://github.com/the-wright-jamie/tab-nine/discussions/69).

## Index

1. [What is Tab Nine?](#what-is-tab-nine)
2. [Why 'Tab Nine'?](#why-tab-nine)
3. [Download](#download)
4. [Usage](#usage)
5. [Attributions and acknowledgments](#attributions-and-acknowledgments)
6. [Contributing](#contributing)
   1. [Translations](#translations)
   2. [Developing](#developing)
      1. [Branching Strategy](#branching-strategy)
7. [Improvements over Tabliss](#improvements-over-tabliss)

## What is Tab Nine?

Tab Nine is a fork and spiritual successor to [Tabliss](https://github.com/joelshepherd/tabliss). The developer has not given the project any attention over the last year (as of writing this, the last update on browser plugin stores was April 2022), issues have been pilling up, dependencies are out of date, and generally Tabliss is falling victim to bit rot. I really like Tabliss, it was my favourite browser, but a year without even maintenance updates is a problem

Tab Nine aims to be a modern, highly customisable New Tab extension. You can change whatever you want, and anything you can't change in settings you are able to change with custom CSS.

## Why 'Tab Nine'?

Much like the project as a whole, the name 'Tab Nine' keeps with the sprit of the original project's name.

Tabliss is a combination of two words: 'tab' and 'bliss'. In a similar way, Tab Nine is a combination of 'Tab' and 'cloud nine'. What is 'cloud nine'? Well, it's actually another way of saying 'bliss' - rather the saying "I'm on cloud nine" or simply "on cloud nine" is another way of saying 'blissful'. The saying comes from an old classification system for clouds - the cumulonimbus was classified as Cloud 9.

## Download

<a href="https://chrome.google.com/webstore/detail/nncfaanaclanikcbpijbjmlonplbmcjm/"><img height="64" src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png"></a> <a href="https://addons.mozilla.org/en-GB/firefox/addon/tab-nine/"><img height="64" src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg"></a>

## Usage

Install dependencies with `npm install` before running the following scripts.

- `npm run dev[:target]` Local development server
- `npm run build[:target]` Production build
- `npm run translations` Manage translation files

To develop with external services you will additionally need to sign-up for your own API keys
and enter them into your `.env` file. Get started by copying the example provided `cp .env.example .env`.

Please keep in mind that the development environment is designed with Linux in mind. Instructions may not run on Windows. You also should have whatever your distribution equivalent of `dnf -y groupinstall "Development Tools"` is installed, as some `node_modules` need to be compiled before use.

## Attributions and acknowledgments

A huge thank you for all the hard work Joel Shepard did on Tabliss, the project which this is forked from. He created something that I really enjoyed, and I want to continue the hard work he has put into it.

Additionally, thank you to everyone who has worked on the upstream and this project:

<a href="https://github.com/the-wright-jamie/tab-nine/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=the-wright-jamie/tab-nine&columns=16&max=128" />
</a>

Also, thank you to all the dependencies. Without the hard work that is freely given so that projects like this can exist, the internet would be a much different place. It is amazing to me that everyone can benefit from the talent that these engineers have and I will be forever grateful.

Finally, thank you - yes you, the reader. And if you are a user, thank you! Your time and attention makes all this effort worthwhile.

### Important

Tab Nine is a **fork** of <a href="https://github.com/joelshepherd/tabliss">Tabliss</a> by <a href="https://github.com/joelshepherd/">@joelshepherd</a>, maintained by <a href="https://github.com/the-wright-jamie">@the-wright-jamie</a>. Credit for the original idea and concept for this extension, as well as a lot of the groundwork, goes to Tabliss. As a fork, Tab Nine is in a sense a 'distribution' of Tabliss, with upstream fixes and some [unique features](#improvements-over-tabliss). 

Apart from being a fork, Tab Nine is in no other way affiliated with Tabliss or @joelshepherd.

## Contributing

### Translations

Checkout the guide to [adding translations](TRANSLATING.md).

### Developing

#### Branching Strategy

##### `trunk`

`trunk` is the main, current production branch. If you want to see the current code that is live on the stores and running on your browser, this is the branch to check out. All builds are published from the GitHub Actions build, so there are no developer pushed releases that you can't see what went into it. `trunk` cannot be pushed to directly, a pull request is required to change it.

##### `stage`

`stage` is the current cutting edge. It could be considered the 'beta' branch, or I suppose "Tab Ten" - as in the next version of Tab Nine, Tab Nine + 1. This contains all the features for the next release, could be patches, could be features. This should generally be safe to play with, and install as a unpacked extension on your browser, but you will have to manually update it. If we were to create a Tab Nine Testing Edition, it would be from this branch.

_**If you are creating a PR, unless otherwise advised, you should target it to this branch.**_

For the admins: [merge stage into trunk](https://github.com/the-wright-jamie/tab-nine/compare/trunk...the-wright-jamie:tab-nine:stage)

##### `development`

`development` is where members of the Tab Nine development team are doing work. This is the 'bleeding edge' or 'alpha' version. Not nightly, as builds aren't created on push, but it does contain features that aren't ready for `stage` testing. Watch out for commits marked with a 💣 as they could be problematic.

For the admins: [merge development into stage](https://github.com/the-wright-jamie/tab-nine/compare/stage...the-wright-jamie:tab-nine:development)

#### Code Style

Currently, there is no defined code style, but please don't make a mess of your code. Use common programming methods, such as self-identifying variable and 'never nesting' and your PR should get accepted.

_**We can't do anything about upstream changes, so if you see code that breaks this 'code style', don't worry!**_

## Improvements Over Tabliss

Tabliss has been MIA for over a year. This fork contains all the upstream fixes that have been introduced since then, as well as some new features. As required by the GPL, these must be clearly defined. These new features are:

| Issue | Description                                                 |
| :---: | ----------------------------------------------------------- |
|  #16  | Dark Mode for system panels                                 |
|  #21  | Alternative Branding                                        |
|  #25  | Accent color                                                |
|       | Uses browser-default sans-serif font                        |
|       | [A wiki](https://github.com/the-wright-jamie/tab-nine/wiki) |
