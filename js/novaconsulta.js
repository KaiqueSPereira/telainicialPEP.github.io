document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tipo-consulta').addEventListener('change', function() {
        var tipoConsulta = this.value;
        var queixasGroup = document.getElementById('queixas-group');
        var tratamentosGroup = document.getElementById('tratamentos-group');
        var tipoExameGroup = document.getElementById('tipo-exame-group');
        var profissionalGroup = document.getElementById('profissional-group');

        // Hide all groups initially
        queixasGroup.style.display = 'none';
        tratamentosGroup.style.display = 'none';
        tipoExameGroup.style.display = 'none';
        profissionalGroup.style.display = 'none';

        // Show relevant groups based on selected consultation type
        if (tipoConsulta === 'emergencia') {
            queixasGroup.style.display = 'block';
        } else if (tipoConsulta === 'rotina') {
            tratamentosGroup.style.display = 'block';
            profissionalGroup.style.display = 'block';
        } else if (tipoConsulta === 'exame') {
            tipoExameGroup.style.display = 'block';
            profissionalGroup.style.display = 'block';
        }
    });
});
