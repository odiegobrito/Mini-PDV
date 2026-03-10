// ======================
// DADOS
// ======================
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

// ======================
// ELEMENTOS DOM
// ======================
const nomeProduto = document.getElementById("nomeProduto");
const precoVenda = document.getElementById("precoVenda");
const produtoVenda = document.getElementById("produtoVenda");

const faturamentoEl = document.getElementById("faturamento");
const lucroEl = document.getElementById("lucro");
const qtdVendasEl = document.getElementById("qtdVendas");

// ======================
// INIT
// ======================
atualizarSelectProdutos();
atualizarDashboard();

// ======================
// UTIL
// ======================
function salvarDados() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
  localStorage.setItem("vendas", JSON.stringify(vendas));
}

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ======================
// PRODUTOS
// ======================
function cadastrarProduto() {
  const nome = nomeProduto.value.trim();
  const preco = Number(precoVenda.value);

  if (!nome || preco <= 0) {
    alert("Informe nome e preço válidos");
    return;
  }

  produtos.push({ nome, preco });
  salvarDados();
  atualizarSelectProdutos();

  nomeProduto.value = "";
  precoVenda.value = "";
}

// ======================
// SELECT PRODUTOS
// ======================
function atualizarSelectProdutos() {
  produtoVenda.innerHTML = "<option value=''>Selecione um produto</option>";

  produtos.forEach((p, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = `${p.nome} - ${moeda(p.preco)}`;
    produtoVenda.appendChild(opt);
  });
}

// ======================
// VENDER
// ======================
function registrarVenda() {
  const index = produtoVenda.value;

  if (index === "") {
    alert("Selecione um produto");
    return;
  }

  const produto = produtos[index];

  vendas.push({
    nome: produto.nome,
    preco: produto.preco,
    data: new Date().toISOString()
  });

  salvarDados();
  atualizarDashboard();
}

// ======================
// DASHBOARD
// ======================
function atualizarDashboard() {
  let faturamento = 0;

  vendas.forEach(v => {
    faturamento += v.preco;
  });

  faturamentoEl.textContent = moeda(faturamento);
  lucroEl.textContent = moeda(faturamento);
  qtdVendasEl.textContent = vendas.length;
}

// ======================
// FECHAR CAIXA
// ======================
function fecharCaixa() {
  if (!confirm("Deseja zerar o caixa?")) return;

  vendas = [];
  localStorage.setItem("vendas", JSON.stringify(vendas));
  atualizarDashboard();

  alert("Caixa zerado com sucesso");
}
