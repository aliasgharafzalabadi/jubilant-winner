const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());
app.post('/submitForm', (req, res) => {
  try {
    const formData = req.body;
    if (formData.name === '') {
      res.status(400).json({ success: false, message: 'Name is required' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      res.status(400).json({ success: false, message: 'Invalid email address' });
      return;
    }
    if (formData.address === '') {
      res.status(400).json({ success: false, message: 'Address is required' });
      return;
    }
    const phoneRegex = /^\d{091}$/;
    if (!phoneRegex.test(formData.phone)) {
      res.status(400).json({ success: false, message: 'Invalid phone number' });
      return;
    }
    // Write form data to CSV file
    const csvData = `${formData.name},${formData.email},${formData.address},${formData.phone}\n`;
    fs.appendFileSync('formData.csv', csvData);
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ success: false, message: 'Error processing the form' });
  }
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
