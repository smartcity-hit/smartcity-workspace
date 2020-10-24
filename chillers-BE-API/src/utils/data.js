// Converting Fahrenheit to Celcius algorithm
function fahrenheitToCelcius(fahrenheit) {
    const celciusTemp = parseInt((fahrenheit - 32) / 1.8, 10);
    return celciusTemp;
}

module.exports = fahrenheitToCelcius;