const express = require('express')
const salesRoutes = require('./routes/salesRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', salesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
