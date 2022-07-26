// Application.NormSDist helper https://gist.github.com/dbinoj/ac28de70f0be618ba7679ae8920c2d29
function NORMSDIST(z) {
    if (isNaN(z)) return '#VALUE!';
    var mean = 0, sd = 1;
    return jStat.normal.cdf(z, mean, sd);
}

function bs_d1(S, X, sigma, T, Rate) {
    if (T > 0) {
        return (Math.log(S / X) + (Rate + 0.5 * sigma**2) * T) / (sigma * T**0.5);
    } else {
        if (S >= X) {
            return 999999;
        } else {
            return -999999;   
        }
    }
}
function bs_d2(S, X, sigma, T, Rate) {
    return bs_d1(S, X, sigma, T, Rate) - sigma * T**0.5;
}
function bs_nd1(S, X, sigma, T, Rate) {
    return NORMSDIST(bs_d1(S, X, sigma, T, Rate));
}
function bs_nd2(S, X, sigma, T, Rate) {
    return NORMSDIST(bs_d1(S, X, sigma, T, Rate) - sigma * T**0.5);
}

function bs_prc() {
  let S = document.getElementById("S").value;
  let X = document.getElementById("X").value;
  let sigma = document.getElementById("sigma").value / 100;
  let T = document.getElementById("T").value / 365;
  let Rate = document.getElementById("Rate").value / 100;

  let Call = S*bs_nd1(S, X, sigma, T, Rate) - X*Math.exp(-Rate*T) * bs_nd2(S, X, sigma, T, Rate);
  let Put = -S*(1 - bs_nd1(S, X, sigma, T, Rate)) + X*Math.exp(-Rate*T) * (1 - bs_nd2(S, X, sigma, T, Rate));
  
  document.getElementById("Call").innerText = Call.toFixed(3);
  document.getElementById("Put").innerText = Put.toFixed(3);
}

window.onload = bs_prc();