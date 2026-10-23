# Mastermind in Scratch

## Running the app on your machine

Run one of the following commands, then open http://localhost:8000/ in your browser.

<table>
<tr><th>Runtime</th><th>Command</th></tr>
<tr><td>Node.js</td><td>

```sh
npx http-server src -p 8000
```

</td></tr>
<tr><td>Python</td><td>

```sh
python -m http.server 8000 -d src
```

</td></tr>
<tr><td>.NET 10</td><td>

```sh
dnx dotnet-serve -d src -p 8000
```

</td></tr>
<tr><td>Java</td><td>

```sh
jwebserver -p 8000 -d src
```

</td></tr>
<tr><td>Docker</td><td>

```sh
docker run --rm -p 8000:80 -v ./src:/usr/share/nginx/html:ro nginx
```

</td></tr>
<tr><td>PHP</td><td>

```sh
php -S localhost:8000 -t src
```

</td></tr>
</table>
