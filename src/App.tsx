import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import { lazy, Suspense } from 'react';

// Components
import { ScreenSizeWarningPopup } from './hooks/DeviceCheck';
const Introduction = lazy(() => import("./ui/page/Introduction"))
const Login = lazy(() => import("./ui/page/Login"))
const Register = lazy(() => import("./ui/page/Register"))
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './ui/layout/MainLayout';

// Config
import { routeConfig } from './config/routeConfig';

setupIonicReact();

// App
const App: React.FC = () => (
  <IonApp>
    <ScreenSizeWarningPopup />
    <IonReactRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <IonRouterOutlet>
          {/* Starter */}
          <Route exact path={routeConfig.intro.root} children={<Introduction />}></Route>

          {/* Auth */}
          <Route path={routeConfig.login.root} children={<Login />}></Route>
          <Route path={routeConfig.register.root} children={<Register />}></Route>

          {/* Main */}
          <Route path="/main/*" children={<MainLayout />}></Route>
          <Redirect exact path='/main' to={routeConfig.main.map} />
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  </IonApp>
);

export default App;
