import FaceExpression from './features/expression/components/FaceExpression';
import './features/shared/styles/global.scss';

import { RouterProvider } from 'react-router';
import { router } from './features/app.routes';
import { AuthProvider } from './features/auth/auth.context';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  )
}

export default App
