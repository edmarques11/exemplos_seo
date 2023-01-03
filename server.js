const http = require("http");
const fs = require("fs");

const routesPage = {
    "/": "index",
};

function returnHtml(pathFile) {
    try {
        const html = fs.readFileSync(`./html/${pathFile}.html`, {
            encoding: "utf-8",
        });

        return html;
    } catch (err) {
        'return <h1>Deu tudo errado! :(</h1>';
    }
}

const server = http.createServer((request, response) => {
    const route = request.url;
    const pageFile = routesPage[route];

    if (!pageFile) {
        response.writeHead(404, {
            "Content-type": "text/html",
        });

        response.write("<h1>A página não existe</h1>");

        return response.end();
    }

    response.writeHead(200, {
        "Content-type": "text/html",
    });

    const strHtml = returnHtml(pageFile);

    response.write(strHtml);
    return response.end();
});

server.listen(3000, () => {
    console.log("Server is running!");
});
