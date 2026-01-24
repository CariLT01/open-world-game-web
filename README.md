# open world game web project

Side-project about creating an open-world survival game on the web! May or may not actually finish it.
It's basically Minecraft, but without cubes (using marching cubes instead).

> [!WARNING]
> **This project is in development!**
> Currently suffers from many bugs (caused by multiplayer test) and performance issues (lack of multi-threading, high memory usage).

Uses three-js, protobuf, and react.
Written in TypeScript.

# setup

1. **Install dependencies**

   Make sure you have NodeJS.
   Install all the required dependencies to build and run the project.
   ```console
   npm install
   ```
2. **Build the project**

   Build the project using the following command:
   ```console
   npm run build
   ```
3. **Run the server**

   Run the game server using the following command:

   ```console
   npm run server
   ```
4. **Run the client**

   Client build is `dist/index.html`. Open that file in a web browser.

