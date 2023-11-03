const express = require('express');
const router = express.Router();
const path = require('path'); // You need to require the 'path' module
 
 
router.use(express.static(path.join(__dirname, 'C:\Users\S566471\Projects\f23wb71Veeranki\public\images' )));
 
router.get('/', (req, res) => {
  const image_names = [
    'cat.png',
    'eagle.jpg',
    'lion.jpg',
    'parrot.jpg',
    'turtle.jpg'
  ];
 
  const image_namesges = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * image_names.length);
    const image_namesmage = image_names[randomIndex];
    image_names.push(image_names);
  }
 
  res.render('choose', { title: 'Choose', images: image_names });
});
 
module.exports = router;