/** A stream of values that can be subscribed to */
export interface Stream<T> {
  subscribers: Set<Subscriber<T>>;
}

type Subscriber<T> = (next: T) => void;
type Unsubscribe = () => void;

export const init = <T>(): Stream<T> => ({ subscribers: new Set() });

export const subscribe = <T>(
  stream: Stream<T>,
  subscriber: Subscriber<T>,
): Unsubscribe => {
  stream.subscribers.add(subscriber);
  return () => {
    stream.subscribers.delete(subscriber);
  };
};

export const publish = <T>(stream: Stream<T>, next: T): void => {
  stream.subscribers.forEach((subscriber) => subscriber(next));
};
