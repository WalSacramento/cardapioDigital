import React, { useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { api } from '../../services/api'

export default function NewCategoryModal() {
  const [categoryName, setCategoryName] = useState('')
  const [visible, setVisible] = useState(false)
  const toast = useRef(null)

  const handleSubmit = () => {
    api
      .post('/category', { name: categoryName })
      .then(response => {
        toast.current.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria cadastrada com sucesso!'
        })
      })
      .catch(error => {
        console.log(error)
        toast.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: error.response.data.error
        })
      })

    setCategoryName('')

    setVisible(false)
  }

  return (
    <div>
      <Button label="Nova Categoria" onClick={() => setVisible(true)} />

      <Dialog
        header="Cadastrar Nova Categoria"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="categoryName">Nome da Categoria</label>
            <InputText
              id="categoryName"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
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
