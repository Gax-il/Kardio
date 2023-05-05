const ageNumb = document.getElementById("age_numb");
const ageRange = document.getElementById("age_range");

let smoker = 1;
let sex = 0;

const radios = document.querySelectorAll('input[type="radio"]');
for (const radio of radios) {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "yes") {
      smoker = 1;
      document.getElementById("smokingdiv").classList.add("active");
      document.getElementById("nosmokingdiv").classList.remove("active");
    } else if (event.target.value === "no") {
      smoker = 0;
      document.getElementById("nosmokingdiv").classList.add("active");
      document.getElementById("smokingdiv").classList.remove("active");
    } else if (event.target.value === "man") {
      sex = 0;
      document.getElementById("mandiv").classList.add("active");
      document.getElementById("womandiv").classList.remove("active");
    } else {
      sex = 1;
      document.getElementById("womandiv").classList.add("active");
      document.getElementById("mandiv").classList.remove("active");
    }
    calculation();
  });
}

ageNumb.addEventListener("input", () => {
  ageRange.value = ageNumb.value;
  calculation();
});

ageRange.addEventListener("input", () => {
  ageNumb.value = ageRange.value;
  calculation();
});

const cholNumb = document.getElementById("cholesterol_numb");
const cholRange = document.getElementById("cholesterol_range");

cholNumb.addEventListener("input", () => {
  cholRange.value = cholNumb.value;
  calculation();
});

cholRange.addEventListener("input", () => {
  cholNumb.value = cholRange.value;
  calculation();
});

const bloodNumb = document.getElementById("blood_numb");
const bloodRange = document.getElementById("blood_range");

bloodNumb.addEventListener("input", () => {
  bloodRange.value = bloodNumb.value;
  calculation();
});

bloodRange.addEventListener("input", () => {
  bloodNumb.value = bloodRange.value;
  calculation();
});

function vypis() {
  console.log(`Age: ${age}`);
  console.log(`Smoker: ${smoker}`);
  console.log(`Cholesterol: ${cholesterol}`);
  console.log(`Blood Pressure: ${bloodPressure}`);
  console.log(`Sex: ${sex}`);
}

function calculation() {
  read();
  let p;
  let pN;
  let alpha;
  let alphaN;
  let sz;
  let szN;
  let szd;
  let szdN;
  let w;
  let wN;
  const smoking = 0.71;
  const smokingN = 0.63;
  const chole = 0.24;
  const choleN = 0.02;
  const bp = 0.018;
  const bpN = 0.022;
  let s;
  let sN;
  let sd;
  let sdN;
  let ss;
  let ssN;
  let risk;
  let riskN;
  let result;

  const write = document.getElementById("result_value");

  if (sex === 0) {
    p = 4.62;
    pN = 5.47;
    alpha = -21.0;
    alphaN = -25.7;
  } else {
    p = 6.23;
    pN = 6.42;
    alpha = -28.7;
    alphaN = -30.0;
  }

  sz = Math.exp(-(Math.exp(alpha) * Math.pow(age - 20, p)));
  szN = Math.exp(-(Math.exp(alphaN) * Math.pow(age - 20, pN)));
  szd = Math.exp(-(Math.exp(alpha) * Math.pow(age - 10, p)));
  szdN = Math.exp(-(Math.exp(alphaN) * Math.pow(age - 10, pN)));
  w = chole * (cholesterol - 6) + bp * (bloodPressure - 120) + smoking * smoker;
  wN = choleN * (cholesterol - 6) + bpN * (bloodPressure - 120) + smokingN * smoker;
  s = Math.pow(sz, Math.exp(w));
  sd = Math.pow(szd, Math.exp(w));
  sN = Math.pow(szN, Math.exp(wN));
  sdN = Math.pow(szdN, Math.exp(wN));
  ss = sd / s;
  ssN = sdN / sN;
  risk = 1 - ss;
  riskN = 1 - ssN;
  result = risk + riskN;
  result = parseInt(result * 10000);
  result = result / 100;
  console.log(document.getElementById("sex").innerHTML);
  if (result > 99.99) {
    result = 99.99;
  }
  write.innerHTML = result.toFixed(2) + " %";
}
function read() {
  bloodPressure = bloodNumb.value;
  cholesterol = cholNumb.value;
  age = ageNumb.value;
}
