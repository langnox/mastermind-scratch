# Mastermind in Scratch

A Mastermind game built as a Scratch project in JavaScript. It plays in the browser and downloads an `.sb3` file that can be imported in online Scratch.

## Online version

The latest version is published at https://langnox.github.io/mastermind-scratch/.

## Getting the code onto your machine

You need Git, a free program that copies projects like this one onto your computer.

Once it is installed, open a terminal and type these two commands, pressing Enter after each:

```sh
git clone https://github.com/langnox/mastermind-scratch.git
cd mastermind-scratch
```

The first command downloads the project into a new folder called `mastermind-scratch`. The second moves the terminal into that folder, which is where the commands below must be run.

## Running the app on your machine

Once code is on your machine, run one of the following commands, then open http://localhost:8000/ in your browser.

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
