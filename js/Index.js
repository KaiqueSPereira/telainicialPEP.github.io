document.addEventListener('DOMContentLoaded', function() {
    // Referências aos botões que abrem os modais
    var openModalConsultaBtn = document.getElementById('openModalConsulta');
    var openModalMedicamentoBtn = document.getElementById('openModalMedicamento');

    // Referências aos modais
    var consultaModal = document.getElementById('consultaModal');
    var medicamentoModal = document.getElementById('medicamentoModal');

    // Funções para abrir os modais correspondentes
    openModalConsultaBtn.onclick = function() {
        consultaModal.style.display = 'block';
    }

    openModalMedicamentoBtn.onclick = function() {
        medicamentoModal.style.display = 'block';
    }

    // Funções para fechar os modais ao clicar no botão de fechar ou fora do modal
    var closeModalBtns = document.getElementsByClassName('close');

    for (var i = 0; i < closeModalBtns.length; i++) {
        closeModalBtns[i].onclick = function() {
            this.parentElement.parentElement.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});
