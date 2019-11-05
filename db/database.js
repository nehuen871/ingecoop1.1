const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'ingecoop',
  password: 'ingecoop',
  database: 'ingecoop',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;



/**
source /opt/ingecoop1.1/db/procedureProyecto.sql
source /opt/ingecoop1.1/db/procedureDatosControl.sql
source /opt/ingecoop1.1/db/procedureCotizacion.sql
source /opt/ingecoop1.1/db/procedureControl.sql
source /opt/ingecoop1.1/db/procedureCliente.sql
source /opt/ingecoop1.1/db/procedureCertificacion.sql
source /opt/ingecoop1.1/db/procedureList_Docs.sql
source /opt/ingecoop1.1/db/procedureDatosCotizacion.sql
 * 
 */