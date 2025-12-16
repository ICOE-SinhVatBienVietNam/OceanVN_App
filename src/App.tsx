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
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ScreenSizeWarningPopup } from './hooks/DeviceCheck';
const Introduction = lazy(() => import("./ui/page/Introduction"))
const Login = lazy(() => import("./ui/page/Login"))
const Register = lazy(() => import("./ui/page/Register"))
import SpeciesShare from './ui/page/SpeciesShare';
import ForgetPassword from './ui/page/ForgetPassword';
import RequireReset from './ui/page/RequireReset';
// Layout
import MainLayout from './ui/layout/MainLayout';

// Hooks
import { ConfirmProvider } from './hooks/ConfirmForm';
import { AuthCheckPopupProvider } from './hooks/AuthCheck';

// Config
import { routeConfig } from './config/routeConfig';
import Auth from './hooks/Auth';

import PwaUpdatePrompt from './ui/component/PwaUpdatePrompt';

setupIonicReact();

// App
const App: React.FC = () => (
  <IonApp>
    <ConfirmProvider>
      <PwaUpdatePrompt />
      <ScreenSizeWarningPopup />
      <IonReactRouter>
        <AuthCheckPopupProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
            <IonRouterOutlet>
              {/* Starter */}
              <Route exact path={routeConfig.intro.root} children={<Introduction />}></Route>

              {/* Auth */}
              <Route path={routeConfig.login.root} children={<Login />}></Route>
              <Route path={routeConfig.register.root} children={<Register />}></Route>
              <Route path={routeConfig.requireResetPassword.root} children={<RequireReset />}></Route>
              <Route path={routeConfig.forgotPassword.root} children={<ForgetPassword />}></Route>

              {/* Main */}
              <Route path="/main/*" children={<MainLayout />}></Route>
              <Redirect exact path='/main' to={routeConfig.main.map} />

              {/* Share */}
              <Route path={routeConfig.share.species} children={<SpeciesShare />}></Route>
            </IonRouterOutlet>
          </Suspense>
        </AuthCheckPopupProvider>
      </IonReactRouter>
    </ConfirmProvider>
  </IonApp>
);

export default App;
