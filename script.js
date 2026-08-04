/* ===========================================
   CONFIGURAÇÕES
=========================================== */

let tamanhoFonte = 100;

/* ===========================================
   ELEMENTOS
=========================================== */

const btnFonteMais = document.getElementById("btnFonteMais");
const btnFonteMenos = document.getElementById("btnFonteMenos");
const btnContraste = document.getElementById("btnContraste");
const btnBaixaVisao = document.getElementById("btnBaixaVisao");
const btnLerPagina = document.getElementById("btnLerPagina");
const btnParar = document.getElementById("btnParar");
const btnMicrofone = document.getElementById("btnMicrofone");
const btnAgendar = document.getElementById("botaoAgendar");

const avisos = document.getElementById("avisos");

/* ===========================================
   SALVAR CONFIGURAÇÕES
=========================================== */

function salvarConfiguracoes() {

    localStorage.setItem("fonte", tamanhoFonte);

    localStorage.setItem(
        "contraste",
        document.body.classList.contains("altoContraste")
    );

    localStorage.setItem(
        "baixaVisao",
        document.body.classList.contains("baixaVisao")
    );

}

function carregarConfiguracoes(){

    const fonte = localStorage.getItem("fonte");

    if(fonte){

        tamanhoFonte = parseInt(fonte);

        document.body.style.fontSize = tamanhoFonte + "%";

    }

    if(localStorage.getItem("contraste") === "true"){

        document.body.classList.add("altoContraste");

    }

    if(localStorage.getItem("baixaVisao") === "true"){

        document.body.classList.add("baixaVisao");

    }

}

/* ===========================================
   FONTE
=========================================== */

btnFonteMais.onclick = () => {

    tamanhoFonte += 10;

    document.body.style.fontSize = tamanhoFonte + "%";

    salvarConfiguracoes();

};

btnFonteMenos.onclick = () => {

    if(tamanhoFonte > 70){

        tamanhoFonte -= 10;

        document.body.style.fontSize = tamanhoFonte + "%";

        salvarConfiguracoes();

    }

};

/* ===========================================
   CONTRASTE
=========================================== */

btnContraste.onclick = () => {

    document.body.classList.toggle("altoContraste");

    salvarConfiguracoes();

};

/* ===========================================
   BAIXA VISÃO
=========================================== */

btnBaixaVisao.onclick = () => {

    document.body.classList.toggle("baixaVisao");

    salvarConfiguracoes();

};

/* ===========================================
   LEITOR DE VOZ
=========================================== */

function falar(texto){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "pt-BR";

    voz.rate = 1;

    voz.pitch = 1;

    speechSynthesis.speak(voz);

}

btnLerPagina.onclick = ()=>{

    const texto =
    document.getElementById("conteudo").innerText;

    falar(texto);

};

btnParar.onclick = ()=>{

    speechSynthesis.cancel();

};

/* ===========================================
   COMANDOS DE VOZ
=========================================== */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const reconhecimento =
    new SpeechRecognition();

    reconhecimento.lang = "pt-BR";

    reconhecimento.onstart = ()=>{

        avisos.innerText = "Ouvindo comando.";

    }

    reconhecimento.onresult = (evento)=>{

        const comando =
        evento.results[0][0].transcript.toLowerCase();

        avisos.innerText =
        "Comando: " + comando;

        if(comando.includes("agendar")){

            btnAgendar.click();

        }

        else if(comando.includes("vacina")){

            document
            .getElementById("vacinas")
            .scrollIntoView({
                behavior:"smooth"
            });

        }

        else if(comando.includes("contato")){

            document
            .getElementById("contato")
            .scrollIntoView({
                behavior:"smooth"
            });

        }

        else if(comando.includes("contraste")){

            btnContraste.click();

        }

        else if(comando.includes("ler")){

            btnLerPagina.click();

        }

    };

    btnMicrofone.onclick = ()=>{

        reconhecimento.start();

    }

}else{

    btnMicrofone.disabled = true;

}

/* ===========================================
   ATALHOS
=========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.altKey){

        switch(e.key){

            case "1":

                document
                .getElementById("home")
                .scrollIntoView();

                break;

            case "2":

                document
                .getElementById("vacinas")
                .scrollIntoView();

                break;

            case "3":

                document
                .getElementById("contato")
                .scrollIntoView();

                break;

            case "a":

                btnAgendar.click();

                break;

            case "l":

                btnLerPagina.click();

                break;

        }

    }

});

/* ===========================================
   AGENDAMENTO
=========================================== */

btnAgendar.onclick = ()=>{

    avisos.innerText =
    "Abrindo formulário de agendamento.";

    setTimeout(()=>{

        window.location.href =
        "paginadeformulario.html";

    },800);

};

/* ===========================================
   EXPLICAÇÃO DOS BOTÕES
=========================================== */

document.querySelectorAll("button").forEach((botao)=>{

    botao.addEventListener("focus",()=>{

        const texto =
        botao.innerText;

        avisos.innerText = texto;

    });

});

/* ===========================================
   INICIALIZAÇÃO
=========================================== */

carregarConfiguracoes();