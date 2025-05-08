document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo basados en la DB V3 proporcionada
    const inventoryData = [
        { id: 1, armazonId: '3L_dressbase', productoId: '3L_Presidente', fecha: '2023-05-15', piezas: 10, precio: 1200.00 },
        { id: 2, armazonId: 'Fuchs_VERSION', productoId: 'Vector_Adiprotein', fecha: '2023-05-10', piezas: 5, precio: 850.50 },
        { id: 3, armazonId: 'Fields_Behrinke', productoId: 'Fuchs_Behrinke', fecha: '2023-05-05', piezas: 8, precio: 950.00 }
    ];
    
    const armazones = ['3L_dressbase', '3L_Precession', 'Fuchs_VERSION', 'Fields_Behrinke'];
    const productos = ['3L_Presidente', 'Fuchs_Behrinke', 'Vector_Adiprotein', 'Picasso', 'Details_Xerba'];
    
    // Llenar la tabla de inventario
    const tableBody = document.getElementById('inventoryTableBody');
    inventoryData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.armazonId}</td>
            <td>${item.productoId}</td>
            <td>${item.fecha}</td>
            <td>${item.piezas}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Llenar select de armazones
    const armazonSelect = document.getElementById('armazonId');
    armazones.forEach(armazon => {
        const option = document.createElement('option');
        option.value = armazon;
        option.textContent = armazon;
        armazonSelect.appendChild(option);
    });
    
    // Llenar select de productos
    const productoSelect = document.getElementById('productoId');
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto;
        option.textContent = producto;
        productoSelect.appendChild(option);
    });
    
    // Mostrar modal para agregar
    document.getElementById('addInventoryBtn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Agregar Producto al Inventario';
        document.getElementById('inventoryForm').reset();
        document.getElementById('inventoryId').value = '';
        document.getElementById('inventoryModal').style.display = 'block';
    });
    
    // Manejar envío del formulario
    document.getElementById('inventoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para guardar los datos
        alert('Datos guardados correctamente');
        document.getElementById('inventoryModal').style.display = 'none';
        // En una aplicación real, aquí actualizarías la tabla
    });
    
    // Manejar clics en botones de editar y eliminar
    tableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit')) {
            const id = e.target.getAttribute('data-id');
            const item = inventoryData.find(item => item.id == id);
            if (item) {
                document.getElementById('modalTitle').textContent = 'Editar Producto';
                document.getElementById('inventoryId').value = item.id;
                document.getElementById('armazonId').value = item.armazonId;
                document.getElementById('productoId').value = item.productoId;
                document.getElementById('fechaEntrada').value = item.fecha;
                document.getElementById('piezas').value = item.piezas;
                document.getElementById('precioVenta').value = item.precio;
                document.getElementById('inventoryModal').style.display = 'block';
            }
        }
        
        if (e.target.classList.contains('btn-delete')) {
            if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                // Aquí iría la lógica para eliminar el registro
                alert('Registro eliminado');
                // En una aplicación real, aquí actualizarías la tabla
            }
        }
    });
});