const app = require("express")();
const fs = require("fs");

app.use(require("cors")());

app.get("/images", (req, res) => {
  const path = req.header("path");
  fs.readdir(path, function(err, files){
    files = files.map(function (fileName) {
      return {
        name: fileName,
        time: fs.statSync(path + '/' + fileName).mtime.getTime()
      };
    })
    .sort(function (a, b) {
      return b.time - a.time; })
    .map(function (v) {
      return v.name; });

    res.send(files)  
  });
})

app.listen(9000, () => console.log("Server started at port 9000"));