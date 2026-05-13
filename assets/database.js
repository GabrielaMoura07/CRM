const STORAGE_KEY = 'flowcrm_leads';

function getLeads() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveLeads(leads) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function createLead(data) {
    const leads = getLeads();

    const lead = {
        id: Date.now(),
        nome: data.nome || '',
        empresa: data.empresa || '',
        telefone: data.telefone || '',
        email: data.email || '',
        origem: data.origem || 'Site',
        prioridade: data.prioridade || 'morno',
        status: 'novo',
        valor: Number(data.valor || 0),
        proximaAcao: data.proximaAcao || '',
        observacoes: data.observacoes || '',
        emails: [],
        tarefas: [],
        propostas: [],
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
        historico: [
            {
                data: new Date().toISOString(),
                descricao: 'Lead criado no sistema'
            }
        ]
    };

    leads.push(lead);
    saveLeads(leads);

    return lead;
}

function getLeadById(id) {
    return getLeads().find(lead => String(lead.id) === String(id));
}

function updateLead(id, updatedData) {
    const leads = getLeads();

    const updatedLeads = leads.map(lead => {
        if (String(lead.id) === String(id)) {
            return {
                ...lead,
                ...updatedData,
                valor: Number(updatedData.valor || lead.valor || 0),
                atualizadoEm: new Date().toISOString()
            };
        }

        return lead;
    });

    saveLeads(updatedLeads);
}

function updateLeadStatus(id, newStatus) {
    const statusMap = {
        novo: 'Pesquisa',
        atendimento: 'Contato',
        proposta: 'Prospecção',
        fechado: 'Convertido',
        perdido: 'Perdido'
    };

    const leads = getLeads();

    const updatedLeads = leads.map(lead => {
        if (String(lead.id) === String(id)) {
            return {
                ...lead,
                status: newStatus,
                atualizadoEm: new Date().toISOString(),
                historico: [
                    ...(lead.historico || []),
                    {
                        data: new Date().toISOString(),
                        descricao: `Etapa alterada para ${statusMap[newStatus]}`
                    }
                ]
            };
        }

        return lead;
    });

    saveLeads(updatedLeads);
}

function deleteLead(id) {
    const leads = getLeads().filter(lead => String(lead.id) !== String(id));
    saveLeads(leads);
}

function addInteraction(id, descricao) {
    const leads = getLeads();

    const updatedLeads = leads.map(lead => {
        if (String(lead.id) === String(id)) {
            return {
                ...lead,
                atualizadoEm: new Date().toISOString(),
                historico: [
                    ...(lead.historico || []),
                    {
                        data: new Date().toISOString(),
                        descricao
                    }
                ]
            };
        }

        return lead;
    });

    saveLeads(updatedLeads);
}

function addLeadItem(id, field, item) {
    const leads = getLeads();

    const updatedLeads = leads.map(lead => {
        if (String(lead.id) === String(id)) {
            return {
                ...lead,
                [field]: [
                    ...(lead[field] || []),
                    item
                ],
                atualizadoEm: new Date().toISOString()
            };
        }

        return lead;
    });

    saveLeads(updatedLeads);
}