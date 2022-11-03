const express = require('express');
require('dotenv').config();
const{dbConnection} = require('./database/config');

const app = express();

dbConnection();

//app.use(express.static('Public'));

app.use(express.json());

app.use('/api/usuario',require('./Routes/usuario'))
app.use('/api/rol',require('./Routes/rol'))
app.use('/api/pais',require('./Routes/pais'))
app.use('/api/resultado',require('./Routes/resultadoExamen'))
app.use('/api/tipoExamen',require('./Routes/tipoExamen'))
app.use('/api/tipoRecomendacion',require('./Routes/tipoRecomendacion'))
app.use('/api/recomendacion',require('./Routes/recomendacion'))
app.use('/api/riesgo',require('./Routes/riesgo'))
app.use('/api/parametro',require('./Routes/parametro'))
app.use('/api/tipoParametro',require('./Routes/tipoParametro'))

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

module.exports = app
