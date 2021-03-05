// import * as math from './math';
// import * as string from './string';

console.log(122);   
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('service-worker registed', registration);
            }).catch((error) => {
                console.log('service-worker register error', error);
            });
    });
}

// export default {math, string}