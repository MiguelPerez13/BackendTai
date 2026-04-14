const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const alumnosRoutes = require('./routes/alumnos.routes');
const maestrosRoutes = require('./routes/maestros.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/alumnos',alumnosRoutes);
app.use('/maestros',maestrosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`); 
});