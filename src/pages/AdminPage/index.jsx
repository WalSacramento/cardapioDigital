import S from './styles.module.scss'
import NewCategoryModal from '../../components/NewCategoryModal'
import CategoriesModal from '../../components/CategoriesModal'
import NewProductModal from '../../components/NewProductModal'
import ProductsModal from '../../components/ProductsModal'

export default function AdminPage() {
  return (
    <div className={S.container}>
      <div className={S.adminPage}>
        <div className={S.title}>
          <h1>Painel de administração</h1>
        </div>

        <div className={S.categories}>
          <h1>Categorias</h1>
          <NewCategoryModal />
          <CategoriesModal />
        </div>

        <div className={S.products}>
          <h1>Produtos</h1>
          <NewProductModal />
          <ProductsModal />
        </div>
      </div>
    </div>
  )
}
