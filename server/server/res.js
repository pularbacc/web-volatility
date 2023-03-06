
module.exports = (res) => {
    return {
        // OPTIONS respon
        ok:()=>{
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
            });
            res.end();
        },

        // json respon
        json: (data) => {
            res.writeHead(200, {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            });
            res.end(JSON.stringify({
                status: "ok",
                data: data
            }));
        },

        // file respon
        file: (data) => {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
            });
            res.end(data);
        },

        // error respon
        error: (status, message) => {
            res.writeHead(status, {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify({
                status: "failed",
                message: message
            }))
        }
    }
}