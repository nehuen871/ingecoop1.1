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
CREATE USER 'ingecoop'@'localhost' IDENTIFIED BY 'ingecoop';
GRANT ALL PRIVILEGES ON * . * TO 'ingecoop'@'localhost';
FLUSH PRIVILEGES;
  
source /opt/ingecoop/db/procedureProyecto.sql
source /opt/ingecoop/db/procedureDatosControl.sql
source /opt/ingecoop/db/procedureCotizacion.sql
source /opt/ingecoop/db/procedureControl.sql
source /opt/ingecoop/db/procedureCliente.sql
source /opt/ingecoop/db/procedureCertificacion.sql
source /opt/ingecoop/db/procedureList_Docs.sql
source /opt/ingecoop/db/procedureDatosCotizacion.sql
source /opt/ingecoop/db/procedureRemitos.sql
source /opt/ingecoop/db/procedureRemitosDatos.sql
source /opt/ingecoop/db/procedureRecotizacion.sql
source /opt/ingecoop/db/proceduraDatosCertificacion.sql
source /opt/ingecoop/db/proceduraUpdateControl.sql
source /opt/ingecoop/db/procedureCertificacionAutomatica.sql
 * 
 */