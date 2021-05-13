const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8000/', // em um projeto normal seria http://localhost:8000/, isso é porque como tenho criado os componentes todos no mesmo projeto 
        secure: false , // true -> https
        logLevel: 'debug',
        pathRewrite: {'^/api': ''} // isso é para que funcione o upload uma vez, que nosso endpoint está somente /upload
    }
];

module.exports =  PROXY_CONFIG;