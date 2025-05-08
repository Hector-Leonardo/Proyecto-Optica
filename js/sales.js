document.addEventListener('DOMContentLoaded', function () {
    const salesData = [
        { id: 1, clienteId: '3L_Efektiv', productoId: '3L_Tips_Presidente', fecha: '2023-05-20', cantidad: 1, total: 1200.00, estado: 'Completada' },
        { id: 2, clienteId: '3d_Generics', productoId: 'Fields_Xerba', fecha: '2023-05-18', cantidad: 2, total: 950.50, estado: 'Completada' },
        { id: 3, clienteId: 'Archive_VERSION', productoId: 'Xerba_Final', fecha: '2023-05-15', cantidad: 1, total: 850.00, estado: 'Pendiente' }
    ];

    const clientes = ['3L_Efektiv', '3d_Generics', 'Archive_VERSION', 'Telefono'];
    const productos = ['3L_Tips_Presidente', 'Fields_Xerba', 'Xerba_Final', 'Fields_Total', 'Xerba_Presidente'];
    const estados = ['Completada', 'Pendiente'];

    const tableBody = document.getElementById('salesTableBody');

    function renderSalesTable() {
        tableBody.innerHTML = '';
        salesData.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.id}</td>
                <td>${sale.clienteId}</td>
                <td>${sale.productoId}</td>
                <td>${sale.fecha}</td>
                <td>${sale.cantidad}</td>
                <td>$${sale.total.toFixed(2)}</td>
                <td>
                    <span class="status-display ${sale.estado.toLowerCase()}" data-id="${sale.id}">${sale.estado}</span>
                    <select class="status-select" data-id="${sale.id}" style="display: none;">
                        ${estados.map(estado =>
                `<option value="${estado}" ${sale.estado === estado ? 'selected' : ''}>${estado}</option>`
            ).join('')}
                    </select>
                </td>
                <td>
                    <button class="btn-edit" data-id="${sale.id}">Editar</button>
                    <button class="btn-delete" data-id="${sale.id}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderSalesTable();

    const clienteSelect = document.getElementById('clienteId');
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente;
        option.textContent = cliente;
        clienteSelect.appendChild(option);
    });

    const productoSelect = document.getElementById('productoId');
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto;
        option.textContent = producto;
        productoSelect.appendChild(option);
    });

    document.getElementById('addSaleBtn').addEventListener('click', function () {
        document.getElementById('modalTitle').textContent = 'Nueva Venta';
        document.getElementById('saleForm').reset();
        document.getElementById('saleId').value = '';
        document.getElementById('fechaVenta').valueAsDate = new Date();
        document.getElementById('saleModal').style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('saleModal').style.display = 'none';
    });

    document.getElementById('cantidad').addEventListener('change', calculateTotal);
    document.getElementById('precioUnitario').addEventListener('change', calculateTotal);

    function calculateTotal() {
        const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
        const precio = parseFloat(document.getElementById('precioUnitario').value) || 0;
        document.getElementById('total').value = (cantidad * precio).toFixed(2);
    }

    document.getElementById('saleForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const saleId = document.getElementById('saleId').value;
        const updatedSale = {
            clienteId: document.getElementById('clienteId').value,
            productoId: document.getElementById('productoId').value,
            fecha: document.getElementById('fechaVenta').value,
            cantidad: parseInt(document.getElementById('cantidad').value),
            total: parseFloat(document.getElementById('total').value),
            estado: document.getElementById('estadoVenta').value
        };

        if (saleId) {
            const index = salesData.findIndex(s => s.id == saleId);
            if (index !== -1) {
                salesData[index] = { id: parseInt(saleId), ...updatedSale };
                alert('Venta actualizada correctamente');
            }
        } else {
            updatedSale.id = salesData.length > 0 ? Math.max(...salesData.map(s => s.id)) + 1 : 1;
            salesData.push(updatedSale);
            alert('Venta registrada correctamente');
        }

        renderSalesTable();
        document.getElementById('saleModal').style.display = 'none';
    });

    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-edit')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            const sale = salesData.find(s => s.id === id);
            if (sale) {
                document.getElementById('modalTitle').textContent = 'Editar Venta';
                document.getElementById('saleId').value = sale.id;
                document.getElementById('clienteId').value = sale.clienteId;
                document.getElementById('productoId').value = sale.productoId;
                document.getElementById('fechaVenta').value = sale.fecha;
                document.getElementById('cantidad').value = sale.cantidad;
                document.getElementById('precioUnitario').value = (sale.total / sale.cantidad).toFixed(2);
                document.getElementById('total').value = sale.total.toFixed(2);
                document.getElementById('estadoVenta').value = sale.estado;
                document.getElementById('saleModal').style.display = 'block';
            }
        }

        if (e.target.classList.contains('btn-delete')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
                const index = salesData.findIndex(s => s.id === id);
                if (index !== -1) {
                    salesData.splice(index, 1);
                    renderSalesTable();
                    alert('Venta eliminada correctamente');
                }
            }
        }
    });

    window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('saleModal')) {
            document.getElementById('saleModal').style.display = 'none';
        }
    });
});
