import { Link, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import S from './styles.module.scss'
import { products } from '../../data/products'
import { useState } from 'react'

export default function ProductPage() {
  useState(() => {
    console.log('productId')
  }, [])

  const { categoryId, productId } = useParams()

  const category = products.find(product => product.category === categoryId)

  const product = category
    ? category.products.find(product => product.id === Number(productId))
    : null

  if (!product) {
    ;<Header />
    return <div>Produto não encontrado</div>
  }

  return (
    <div className={S.container}>
      <Header />
      <div className={S.product}>
        <img src={product.image} alt={product.name} className={S.productImg} />
        <div className={S.productInfo}>
          <h1 className={S.productName}>{product.name}</h1>
          <p className={S.productIngredients}>{product.ingredients}</p>
          <p className={S.productPrice}>R$ {product.price}</p>
        </div>
      </div>
      <div className={S.similarProducts}>
        <h2 className={S.similarProductsTitle}>Você também pode gostar de:</h2>

        {category.products.map(
          similarProduct =>
            similarProduct.id !== product.id && (
              <Link
                key={similarProduct.id}
                to={`/category/${categoryId}/${similarProduct.id}`}
                className={S.similarProduct}
              >
                <img
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  className={S.similarProductImg}
                />
                <h2 className={S.similarProductName}>{similarProduct.name}</h2>
                <p className={S.similarProductPrice}>
                  R$ {similarProduct.price}
                </p>
              </Link>
            )
        )}
      </div>
    </div>
  )
}
