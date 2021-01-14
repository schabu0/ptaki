import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function BirdForm({form, handleFormChange, submit}) {
  return (
    <div>
      <div>
        <TextField required={true} label="name" name={'name'} onChange={(e) => handleFormChange(e)} value={form.name}/>
      </div>
      <div>
        <TextField required={true} label="shortDescription" name={'shortDescription'} onChange={(e) => handleFormChange(e)} value={form.shortDescription}/>
      </div>
      <div>
        <TextField required={true} label="description" name={'description'} onChange={(e) => handleFormChange(e)} value={form.description}/>
      </div>
      <div>
        <TextField required={true} type={'number'} label="quantity" name={'quantity'} onChange={(e) => handleFormChange(e)} value={form.quantity}/>
      </div>
      <div>
        <TextField required={true} label="threats" name={'threats'} onChange={(e) => handleFormChange(e)} value={form.threats}/>
      </div>
      <div>
        <TextField required={true} label="localization" name={'localization'} onChange={(e) => handleFormChange(e)} value={form.localization}/>
      </div>
      <div>
        <TextField required={true} label="photo" name={'photo'} onChange={(e) => handleFormChange(e)} value={form.photo}/>
      </div>
      <div className="mt-3">
        <Button color={'primary'} variant={'contained'} onClick={submit}>
          Zapisz
        </Button>
      </div>
    </div>
  )
}
