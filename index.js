const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());


app.get('/githubSSO', (req, res) => {
  
    fetch('http://192.168.1.25:8080/api/github/auth')
    .then(response => {
      if (!response.ok) {
        res.send('Error!');

      } else {
        res.send('I win!');

      }
    })
    .catch(error => {
      console.log("error");
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});