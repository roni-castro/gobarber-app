interface EventListener {
  [key: string]: EventFn[];
}

type EventFn = () => void;

export default class EventPublisher {
  static instance: EventPublisher;

  listeners: EventListener = {};

  constructor(validEvents: string[]) {
    validEvents.forEach(ve => {
      this.listeners[ve] = [];
    });
  }

  subscribe(event: string, listener: EventFn): () => void {
    if (!this.listeners[event]) throw new Error('Invalid event');
    this.listeners[event].push(listener);
    return () => {
      const index = this.listeners[event].indexOf(listener);
      this.listeners[event].splice(index, 1);
    };
  }

  publish(event: string): void {
    this.listeners[event].forEach(l => l());
  }
}
