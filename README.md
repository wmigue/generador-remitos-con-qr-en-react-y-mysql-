# REMITATHOR (generador de remitos escrito en React (frontend) y PHP (backend))

## Uso
generación e impresión de remitos para uso interno de una empresa.

## PARA USAR BOOTSTRAP
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

## Anotaciones
* en el archivo .env o en .env.test tenemos las rutas http del backend correspondiente.
* reiniciar servidor cuando se cambia algo en archivo .env
* para que se procese y devuelva json con las ñ y otros simbolos agregar: $mysqli->set_charset("utf8"); luego de hacer instancia de mysql.
* importante copiar el .htaccess que esta en esta carpeta /src para que funcione el build en produccion.

## dependences
gsap (animaciones)
react-qr-code (generador qr)

### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000]

