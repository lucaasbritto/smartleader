export function formatDateBR(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}


export function getStatusColor(task) {
    switch (task.status) {
        case 'pendente':
            return 'grey-6';
        case 'em andamento':
            return 'blue-6';
        case 'concluída':
            return 'green-6';
        default:
            return 'gray';
    }
}

export function getPriorityColor(task) {
    switch (task.priority) {
        case 'baixa':
            return 'blue-4';
        case 'média':
            return 'amber-6';
        case 'alta':
            return 'red-5';
        default:
            return 'gray';
    }
}