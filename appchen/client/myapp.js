import {initializeApp} from "/appchen/client/app.js"
import * as io from "/appchen/client/io.js";

const app = initializeApp([
    {title: 'The Weblet 1', src: '/appchen/client/weblet1.js'},
    {title: 'Live Trades', src: '/appchen/client/live-trades.js'},
    {title: 'The Weblet 3', src: '/appchen/client/weblets/weblet3.js'},
    {title: 'Message Discovery', src: '/appchen/client/message-discovery.js'}]);

app.props['start'] = '2020-01-01';
app.props['end'] = '2021-01-01';

const statusElement = document.getElementById('status');
const stream = io.stream();

stream.subscribe({
        'zen': (data) => {
            statusElement.textContent = data['lesson'];
        }
    }
);

stream.setErrorListener((event) => {
    const eventSource = event.target;
    statusElement.textContent = io.readyStateLabels[eventSource.readyState] + ' ' + eventSource.url;
});

stream.setOpenListener((event) => {
    const eventSource = event.target;
    statusElement.textContent = io.readyStateLabels[eventSource.readyState] + ' ' + eventSource.url;
});

app.activateWebletFromHash();
