import { getStatusColor, getPriorityColor, formatDateBR } from '@/utils/taskUtils';

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
  },
  methods: {    
    getStatusColor,
    getPriorityColor,
    formatDateBR,
  }
}