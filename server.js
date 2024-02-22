const express = require("express"); 
const fs = require('fs');
const cors = require('cors');
//const helmet = require('helmet');


const app = express();
const PORT = 3000;

var corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
// app.use(helmet());
app.use(express.json({limit: '50mb'}));

app.post('/upload', (req, res) => {
  console.log("request");
  const { imageData } = req.body;
  console.log(imageData);

  if (!imageData) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  const base64Data = imageData.replace(/^data:image\/png;base64,/, ''); 
  console.log(base64Data);

  require('fs').writeFile('image.png', base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving image' });
    }
    res.json({ message: 'Image uploaded successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
