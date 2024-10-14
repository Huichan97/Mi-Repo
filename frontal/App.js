import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/home";
import Configuraciones from "./pages/configuracion/configuraciones";
import Accesibilidad from "./pages/configuracion/opciones/accecibilidad";
import AdministrarCuenta from "./pages/configuracion/opciones/administrarCuenta";
import Idiomas from "./pages/configuracion/opciones/idiomas";
import Seguridad from "./pages/configuracion/opciones/seguridad";
import Temas from "./pages/configuracion/opciones/temas";
import Testigos from "./pages/testigos/testigos";
import Beneficiarios from "./pages/configuracion/beneficiarios/beneficiarios";
import Historial from "./pages/historial/historial";
import DeleteConfirmation from "./pages/configuracion/opciones/seguridad/confirmacion";
import PrivacidadDatos from "./pages/configuracion/opciones/seguridad/privacidadDatos";
import BloqueoAuto from "./pages/configuracion/opciones/seguridad/bloqueoAuto";
import Bloqueo from "./pages/configuracion/opciones/seguridad/bloqueo";
import Verificacion from "./pages/configuracion/opciones/seguridad/verificacion";
import AlertaSeg from "./pages/configuracion/opciones/seguridad/alertaSeg";
import AdminTestigos from "./pages/testigos/opciones/adminTestigos";
import Login from "./pages/login/login";
import AgregarTestigo from "./pages/testigos/opciones/crudTestigo/agregarTestigo";
import ModificarTestigo from "./pages/testigos/opciones/crudTestigo/modificarTestigo";
import EliminarTestigo from "./pages/testigos/opciones/crudTestigo/eliminarTestigo";
import Signup from "./pages/login/signup";
import Perfil from "./pages/login/profile";
import Desbloqueo from "./pages/configuracion/opciones/seguridad/desbloqueo";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Home" >
      <Stack.Screen name="Home" component={Home}/>

      {/* configuracion */}
      <Stack.Screen name="Configuraciones" component={Configuraciones}/>
      <Stack.Screen name="Accesibilidad" component={Accesibilidad}/>
      <Stack.Screen name="AdministrarCuenta" component={AdministrarCuenta}/>
      <Stack.Screen name="Idiomas" component={Idiomas}/>

      {/* seguridad y tal */}
      <Stack.Screen name="Seguridad" component={Seguridad}/>
      <Stack.Screen name="Confirmacion" component={DeleteConfirmation}/>
      <Stack.Screen name="PrivacidadDatos" component={PrivacidadDatos}/>
      <Stack.Screen name="Bloqueo" component={Bloqueo}/>
      <Stack.Screen name="BloqueoAuto" component={BloqueoAuto}/>
      <Stack.Screen name="Verificacion" component={Verificacion}/>
      <Stack.Screen name="AlertaSeg" component={AlertaSeg}/>
      <Stack.Screen name="Desbloqueo" component={Desbloqueo}/>

      {/* Iniciar sesion */}
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="Perfil" component={Perfil}/>


      <Stack.Screen name="Temas" component={Temas}/>

      {/* testigos */}
      <Stack.Screen name="Testigos" component={Testigos}/>
      <Stack.Screen name="AdminTestigos" component={AdminTestigos}/>
      <Stack.Screen name="AgregarTestigo" component={AgregarTestigo}/>
      <Stack.Screen name="ModificarTestigo" component={ModificarTestigo}/>
      <Stack.Screen name="EliminarTestigo" component={EliminarTestigo}/>

      {/* beneficiarios */}
      <Stack.Screen name="Beneficiarios" component={Beneficiarios}/>

      {/* historial */}
      <Stack.Screen name="Historial" component={Historial}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}