import { Streamdeck } from '@rweich/streamdeck-ts';

const plugin = new Streamdeck().plugin();

// your code here..
plugin.on('willAppear', ({ context }) => {
  plugin.setTitle('test', context);
});

export default plugin;
