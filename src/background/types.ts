import { Runtime } from "webextension-polyfill";

export interface BackgroundService {
  // Initialize service, attach any timers/listeners
  init(): Promise<void> | void;

  // Return true if the message was handled, optionally returning a value
  onMessage(message: any, sender: Runtime.MessageSender): Promise<any | undefined> | any | undefined;
}