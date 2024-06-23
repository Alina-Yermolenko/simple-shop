import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header/Header';
import { Login } from './components/Login/Login';
import { BreadCrumbs } from './components/layout/BreadCrumbs/BreadCrumbs';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Footer } from './components/layout/Footer/Footer';
import { Home } from './components/Home/Home';
import { Products } from './components/Products/Products';

function App() {
  return (
    <>
      <Header />
      <main >
        <div className="content">
          <BreadCrumbs />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/products' >
              <Route index element={<ProtectedRoute><Products/></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
