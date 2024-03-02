import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import Sandubas from './pages/Sandubas'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/sandubas" element={<Sandubas />} />
        <Route path='/category/:categoryId' element={<CategoryPage />} />
        <Route path='/category/:categoryId/:productId' element={<ProductPage />} />
        {/* <Route path="/add-question" element={<AddQuestionForm />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
