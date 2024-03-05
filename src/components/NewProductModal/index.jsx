import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { api } from '../../services/api'
import { Dropdown } from 'primereact/dropdown'

export default function NewProductModal() {
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productIngredients, setProductIngredients] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productImage, setProductImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const toast = useRef(null)

  useEffect(() => {
    fetchCategories()
  }, [visible])

  const fetchCategories = () => {
    api
      .get('/category')
      .then(response => {
        const formattedCategories = response.data.map(category => ({
          label: category.name,
          value: category.id
        }));
        setCategories(formattedCategories);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    api.post('/product', {
      name: productName,
      description: productDescription,
      ingredients: productIngredients,
      price: parseFloat(productPrice),
      image: productImage,
      categoryId: categoryId
    }).then(response => {
      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto cadastrado com sucesso!'
      })
    }).catch(error => {
      console.log(error)
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: error.response.data.error
      })
    })

    setVisible(false)
  }

  return (
    <div>
      <Button label="Novo produto" onClick={() => setVisible(true)} />

      <Dialog
        header="Cadastrar Novo Produto"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="categoryName">Nome do Produto</label>
            <InputText
              id="productName"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="productDescription">Descrição do Produto</label>
            <InputText
              id="productDescription"
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="productIngredients">Ingredientes do Produto</label>
            <InputText
              id="productIngredients"
              value={productIngredients}
              onChange={e => setProductIngredients(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="productPrice">Preço do Produto</label>
            <InputText
              id="productPrice"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="productImage">Imagem do Produto</label>
            <InputText
              id="productImage"
              value={productImage}
              onChange={e => setProductImage(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="categoryId">Selecione a categoria</label>
            <Dropdown value={categoryId} options={categories} onChange={(e) => setCategoryId(e.value)} placeholder="Selecione a categoria" />
          </div>
        </div>

        <div className="p-dialog-footer">
          <Button
            label="Cancelar"
            onClick={() => setVisible(false)}
            className="p-button-text"
          />
          <Button label="Salvar" onClick={handleSubmit} />
        </div>
      </Dialog>

      <Toast ref={toast} />
    </div>
  )
}
