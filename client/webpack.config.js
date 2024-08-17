const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.jsx",

  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // to import index.html file inside index.js
    }),
  ],
  
  devServer: {
    port: 3000, // you can change the port
    historyApiFallback: true, // ensures all routes fallback to index.html
    proxy: [
      {
        context: ['/api'], 
        target: 'http://localhost:5000',
        changeOrigin: true, // Ensure the origin is changed if needed
        //pathRewrite: { '^/api': '' }, // If your backend doesn't expect the /api prefix
      }
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
                '@babel/preset-react',
              ],
            },
            
          },
          
      },

      
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
