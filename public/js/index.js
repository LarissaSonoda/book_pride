let proximaAtualizacao;
let proximaAtualizacao2;
var maior = -10;
var maiorAut = -10;
var menor = 9999999999;
window.onload = obterDadosGrafico();
window.onload = obterDadosGraficos2();


// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico() {


    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/livros/listarEdit`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*

var myChart;
function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Registros por Editora',
            data: [],
            fill: false,
            backgroundColor: ['#D386B3'],
            borderColor: '#000',
            borderWidth: '2px',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.nomeEditora);
        dados.datasets[0].data.push(registro.Qtde);

        if (registro.Qtde > maior) {
            maior = registro.Qtde;
            kpi1.innerHTML = `
                        <h2 style="font-weight: 200;">Editora com mais livros cadastrados</h2>
                        <h2><b style="font-weight: 900;"><p> ${registro.nomeEditora}</p></b></h2>
                        `;
        }

        if (registro.Qtde < menor) {
            menor = registro.Qtde;
            kpi2.innerHTML = `
                        <h2 style="font-weight: 200;">Editora com menos livros cadastrados</h2>
                        <h2><b style="font-weight: 900;"><p> ${registro.nomeEditora}</p></b></h2>
                        `;
        }

    }
    
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };


    // Adicionando gráfico criado em div na tela
    myChart = new Chart(
        document.getElementById(`editoras`),
        config
    );


    setTimeout(() => atualizarGrafico(dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(dados, myChart) {

    fetch(`/livros/listarEdit`).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                //obterdados();
                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                // avisoCaptura.innerHTML = ""


                if (novoRegistro[0].nomeEditora == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    aviso.innerHTML = "<i>Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará.</i>"
                    console.log("Nova editora capturada")
                    console.log(novoRegistro[0].nomeEditora)
                    // console.log("Horário do último dado capturado:")
                    // console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoRegistro[0].Qtde); // incluir a nova qtde de Livros de determinada editora

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


// GRÁFICO DE AUTORAS
function obterDadosGraficos2() {


    if (proximaAtualizacao2 != undefined) {
        clearTimeout(proximaAtualizacao2);
    }

    fetch(`/livros/listarAutoras`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico2(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*

var myChart;
function plotarGrafico2(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            //label: [],
            data: [],
            fill: false,
            backgroundColor: ['#D386B3', '#000', '#9C4F97', '#DCB1D2', '#EB3455', '#F2B66C', '#0035A9', '#C31A39', '#E95F81'],
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico2" e passados para "plotarGrafico2":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.nomeAutor);
        dados.datasets[0].data.push(registro.qtdeLiv);

        if (registro.qtdeLiv >= maiorAut) {
            kpi3.innerHTML = `
                        <h2 style="font-weight: 200;">Autora com mais livros cadastrados</h2>`;
            maior = registro.Qtde;
            kpi3.innerHTML += `
                        <h2><b style="font-weight: 900;"><p> ${registro.nomeAutor}</p></b></h2>
                        `;
        }

    }
    
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'pie',
        data: dados,
    };


    // Adicionando gráfico criado em div na tela
    myChart = new Chart(
        document.getElementById(`grafAutoras`),
        config
    );


    setTimeout(() => atualizarGrafico2(dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico2(dados, myChart) {

    fetch(`/livros/listarAutoras`).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);


                if (novoRegistro[0].nomeAutor == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    //aviso.innerHTML = "<i>Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará.</i>"
                    console.log("Nova editora capturada")
                    console.log(novoRegistro[0].nomeAutor)
                    // console.log("Horário do último dado capturado:")
                    // console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();
                    dados.datasets[0].data.push(novoRegistro[0].qtdeLiv); // incluir a nova qtde de Livros de determinada editora

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao2 = setTimeout(() => atualizarGrafico2(dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao2 = setTimeout(() => atualizarGrafico2(dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

