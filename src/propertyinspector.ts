import { IncomingEvents, Streamdeck } from '@rweich/streamdeck-ts';

const pi = new Streamdeck().propertyinspector();

// your code here..
pi.on(IncomingEvents.OnWebsocketOpen, (event) => {
  console.log('got websocket-open-event!', event);
  // eg. register input event listeners ...
});

export default pi;
