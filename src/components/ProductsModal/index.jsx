import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { api } from '../../services/api'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'

export default function ProductsModal() {
  const [visible, setVisible] = useState(false)
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [selectedProduct, setselectedProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(categoryId)
  }, [categoryId])

  const fetchCategories = () => {
    api
      .get('/category')
      .then(response => {
        const formattedCategories = response.data.map(category => ({
          label: category.name,
          value: category.id
        }))
        setCategories(formattedCategories)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const fetchProducts = categoryId => {
    if (categoryId) {
      api
        .get(`/category/${categoryId}/products`)
        .then(response => {
          setProducts(response.data)
        })
        .catch(error => {
          Toast.current.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos'
          })
        })
    } else {
      setProducts([])
    }
  }

  const confirmDelete = product => {
    setselectedProduct(product)
    setDeleteDialogVisible(true)
  }

  const onAccept = () => {
    api.delete(`/product/${selectedProduct.id}`).then(response => {
      fetchProducts(categoryId)

      Toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Produto "${selectedProduct.name}" deletado com sucesso!`
      })
    })

    setDeleteDialogVisible(false)
  }

  const onReject = () => {
    console.log('reject', selectedProduct)
    setDeleteDialogVisible(false)
  }

  const actionTemplate = rowData => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => confirmDelete(rowData)}
      />
    )
  }

  return (
    <div>
      <Button label="Gerenciar produtos" onClick={() => setVisible(true)} />

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Categorias"
        style={{ width: '50vw' }}
        footer={<Button label="Close" onClick={() => setVisible(false)} />}
      >
        <Button
          label="Atualizar categorias"
          icon="pi pi-refresh"
          onClick={fetchCategories}
        />
        <div className="p-field">
          <label htmlFor="categoryId">Selecione a categoria</label>
          <Dropdown
            value={categoryId}
            options={categories}
            onChange={e => setCategoryId(e.value)}
            placeholder="Selecione a categoria"
          />
        </div>
        <DataTable value={products}>
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column field="ingredients" header="Ingredients" />
          <Column field="price" header="Price" />
          <Column field="image" header="Image" />
          <Column
            body={actionTemplate}
            style={{ textAlign: 'center', width: '8em' }}
          />
        </DataTable>
      </Dialog>

      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message={`Você tem certeza que quer deletar o produto "${selectedProduct?.name}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={onAccept}
        reject={onReject}
        acceptLabel="Sim"
        rejectLabel="Não"
      />
    </div>
  )
}
