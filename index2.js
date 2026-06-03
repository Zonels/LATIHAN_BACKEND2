var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    switch(req.url){
        case '/':
            res.write('<h1>Halaman Home</h1><p>Selamat datang di website</p>');
            break;

        case '/about':
            res.write('<h1>Halaman About</h1><p>Ini adalah halaman tentang kami</p>');
            break;

        case '/contact':
            res.write('<h1>Halaman Contact</h1><p>Hubungi kami di email@email.com</p>');
            break;

        case '/produk':
            res.write('<h1>Halaman Produk</h1><p>Ini adalah daftar produk kami</p>');
            break;

        default:
            res.write('<h1>404</h1><p>Halaman tidak ditemukan</p>');
    }

    res.end();
}).listen(3000);
console.log("Server running di http://localhost:8000");
