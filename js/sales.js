document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo basados en la DB V3
    const salesData = [
        { id: 1, clienteId: '3L_Efektiv', productoId: '3L_Tips_Presidente', fecha: '2023-05-20', cantidad: 1, total: 1200.00, estado: 'Completada' },
        { id: 2, clienteId: '3d_Generics', productoId: 'Fields_Xerba', fecha: '2023-05-18', cantidad: 2, total: 950.50, estado: 'Completada' },
        { id: 3, clienteId: 'Archive_VERSION', productoId: 'Xerba_Final', fecha: '2023-05-15', cantidad: 1, total: 850.00, estado: 'Pendiente' }
    ];
    
    const clientes = ['3L_Efektiv', '3d_Generics', 'Archive_VERSION', 'Telefono'];
    const productos = ['3L_Tips_Presidente', 'Fields_Xerba', 'Xerba_Final', 'Fields_Total', 'Xerba_Presidente'];
    
    // Llenar la tabla de ventas
    const tableBody = document.getElementById('salesTableBody');
    salesData.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.id}</td>
            <td>${sale.clienteId}</td>
            <td>${sale.productoId}</td>
            <td>${sale.fecha}</td>
            <td>${sale.cantidad}</td>
            <td>$${sale.total.toFixed(2)}</td>
            <td><span class="status-${sale.estado.toLowerCase()}">${sale.estado}</span></td>
            <td>
                <button class="btn-view" data-id="${sale.id}">Ver</button>
                <button class="btn-cancel" data-id="${sale.id}" ${sale.estado === 'Completada' ? 'disabled' : ''}>Cancelar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Llenar select de clientes
    const clienteSelect = document.getElementById('clienteId');
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente;
        option.textContent = cliente;
        clienteSelect.appendChild(option);
    });
    
    // Llenar select de productos
    const productoSelect = document.getElementById('productoId');
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto;
        option.textContent = producto;
        productoSelect.appendChild(option);
    });
    
    // Mostrar modal para nueva venta
    document.getElementById('addSaleBtn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Nueva Venta';
        document.getElementById('saleForm').reset();
        document.getElementById('saleId').value = '';
        document.getElementById('saleModal').style.display = 'block';
    });
    
    // Calcular total cuando cambia cantidad o precio
    document.getElementById('cantidad').addEventListener('change', calculateTotal);
    document.getElementById('precioUnitario').addEventListener('change', calculateTotal);
    
    function calculateTotal() {
        const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
        const precio = parseFloat(document.getElementById('precioUnitario').value) || 0;
        document.getElementById('total').value = (cantidad * precio).toFixed(2);
    }
    
    // Manejar envío del formulario
    document.getElementById('saleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para guardar la venta
        alert('Venta registrada correctamente');
        document.getElementById('saleModal').style.display = 'none';
        // En una aplicación real, aquí actualizarías la tabla
    });
    
    // Manejar clics en botones de la tabla
    tableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-view')) {
            const id = e.target.getAttribute('data-id');
            const sale = salesData.find(sale => sale.id == id);
            if (sale) {
                alert(`Detalles de venta:\nID: ${sale.id}\nCliente: ${sale.clienteId}\nProducto: ${sale.productoId}\nTotal: $${sale.total.toFixed(2)}`);
            }
        }
        
        if (e.target.classList.contains('btn-cancel')) {
            if (confirm('¿Estás seguro de que deseas cancelar esta venta?')) {
                // Aquí iría la lógica para cancelar la venta
                e.target.disabled = true;
                e.target.textContent = 'Cancelada';
                alert('Venta cancelada');
            }
        }
    });
});