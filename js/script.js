const btn = document.querySelector("#novoServico");
const container = document.querySelector(".container");
const containerLista = document.querySelector("#lista-agendamentos");

const numHoje = document.querySelector("#div-num-hoje");
const numConcluido = document.querySelector("#div-num-concluido");

// 🔥 LOCAL STORAGE
let lista = JSON.parse(localStorage.getItem("agendamentos")) || [];

// =====================
// RENDERIZAR NA TELA
// =====================
function renderizar() {
  containerLista.innerHTML = "";

  numHoje.textContent = lista.length;
  numConcluido.textContent = lista.filter(
    item => item.status === "Concluído"
  ).length;

  lista.forEach((item, index) => {
    const cliente = document.createElement("div");
    cliente.classList.add("cliente");

    const nome = document.createElement("div");
    nome.textContent = item.nome;

    const horario = document.createElement("div");
    horario.textContent = item.horario;

    const status = document.createElement("div");
    status.textContent = item.status;

    aplicarCor(cliente, item.status);

    // 🔄 TROCAR STATUS
    cliente.addEventListener("click", () => {
      if (item.status === "Pendente") item.status = "Em andamento";
      else if (item.status === "Em andamento") item.status = "Concluído";
      else item.status = "Pendente";

      salvar();
      renderizar();
    });

    cliente.appendChild(nome);
    cliente.appendChild(horario);
    cliente.appendChild(status);

    containerLista.appendChild(cliente);
  });
}

// =====================
// SALVAR
// =====================
function salvar() {
  localStorage.setItem("agendamentos", JSON.stringify(lista));
}

// =====================
// COR
// =====================
function aplicarCor(cliente, status) {
  if (status === "Pendente") cliente.style.background = "#eab308";
  if (status === "Em andamento") cliente.style.background = "#0ea5e9";
  if (status === "Concluído") cliente.style.background = "#22c55e";
}

// =====================
// NOVO SERVIÇO
// =====================
btn.addEventListener("click", () => {
  const existente = document.querySelector(".novoServ");
  if (existente) existente.remove();

  const box = document.createElement("div");
  box.classList.add("novoServ");

  const fechar = document.createElement("button");
  fechar.textContent = "X";
  fechar.classList.add("btnFecharContainer");
  fechar.onclick = () => box.remove();

  const nome = document.createElement("input");
  nome.placeholder = "Nome";

  const horario = document.createElement("input");
  horario.type = "time";

  const btnAdd = document.createElement("button");
  btnAdd.textContent = "Adicionar";
  btnAdd.classList.add("btnAdd");

  // radios
  const statusContainer = document.createElement("div");

  function radio(valor) {
    const label = document.createElement("label");
    const r = document.createElement("input");
    r.type = "radio";
    r.name = "status";
    r.value = valor;
    label.appendChild(r);
    label.append(valor);
    return label;
  }

  statusContainer.appendChild(radio("Pendente"));
  statusContainer.appendChild(radio("Em andamento"));
  statusContainer.appendChild(radio("Concluído"));

  box.append(fechar, nome, horario, statusContainer, btnAdd);
  container.appendChild(box);

  btnAdd.onclick = () => {
    const statusSelecionado = document.querySelector(
      'input[name="status"]:checked'
    );

    if (!nome.value || !horario.value || !statusSelecionado) {
      alert("Preencha tudo!");
      return;
    }

    lista.push({
      nome: nome.value,
      horario: horario.value,
      status: statusSelecionado.value
    });

    salvar();
    renderizar();
    box.remove();
  };
});

// =====================
// FILTRO
// =====================
const btns = document.querySelectorAll("#btns button");

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    const texto = btn.textContent;

    document.querySelectorAll(".cliente").forEach(cliente => {
      const status = cliente.querySelector("div:last-child").textContent;

      if (texto === "Todos" || status === texto) {
        cliente.style.display = "flex";
      } else {
        cliente.style.display = "none";
      }
    });
  });
});

// iniciar
renderizar();