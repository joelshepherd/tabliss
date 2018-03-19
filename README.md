# Tabliss

A pluggable New Tab web extension written in TypeScript, React and Redux.

[https://tabliss.io](https://tabliss.io)

## Usage

Install dependencies with `npm install` before running the following scripts.

- `npm start` Start webpack dev server for local development at `http://localhost:8080`
- `npm run build` Production build for web
- `npm run build:chrome` Production build for Chrome web extension
- `npm run build:firefox` Production build for Firefox web extension
- `npm run translations` Manage translation files

To develop with external services you will additionally need to signup for your own API keys
and enter them into your `.env` file. Get started by copying the example provided `cp .env.example .env`.
