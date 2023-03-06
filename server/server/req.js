const urlModule = require('url');

module.exports = async (req) => {
    const { method, url } = req;
    const _parseUrl = urlModule.parse(url, true);

    // get data request
    const dataReq = async () => {
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            
            const data = Buffer.concat(buffers).toString();
            return JSON.parse(data);
            
        } catch (error) { }
    }

    // parse token bearer
    let token;
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){
        token = authorization.slice(7);
    }

    return {
        method: method,
        path: _parseUrl.pathname,
        query: _parseUrl.query,
        token: token,
        data: await dataReq()
    }
}