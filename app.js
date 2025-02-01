document.addEventListener("DOMContentLoaded", function () {
    let amigos = [];
    let elemAmigo = document.getElementById("amigo");
    let elemListaAmigos = document.getElementById("listaAmigos");
    let elemListaSorteio = document.getElementById("resultado");
    let btnSortear = document.getElementById("btnSortear");
    let sorteioRestante = [];

    function adicionarAmigo() {
        const novoAmigo = elemAmigo.value.trim();
        
        if (novoAmigo && !amigos.includes(novoAmigo)) {
            amigos.push(novoAmigo);
            atualizarListaAmigos();
            elemAmigo.value = "";
            verificarBotao();
        } else {
            alert("Nome inválido ou já adicionado!");
        }
    }

    function atualizarListaAmigos() {
        elemListaAmigos.innerHTML = "";
        amigos.forEach(amigo => {
            let li = document.createElement("li");
            li.textContent = amigo;
            elemListaAmigos.appendChild(li);
        });
    }

    function sortearAmigo() {
        if (amigos.length < 2) {
            alert("Adicione pelo menos dois amigos para realizar o sorteio!");
            return;
        }
        
        if (sorteioRestante.length === 0) {
            sorteioRestante = [...amigos];
            embaralhaArray(sorteioRestante);
        }
        
        let amigoSorteado = sorteioRestante.pop();
        elemListaSorteio.innerHTML = `O amigo sorteado é: <strong>${amigoSorteado}</strong>`;
        
        if (sorteioRestante.length === 0 && btnSortear) {
            btnSortear.classList.add("disabled");
        }
    }

    function embaralhaArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function reiniciar() {
        amigos = [];
        sorteioRestante = [];
        elemListaSorteio.innerHTML = "";
        elemListaAmigos.innerHTML = "";
        elemAmigo.value = "";
        if (btnSortear) btnSortear.classList.add("disabled");
    }

    function verificarBotao() {
        if (!btnSortear) return;
        
        if (amigos.length >= 2) {
            btnSortear.classList.remove("disabled");
        } else {
            btnSortear.classList.add("disabled");
        }
    }

    verificarBotao();
    
    window.adicionarAmigo = adicionarAmigo;
    window.sortearAmigo = sortearAmigo;
    window.reiniciar = reiniciar;
});