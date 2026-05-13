function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0);
}

function formatDate(date) {
    return new Date(date).toLocaleString('pt-BR');
}

function getStatusLabel(status) {
    const map = {
        novo: 'Novo',
        atendimento: 'Atendimento',
        proposta: 'Proposta',
        fechado: 'Fechado',
        perdido: 'Perdido'
    };

    return map[status] || status;
}

function getPriorityLabel(priority) {
    const map = {
        quente: 'Quente',
        morno: 'Morno',
        frio: 'Frio'
    };

    return map[priority] || priority;
}