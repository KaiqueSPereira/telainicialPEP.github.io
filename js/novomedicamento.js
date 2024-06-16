document.addEventListener('DOMContentLoaded', function() {
    var doseField = document.getElementById('dose');
    var estoqueField = document.getElementById('estoque');
    var intervaloField = document.getElementById('intervalo');
    var unidadeIntervaloContinuoField = document.getElementById('unidade-intervalo-Contino');
    // Função para mostrar ou ocultar campos com base na frequência selecionada
    function mostrarOcultarCampos() {
        var frequencia = document.getElementById('frequencia').value;
        var usoContinuoFields = document.getElementById('usoContinuoFields');
        var tratamentoFields = document.getElementById('tratamentoFields');
        var anexoReceita = document.getElementById('anexo-receita');
        

        if (frequencia === 'continuo') {
            usoContinuoFields.style.display = 'block';
            tratamentoFields.style.display = 'none';
            anexoReceita.style.display = 'block';
        } else if (frequencia === 'tratamento') {
            usoContinuoFields.style.display = 'none';
            tratamentoFields.style.display = 'block';
            anexoReceita.style.display = 'block';
        } else {
            usoContinuoFields.style.display = 'none';
            tratamentoFields.style.display = 'none';
            anexoReceita.style.display = 'none';
        }
    }

    // Event listener para o campo "Frequência" para exibir/ocultar campos relevantes
    document.getElementById('frequencia').addEventListener('change', function() {
        mostrarOcultarCampos(); // Chamada para mostrar ou ocultar campos relevantes
    });

    // Função para calcular a duração do medicamento com base na dose e no estoque
    function calcularDuracaoMedicamento() {
        var dose = parseFloat(doseField.value);
        var quantidade = parseFloat(estoqueField.value);
        var intervalo = parseFloat(intervaloField.value);
        var unidadeIntervalocontinuo = unidadeIntervaloContinuoField.value;

        if (!isNaN(dose) && !isNaN(quantidade) && !isNaN(intervalo) && intervalo > 0) {
            var fatorIntervalo;
            
            switch (unidadeIntervalocontinuo) {
                case 'dias':
                    fatorIntervalo = 1;
                    break;
                case 'semanas':
                    fatorIntervalo = 7;
                    break;
                case 'meses':
                    fatorIntervalo = 30;
                    break;
                default:
                    fatorIntervalo = 1;
            }
            
            var duracao = Math.ceil(quantidade / (dose * intervalo * fatorIntervalo));
            document.getElementById('duracao').innerText = duracao + " dias";
        } else {
            document.getElementById('duracao').innerText = "";
        }
    }

    doseField.addEventListener('input', calcularDuracaoMedicamento);
    estoqueField.addEventListener('input', calcularDuracaoMedicamento);
    intervaloField.addEventListener('input', calcularDuracaoMedicamento);
    unidadeIntervaloField.addEventListener('change', calcularDuracaoMedicamento);

    // Função para calcular a data de término do tratamento com base na data de início e no tempo de tratamento
    function calcularTerminoTratamento() {
        var inicioTratamento = new Date(document.getElementById('inicio-tratamento').value);
        var tempoTratamento = parseInt(document.getElementById('tempo-tratamento').value);
        var unidadeTempo = document.getElementById('unidade-tempo').value;
        var intervaloTratamento = parseInt(document.getElementById('intervalo-tratamento').value);
        var unidadeIntervalo = document.getElementById('unidade-intervalo').value;
    
        // Convertendo tempo de tratamento para dias
        if (unidadeTempo === 'semanas') {
            tempoTratamento *= 7; // 1 semana = 7 dias
        } else if (unidadeTempo === 'meses') {
            tempoTratamento *= 30; // Aproximação de 1 mês = 30 dias
        }
    
        // Calculando o término do tratamento
        var terminoTratamento = new Date(inicioTratamento.getTime() + tempoTratamento * 24 * 60 * 60 * 1000);
    
        // Mostrando a data de término no formato desejado (dia/mês/ano)
        var dia = terminoTratamento.getDate().toString().padStart(2, '0');
        var mes = (terminoTratamento.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do zero
        var ano = terminoTratamento.getFullYear();
        var dataFormatada = dia + '/' + mes + '/' + ano;
    
        // Atualizando o campo de término do tratamento no formulário
        document.getElementById('termino-tratamento').value = dataFormatada;
    }
    
    // Event listener para o campo "Frequência" para exibir/ocultar campos relevantes
    document.getElementById('frequencia').addEventListener('change', function() {
        mostrarOcultarCampos(); // Chamada para mostrar ou ocultar campos relevantes
    });

    // Event listener para os campos relevantes para calcular a duração do medicamento
    var camposCalculo = ['dose', 'estoque', 'intervalo'];
    camposCalculo.forEach(function(campo) {
        document.getElementById(campo).addEventListener('input', function() {
            calcularDuracaoMedicamento(); // Chamada para calcular a duração do medicamento
        });
    });

    // Event listener para os campos relevantes para calcular o término do tratamento
    var camposTratamento = ['inicio-tratamento', 'tempo-tratamento', 'intervalo-tratamento', 'dose-tratamento'];
    camposTratamento.forEach(function(campo) {
        document.getElementById(campo).addEventListener('input', function() {
            calcularTerminoTratamento(); // Chamada para calcular o término do tratamento
        });
    });

    // Event listener para o botão de enviar do formulário
    document.getElementById('medicamento-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado
        calcularDuracaoMedicamento(); // Calcula a duração do medicamento
        calcularDataTerminoTratamento(); // Calcula a data de término do tratamento
    });
});
