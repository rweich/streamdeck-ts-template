import { IncomingPluginEvents, SetTitleEvent, Streamdeck } from '@rweich/streamdeck-ts';

const plugin = new Streamdeck().plugin();

// your code here..
plugin.on(IncomingPluginEvents.WillAppear, (event) => {
  plugin.sendEvent(new SetTitleEvent('test', event.context));
});

// this makes sure the streamdeck finds our init function (do not remove!)
export default plugin.createStreamdeckConnector();
