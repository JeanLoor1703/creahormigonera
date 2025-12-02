function calcularVolumen() {
    // Obtener valores
    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const espesor = parseFloat(document.getElementById('espesor').value);
    
    // Validación básica
    if (!largo || !ancho || !espesor) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    if (largo <= 0 || ancho <= 0 || espesor <= 0) {
        alert('Los valores deben ser mayores a cero.');
        return;
    }
    
    // VALIDACIÓN DE SEGURIDAD - Espesor
    if (espesor > 2) {
        alert('⚠️ Parece que ingresaste metros enteros en el campo "Espesor".\n\nPara 10 centímetros, escribe: 0.10\nPara 15 centímetros, escribe: 0.15\n\nPor favor, corrige el valor.');
        return;
    }
    
    // Cálculo del volumen
    const volumen = (largo * ancho * espesor).toFixed(2);
    
    // Mostrar resultado
    const resultadoDiv = document.getElementById('resultado');
    const resultadoContenido = document.getElementById('resultado-contenido');
    
    resultadoDiv.style.display = 'block';
    
    // Verificar pedido mínimo
    if (volumen < 5) {
        resultadoDiv.className = 'resultado resultado-alerta';
        resultadoContenido.innerHTML = `
            <h3>⚠️ Volumen calculado: ${volumen} m³</h3>
            <p><strong>El pedido mínimo es de 5 metros cúbicos.</strong></p>
            <p>Te recomendamos ajustar las dimensiones o consultar con nuestro equipo para opciones especiales.</p>
        `;
    } else {
        resultadoDiv.className = 'resultado resultado-exito';
        const mensajeWhatsApp = `Hola, calculé que necesito ${volumen} m³ de hormigón premezclado. ¿Podrían darme más información y cotización?`;
        const urlWhatsApp = `https://wa.me/593997528670?text=${encodeURIComponent(mensajeWhatsApp)}`;
        
        resultadoContenido.innerHTML = `
            <h3>✅ Volumen calculado: ${volumen} m³</h3>
            <p>¡Perfecto! Cumples con el pedido mínimo.</p>
            <a href="${urlWhatsApp}" class="btn-glossy btn-whatsapp" target="_blank">
                <i class="fa-brands fa-whatsapp"></i> Solicitar Cotización por WhatsApp
            </a>
        `;
    }
    
    // Scroll suave al resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Permitir calcular con Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calculator-form input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularVolumen();
            }
        });
    });
});