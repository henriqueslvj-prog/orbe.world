const products = [
  {
    name: "Pulseira Malachite Silver",
    description: "Pedras verdes naturais com detalhes em aço polido.",
    image: "https://drive.google.com/uc?export=view&id=1AxoOqCPeccdpbzk6NQswFc-VB9kuHyGV",
    category: "pulseiras"
  },
  {
    name: "Pulseira Mint Pearl",
    description: "Composição leve em tons claros e acabamento sofisticado.",
    image: "https://drive.google.com/uc?export=view&id=1JxLbqfKoyM3DOongjOUqS6-EaPlsdg_1",
    category: "pulseiras"
  },
  {
    name: "Pulseira Hematite Black",
    description: "Visual contemporâneo com contraste entre hematita e pérolas.",
    image: "https://drive.google.com/uc?export=view&id=192FnhaiirYLtv_rDPYeeCjc9xd_bJgM5",
    category: "pulseiras"
  },
  {
    name: "Pulseira Eclipse Noir",
    description: "Design minimalista em tons escuros para uso diário premium.",
    image: "https://drive.google.com/uc?export=view&id=1MmGyPIl-RZGS5WDn1-Kio1prMnnaim9z",
    category: "pulseiras"
  },
  {
    name: "Correntes ORBE",
    description: "Coleção em preparação — imagens serão adicionadas em breve.",
    image: "",
    category: "correntes"
  },
  {
    name: "Anéis ORBE",
    description: "Coleção em preparação — imagens serão adicionadas em breve.",
    image: "",
    category: "aneis"
  },
  {
    name: "Cintos ORBE",
    description: "Coleção em preparação — imagens serão adicionadas em breve.",
    image: "",
    category: "cintos"
  },
  {
    name: "Carteiras ORBE",
    description: "Coleção em preparação — imagens serão adicionadas em breve.",
    image: "",
    category: "carteiras"
  }
];

const categoryTitles = {
  pulseiras: "Pulseiras em destaque",
  correntes: "Correntes em destaque",
  aneis: "Anéis em destaque",
  cintos: "Cintos em destaque",
  carteiras: "Carteiras em destaque"
};

const productList = document.getElementById("productList");
const selectedItems = document.getElementById("selectedItems");
const reserveLink = document.getElementById("reserveLink");
const year = document.getElementById("year");
const collectionSelect = document.getElementById("collectionSelect");
const collectionTitle = document.getElementById("collectionTitle");
const selected = new Set();

year.textContent = new Date().getFullYear();

function refreshReserveStatus() {
  if (!selected.size) {
    selectedItems.innerHTML = "<li>Nenhuma peça selecionada.</li>";
    reserveLink.classList.add("disabled");
    return;
  }

  selectedItems.innerHTML = [...selected].map((name) => `<li>${name}</li>`).join("");
  reserveLink.classList.remove("disabled");
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "card";

  const imageHtml = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy" />`
    : `<div class="media-placeholder">Imagem em breve</div>`;

  card.innerHTML = `
    <figure class="media">
      ${imageHtml}
    </figure>
    <div class="card-content">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <label>
        <input type="checkbox" value="${product.name}" ${selected.has(product.name) ? "checked" : ""} />
        Selecionar para reserva
      </label>
    </div>
  `;

  card.querySelector("input").addEventListener("change", (event) => {
    if (event.target.checked) {
      selected.add(product.name);
    } else {
      selected.delete(product.name);
    }
    refreshReserveStatus();
  });

  return card;
}

function renderProducts(category) {
  productList.innerHTML = "";
  collectionTitle.textContent = categoryTitles[category] || "Coleção ORBE";

  const filtered = products.filter((product) => product.category === category);
  filtered.forEach((product) => {
    productList.appendChild(createCard(product));
  });
}

collectionSelect.addEventListener("change", (event) => {
  renderProducts(event.target.value);
});

renderProducts(collectionSelect.value);
refreshReserveStatus();
