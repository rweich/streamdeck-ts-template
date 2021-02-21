import { Streamdeck } from '@rweich/streamdeck-ts';

const pi = new Streamdeck().propertyinspector();

// your code here..

// this makes sure the streamdeck finds our init function (do not remove!)
export default pi.createStreamdeckConnector();
