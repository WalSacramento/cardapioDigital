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

export default function CategoriesModal() {
  const [visible, setVisible] = useState(false)
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    api
      .get('/category')
      .then(response => {
        console.log(response.data)
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const confirmDelete = category => {
    setSelectedCategory(category)
    setDeleteDialogVisible(true)
  }

  const onAccept = () => {
    api.delete(`/category/${selectedCategory.id}`).then(response => {
      fetchCategories()

      Toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Categoria "${selectedCategory.name}" deletada com sucesso!`
      })
    })

    setDeleteDialogVisible(false)
  }

  const onReject = () => {
    console.log('reject', selectedCategory)
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
      <Button label="Gerenciar categorias" onClick={() => setVisible(true)} />

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
        <DataTable value={categories}>
          <Column field="name" header="Name" />
          <Column
            body={actionTemplate}
            style={{ textAlign: 'center', width: '8em' }}
          />
        </DataTable>
      </Dialog>

      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message={`Você tem certeza que quer deletar a categoria "${selectedCategory?.name}"?`}
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
