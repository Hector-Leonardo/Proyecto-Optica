document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo basados en la DB V3
    const clientsData = [
        { id: '3L_Efektiv', nombre: 'Juan Pérez', telefono: '555-1234', email: 'juan@example.com', ultimaVisita: '2023-05-20' },
        { id: '3d_Generics', nombre: 'María García', telefono: '555-5678', email: 'maria@example.com', ultimaVisita: '2023-05-18' },
        { id: 'Archive_VERSION', nombre: 'Carlos López', telefono: '555-9012', email: 'carlos@example.com', ultimaVisita: '2023-05-15' }
    ];
    
    const clientSales = {
        '3L_Efektiv': [
            { fecha: '2023-05-20', producto: '3L_Tips_Presidente', cantidad: 1, total: 1200.00 },
            { fecha: '2023-04-15', producto: 'Fields_Xerba', cantidad: 1, total: 850.00 }
        ],
        '3d_Generics': [
            { fecha: '2023-05-18', producto: 'Fields_Xerba', cantidad: 2, total: 950.50 }
        ],
        'Archive_VERSION': [
            { fecha: '2023-05-15', producto: 'Xerba_Final', cantidad: 1, total: 850.00 }
        ]
    };
    
    // Llenar la tabla de clientes
    const tableBody = document.getElementById('clientsTableBody');
    clientsData.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.nombre}</td>
            <td>${client.telefono}</td>
            <td>${client.email}</td>
            <td>${client.ultimaVisita}</td>
            <td>
                <button class="btn-view" data-id="${client.id}">Ver</button>
                <button class="btn-edit" data-id="${client.id}">Editar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Mostrar modal para nuevo cliente
    document.getElementById('addClientBtn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Nuevo Cliente';
        document.getElementById('clientForm').reset();
        document.getElementById('clientId').value = '';
        document.getElementById('clientModal').style.display = 'block';
    });
    
    // Manejar envío del formulario
    document.getElementById('clientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para guardar el cliente
        alert('Cliente guardado correctamente');
        document.getElementById('clientModal').style.display = 'none';
        // En una aplicación real, aquí actualizarías la tabla
    });
    
    // Manejar clics en botones de la tabla
    tableBody.addEventListener('click', function(e) {
        const id = e.target.getAttribute('data-id');
        const client = clientsData.find(client => client.id === id);
        
        if (!client) return;
        
        if (e.target.classList.contains('btn-view')) {
            // Mostrar tarjeta de cliente
            document.getElementById('cardClientName').textContent = client.nombre;
            document.getElementById('cardClientPhone').textContent = client.telefono;
            document.getElementById('cardClientEmail').textContent = client.email;
            document.getElementById('cardClientAddress').textContent = 'Calle 123, Ciudad'; // Ejemplo
            document.getElementById('cardClientBirthdate').textContent = '15/05/1985'; // Ejemplo
            
            // Llenar historial de compras
            const historyBody = document.getElementById('clientHistoryBody');
            historyBody.innerHTML = '';
            
            const sales = clientSales[id] || [];
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.fecha}</td>
                    <td>${sale.producto}</td>
                    <td>${sale.cantidad}</td>
                    <td>$${sale.total.toFixed(2)}</td>
                `;
                historyBody.appendChild(row);
            });
            
            document.getElementById('clientCardModal').style.display = 'block';
        }
        
        if (e.target.classList.contains('btn-edit')) {
            // Mostrar modal de edición con datos del cliente
            document.getElementById('modalTitle').textContent = 'Editar Cliente';
            document.getElementById('clientId').value = client.id;
            document.getElementById('clientName').value = client.nombre;
            document.getElementById('clientPhone').value = client.telefono;
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientModal').style.display = 'block';
        }
    });
    
    // Manejar cierre de modal de tarjeta
    document.getElementById('closeCardBtn').addEventListener('click', function() {
        document.getElementById('clientCardModal').style.display = 'none';
    });
    
    // Manejar impresión de tarjeta
    document.getElementById('printCardBtn').addEventListener('click', function() {
        window.print();
    });
});