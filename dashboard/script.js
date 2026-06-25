// Configuração do Chart.js para Dark Theme
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Outfit', sans-serif";

const fileClientes = 'dados/nota_facil_clientes (3).csv';
const fileConsumo = 'dados/nota_facil_historico_consumo (2).csv';

let chartDownloads, chartPlanos, chartEstados, chartDownloadsMes;

// Cores premium para gráficos
const colors = {
    primary: 'rgba(59, 130, 246, 0.8)',
    secondary: 'rgba(16, 185, 129, 0.8)',
    tertiary: 'rgba(139, 92, 246, 0.8)',
    quaternary: 'rgba(245, 158, 11, 0.8)',
    quinary: 'rgba(236, 72, 153, 0.8)',
};

async function init() {
    try {
        await loadDataFromPath();
    } catch (e) {
        console.warn("Falha ao carregar via fetch (provavelmente CORS). Mostrando inputs de arquivo.");
        document.getElementById('file-inputs').classList.remove('hidden');
        document.getElementById('loading').innerHTML = '<p>Por favor, selecione os arquivos CSV acima para visualizar os dados.</p>';
        setupFileInputs();
    }
}

async function loadDataFromPath() {
    showLoading();
    
    const [resClientes, resConsumo] = await Promise.all([
        fetch(fileClientes),
        fetch(fileConsumo)
    ]);

    if (!resClientes.ok || !resConsumo.ok) throw new Error("Files not found or CORS blocked");

    const textClientes = await resClientes.text();
    const textConsumo = await resConsumo.text();

    processData(textClientes, textConsumo);
}

function setupFileInputs() {
    const btn = document.getElementById('reload-btn');
    btn.addEventListener('click', () => {
        const file1 = document.getElementById('clientes-file').files[0];
        const file2 = document.getElementById('consumo-file').files[0];

        if (!file1 || !file2) {
            alert("Por favor, selecione ambos os arquivos CSV.");
            return;
        }

        showLoading();

        Promise.all([readFileAsText(file1), readFileAsText(file2)]).then(([t1, t2]) => {
            processData(t1, t2);
        });
    });
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
}

function processData(csvClientes, csvConsumo) {
    Papa.parse(csvClientes, {
        header: true,
        skipEmptyLines: true,
        complete: (resClientes) => {
            Papa.parse(csvConsumo, {
                header: true,
                skipEmptyLines: true,
                complete: (resConsumo) => {
                    renderDashboard(resClientes.data, resConsumo.data);
                }
            });
        }
    });
}

function renderDashboard(clientes, consumo) {
    // 1. Processamento de KPIs
    const totalClientes = clientes.length;
    let totalDownloads = 0;
    
    // Agrupamentos
    const planosCount = {};
    const estadosCount = {};
    const clientesAtivos = clientes.filter(c => c.status && c.status.toLowerCase() === 'ativo').length;
    
    clientes.forEach(c => {
        const plano = c.plano || 'Desconhecido';
        planosCount[plano] = (planosCount[plano] || 0) + 1;
        
        const uf = c.uf || 'N/A';
        estadosCount[uf] = (estadosCount[uf] || 0) + 1;
    });

    const downloadsPorDia = {};
    const downloadsPorMes = {};
    const downloadsPorEmail = {};

    consumo.forEach(c => {
        const qtd = parseInt(c.quantidade) || 0;
        totalDownloads += qtd;
        
        const dateStr = c.createdAt ? c.createdAt.split('T')[0] : null;
        if(dateStr) {
            downloadsPorDia[dateStr] = (downloadsPorDia[dateStr] || 0) + qtd;
            const mesStr = dateStr.substring(0, 7); // Extrai YYYY-MM
            downloadsPorMes[mesStr] = (downloadsPorMes[mesStr] || 0) + qtd;
        }

        const email = c.email;
        if(email) {
            downloadsPorEmail[email] = (downloadsPorEmail[email] || 0) + qtd;
        }
    });

    // Atualizar HTML
    document.getElementById('kpi-total-clientes').innerText = totalClientes.toLocaleString('pt-BR');
    document.getElementById('kpi-total-downloads').innerText = totalDownloads.toLocaleString('pt-BR');
    document.getElementById('kpi-media-downloads').innerText = totalClientes ? (totalDownloads / totalClientes).toFixed(1) : 0;
    document.getElementById('kpi-clientes-ativos').innerText = clientesAtivos.toLocaleString('pt-BR');

    // Preparar gráficos
    renderChartDownloads(downloadsPorDia);
    renderChartDownloadsMes(downloadsPorMes);
    renderChartPlanos(planosCount);
    renderChartEstados(estadosCount);
    renderTopClientes(downloadsPorEmail, clientes);

    hideLoading();
}

function renderChartDownloads(dataObj) {
    // Ordenar datas
    const sortedDates = Object.keys(dataObj).sort();
    // Pegar apenas últimos 30 dias para não poluir
    const recentDates = sortedDates.slice(-30);
    const values = recentDates.map(d => dataObj[d]);

    const ctx = document.getElementById('chart-downloads-time').getContext('2d');
    if(chartDownloads) chartDownloads.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    chartDownloads = new Chart(ctx, {
        type: 'line',
        data: {
            labels: recentDates,
            datasets: [{
                label: 'Downloads Diários',
                data: values,
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#fff',
                pointRadius: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderChartDownloadsMes(dataObj) {
    const sortedMonths = Object.keys(dataObj).sort();
    const labels = sortedMonths.map(m => {
        const [year, month] = m.split('-');
        return `${month}/${year}`;
    });
    const values = sortedMonths.map(m => dataObj[m]);

    const ctx = document.getElementById('chart-downloads-mes').getContext('2d');
    if(chartDownloadsMes) chartDownloadsMes.destroy();

    chartDownloadsMes = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Downloads por Mês',
                data: values,
                backgroundColor: colors.tertiary, // Usando a cor roxa (tertiary)
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderChartPlanos(dataObj) {
    const labels = Object.keys(dataObj);
    const values = Object.values(dataObj);

    const ctx = document.getElementById('chart-planos').getContext('2d');
    if(chartPlanos) chartPlanos.destroy();

    chartPlanos = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [colors.primary, colors.secondary, colors.tertiary, colors.quaternary, colors.quinary],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function renderChartEstados(dataObj) {
    // Ordenar por valor e pegar top 5
    const sorted = Object.entries(dataObj).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const labels = sorted.map(i => i[0]);
    const values = sorted.map(i => i[1]);

    const ctx = document.getElementById('chart-estados').getContext('2d');
    if(chartEstados) chartEstados.destroy();

    chartEstados = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Clientes por Estado',
                data: values,
                backgroundColor: colors.secondary,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderTopClientes(downloadsPorEmail, clientesData) {
    // Mapear emails para nomes (se disponível)
    const emailMap = {};
    clientesData.forEach(c => {
        if(c.email) emailMap[c.email] = c.razao_social || c.nome || c.email;
    });

    const sorted = Object.entries(downloadsPorEmail).sort((a,b) => b[1] - a[1]).slice(0, 10);
    const tbody = document.querySelector('#top-clientes-table tbody');
    tbody.innerHTML = '';

    sorted.forEach(([email, qtd]) => {
        const nome = emailMap[email] || email;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="font-weight:600; color:#fff">${nome}</div>
                <div style="font-size:0.8rem; color:var(--text-muted)">${email}</div>
            </td>
            <td style="font-weight:600; color:var(--accent)">${qtd.toLocaleString('pt-BR')}</td>
        `;
        tbody.appendChild(tr);
    });
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('dashboard-content').classList.add('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('dashboard-content').classList.remove('hidden');
}

// Iniciar ao carregar a página
document.getElementById('reload-btn').addEventListener('click', init);
window.addEventListener('DOMContentLoaded', init);
