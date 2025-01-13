import {serve} from 'bun'

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/'){
            return new Response('Hello World\n', {status: 200});
        }
        else if(url.pathname === '/jai'){
            return new Response('Hello Jai\n', {status: 200});
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})