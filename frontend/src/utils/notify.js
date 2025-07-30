import { Notify } from 'quasar'

export function notifySuccess(message = 'Operação realizada com sucesso!') {
  Notify.create({
    type: 'positive',
    message,
    icon: 'check_circle',
    color: 'green',
    position: 'top-right',
  })
}

export function notifyError(message = 'Ocorreu um erro.') {
  Notify.create({
    type: 'negative',
    message,
    icon: 'error',
    color: 'red',
    position: 'top-right',
  })
}