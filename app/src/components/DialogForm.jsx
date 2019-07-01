import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type Props = {
  title: string,
  description: string,
  children: node,
  open: boolean,
  handleClose: func,
}
export default function DialogForm({
  title,
  description,
  children,
  open,
  handleClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  )
}
