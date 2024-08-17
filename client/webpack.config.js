const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",

  output: {
    path: path.join(__dirname, "/dist"), // The bundle output path
    filename: "bundle.js", // The name of the bundle
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Reference to the HTML template
    }),
  ],

  devServer: {
    port: 3000, // Port for the development server
    historyApiFallback: true, // Ensures all routes fallback to index.html
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:5000",
        changeOrigin: true, // Ensure the origin is changed if needed
        // pathRewrite: { '^/api': '' }, // Uncomment if your backend doesn't expect the /api prefix
      },
    ],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handles .js and .jsx files
        exclude: /node_modules/, // Excludes the node_modules folder
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                },
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic", // Use the new JSX runtime
                },
              ],
            ],
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/, // Handles styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // Handles images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
