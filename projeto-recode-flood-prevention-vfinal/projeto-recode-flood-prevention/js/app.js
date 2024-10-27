function Form(pagina) {
    if (pagina === "/paginas/cadastre-se.html") {
        const fomulario = document.querySelector(".cadastrarFormulario");
        
        function enviaForm(ev) {
            ev.preventDefault();
            const inputs = fomulario.querySelectorAll("input:not([type=checkbox])");
            
            inputs.forEach(input => input.value = "");

            const inputCheckBox = fomulario.querySelector("input[type=checkbox]");
            inputCheckBox.checked = false;

            const selectField = fomulario.querySelector("select");
            selectField.value = null;

            console.log(ev);
        }
    
        fomulario.addEventListener("submit", enviaForm);
        const inputCep = fomulario.querySelector("#cep");

        async function pegaCep(cep) {
            try {

                const requisicao = await fetch(`http://viacep.com.br/ws/${cep}/json/`);

                const resposta = await requisicao.json();

                if (resposta.erro) {
                    console.log(erro);
                } else {
                    console.log(resposta);
                    const inputsEndereco = document.querySelector(".caixaEndereco").querySelectorAll("input");
                    inputsEndereco.forEach(input => {
                        if (resposta[input.id] && input.id !== "cep") {
                            input.value = resposta[input.id];
                            input.readOnly = true;
                        }
                    })
                }

                return resposta

            } catch (erro) {
                console.log(erro);
                return 0
            }
        }

        inputCep.addEventListener("keyup", async ev => inputCep.value.length == 9 && pegaCep(inputCep.value))
    }
}

window.onload = (ev) => Form(window.location.pathname);