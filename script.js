// Dati finti peso settimanale (kg)
const weeklyWeights = [7.0, 7.3, 7.2, 7.4, 7.1, 7.5, 7.2];

// Oggetti preimpostati con stato presenza
const items = [
  { name: "Portafoglio", present: true },
  { name: "Chiavi", present: false },
  { name: "Occhiali", present: true },
  { name: "Caricabatterie", present: true },
  { name: "Agenda", present: false }
];

const weightValueEl = document.getElementById("weightValue");
const toggleWeightBtn = document.getElementById("toggleWeight");
const weightChartContainer = document.getElementById("weightChartContainer");
const weightChartCanvas = document.getElementById("weightChart");
const toggleItemsBtn = document.getElementById("toggleItems");
const itemsListEl = document.getElementById("itemsList");

let weightChart; 

// Mostra peso attuale nel cerchio (ultimo dato)
weightValueEl.textContent = weeklyWeights[weeklyWeights.length - 1].toFixed(1) + " kg";

// Funzione per creare il grafico
function createWeightChart() {
  if (weightChart) {
    weightChart.destroy();
  }
  weightChart = new Chart(weightChartCanvas, {
    type: 'line',
    data: {
      labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      datasets: [{
        label: 'Peso settimanale (kg)',
        data: weeklyWeights,
        borderColor: '#357ABD',
        backgroundColor: '#4a90e2a0',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#357ABD'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          min: 6.5,
          max: 8,
          ticks: {
            stepSize: 0.5
          }
        }
      }
    }
  });
}

// Toggle grafico peso
toggleWeightBtn.addEventListener("click", () => {
  const isHidden = weightChartContainer.classList.toggle("hidden");
  toggleWeightBtn.classList.toggle("rotate");
  if (!isHidden) {
    createWeightChart();
  }
});

// Costruisci lista oggetti
function buildItemsList() {
  itemsListEl.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    if (!item.present) {
      li.classList.add("missing");
      const dot = document.createElement("span");
      dot.className = "missing-dot";
      li.appendChild(dot);
    }
    itemsListEl.appendChild(li);
  });
}

// Toggle lista oggetti
toggleItemsBtn.addEventListener("click", () => {
  const isHidden = itemsListEl.classList.toggle("hidden");
  toggleItemsBtn.classList.toggle("rotate");
  if (!isHidden) {
    buildItemsList();
  }
});
