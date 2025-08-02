import { Notify } from 'quasar'

export function notifySuccess(message = 'Operação realizada com sucesso!') {
  Notify.create({
    type: 'positive',
    message,
    icon: 'check_circle',
    position: 'top-right',
  })
}

export function notifyError(message = 'Ocorreu um erro.') {
  Notify.create({
    type: 'negative',
    message,
    icon: 'error',
    position: 'top-right',
  })
}

export function notifyWarning(message = 'Atenção') {
  Notify.create({
    type: 'warning',
    message,
    icon: 'warning',
    position: 'top-right',
  })
}