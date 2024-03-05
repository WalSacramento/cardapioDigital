import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import HomeScreen from './pages/HomeScreen'
import Sandubas from './pages/Sandubas'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/sandubas" element={<Sandubas />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route
            path="/category/:categoryId/:productId"
            element={<ProductPage />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />

          {/* <Route path="/add-question" element={<AddQuestionForm />} /> */}
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
