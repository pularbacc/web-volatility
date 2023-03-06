

const GET = ({ res }) => {
    res.json("Hello world");
}

module.exports = {
    "/": { GET: GET },
}

