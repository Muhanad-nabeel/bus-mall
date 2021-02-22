'use strict';

const purchasesNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'unicorn',
  'wine-glass'
];
let remainingVotes = 25;

const leftImg = document.getElementById("img1");
const centerImg = document.getElementById("img2");
const rightImg = document.getElementById("img3");
const sectionImg = document.getElementById("sec1");

function Purchases(name) {

  this.name = name;
  this.path = `./images/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Purchases.all.push(this);
}

Purchases.all = [];
for (let i = 0; i < purchasesNames.length; i++) {
  new Purchases(purchasesNames[i]);

}
console.table(Purchases.all);

function render() {

  const leftIndex = randomNumber(0, Purchases.all.length - 1);
  leftImg.src = Purchases.all[leftIndex].path;
  leftImg.title = Purchases.all[leftIndex].name;
  leftImg.alt = Purchases.all[leftIndex].name;

  const centerIndex = randomNumber(0, Purchases.all.length - 1);
  centerImg.src = Purchases.all[centerIndex].path;
  centerImg.title = Purchases.all[centerIndex].name;
  centerImg.alt = Purchases.all[centerIndex].name;

  const rightIndex = randomNumber(0, Purchases.all.length - 1);
  rightImg.src = Purchases.all[rightIndex].path;
  rightImg.title = Purchases.all[rightIndex].name;
  rightImg.alt = Purchases.all[rightIndex].name;

  Purchases.all[leftIndex].views++;
  Purchases.all[centerIndex].views++;
  Purchases.all[rightIndex].views++;

}

sectionImg.addEventListener('click', clickHandler);

function clickHandler(event) {
  // console.log('Target', event.target.id);
   remainingVotes -- ;

  if (remainingVotes === 0) {
    sec1.removeEventListener('click', clickHandler);
    sectionImg.addEventListener('submit', function (event) {

      const views = event.target.name.views;
      console.log(views);
    
      const votes = event.target.name.views;
      const result = document.getElementById("res");
    
      event.preventDefault();
    
    })
    createChart();
  } else {
    if (event.target.id !== 'sec1') {
      for (let i = 0; i < Purchases.all.length; i++) {
        if (Purchases.all[i].name === event.target.title) {
          Purchases.all[i].votes++;
        }

      }
      render();
      console.log(Purchases.all);
    }
  }
}
;
render();

function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');

  const PurchaseNames = [];
  const Votes = [];
  for (let i = 0; i < Purchases.all.length; i++) {
    PurchaseNames.push(Purchases.all[i].name);
    Votes.push(Purchases.all[i].votes);
  }
  console.log('Votes', Votes);
  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: PurchaseNames,
      datasets: [
        {
          barPercentage: 0.5,
          borderWidth: 4,
          label: ' Votes:',
          backgroundColor: 'rgb(100, 7, 25)',
          borderColor: 'rgb(0, 0, 0)',
          data: Votes,
        },
      ],
    },

    options: {},
  });
}render();
//helper
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}