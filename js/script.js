const btn = document.querySelector('#novoServico');
const container = document.querySelector(".container");

btn.addEventListener('click', ()=>{
    const addServico = document.createElement('div');
    addServico.classList.add("novoServ");

    const btnFechar = document.createElement("button");
    btnFechar.classList.add("btnFecharContainer");
    btnFechar.textContent = "X";

    const btnAdd = document.createElement('button');
    btnAdd.textContent = "Adicionar";
    btnAdd.classList.add("btnAdd");

    const container_Campo = document.createElement("div")
    container_Campo.classList.add("container-campo");

    const labelNome = document.createElement('label');
    labelNome.textContent = "Nome:"
    const txtNome = document.createElement('input');
    txtNome.classList.add('txtNome');

    const labeHorario = document.createElement('label');
    labeHorario.textContent = "Horário:"
    const txtHorario = document.createElement('input');
    txtNome.classList.add('txtHorario');

    const labelStatus = document.createElement('label');
    labelStatus.textContent = "Status:"
    const txtStatus = document.createElement('input');
    txtNome.classList.add('txtStatus');

    addServico.appendChild(container_Campo);
    addServico.appendChild(btnFechar);
    container_Campo.appendChild(labelNome)
    container_Campo.appendChild(txtNome)
    container_Campo.appendChild(labeHorario)
    container_Campo.appendChild(txtHorario)
    container_Campo.appendChild(labelStatus)
    container_Campo.appendChild(txtStatus);
    container_Campo.appendChild(btnAdd);

    container.appendChild(addServico);

})