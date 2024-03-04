import { Link, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import S from './styles.module.scss'
import { products } from '../../data/products'

export default function CategoryPage() {
  const { categoryId } = useParams()

  // Encontre a categoria correta
  const category = products.find(product => product.category === categoryId)

  // Acesse os produtos da categoria
  const filteredProducts = category ? category.products : []

  return (
    <div className={S.container}>
      <Header />
      <h1 className={S.categoryTitle}>{categoryId}</h1>
      {filteredProducts.map((product, index) => {
        const productClassName =
          index % 2 === 0 ? S.productOrange : S.productYellow

        return (
          <Link
            key={product.id}
            to={`/category/${categoryId}/${product.id}`}
            className={productClassName}
          >
            <img
              src={product.image}
              alt={product.name}
              className={S.productImg}
            />
            <div className={S.productInfo}>
              <h2 className={S.productName}>{product.name}</h2>
              <p className={S.productIngredients}>{product.ingredients}</p>
            </div>
            <p className={S.productPrice}>{product.price}</p>
          </Link>
        )
      })}
    </div>
  )
}
