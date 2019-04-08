var jwApp = {
    utils: {}
};
jwApp.utils.lotto = (function() {
    'use strict';

    var powerballLotteryRandom;
    var powerballRandom;

    var freqDrawnNumbers = [2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 39, 40, 41, 42, 42, 44, 46, 47, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
    var powerballNumbers = [1, 3, 5, 6, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 25];

    function generatePowerBallNumbers(num, numberType) {
        var numbers,
            powerballArray = [],
            pbNumberType = (numberType === 'pb'),
            i;

        if (pbNumberType) {
            numbers = freqDrawnNumbers;
        } else {
            // remove new array of lotto numbers from pb numbers
            powerballNumbers = powerballNumbers.filter(function(x) { return powerballLotteryRandom.indexOf(x) < 0 });
            numbers = powerballNumbers;
        }

        var items = numbers[Math.floor(Math.random() * numbers.length)];

        for (i = 0; i < num; i++) {
            while (powerballArray.indexOf(Math.round(items)) > -1) {
                items = numbers[Math.floor(Math.random() * numbers.length)];
            }
            powerballArray[i] = Math.round(items);
        }

        return powerballArray;
    }

    function generateBoth(){
        var lottoArray = [],
        button = document.getElementById('genLotNum');

        button.addEventListener('click', function(){
            var powerballNum = document.getElementById('powerballNum');
            var lottoNums = document.getElementById('lottoNums');

            if(powerballNum.innerHTML.length > 0){
                powerballNum.innerHTML = '';
            }
            if(lottoNums.innerHTML.length > 0){
                lottoNums.innerHTML = '';
            }

            function generateLottoRandom(){
                powerballLotteryRandom = generatePowerBallNumbers(5, 'pb');
                var array = JSON.parse('[' + powerballLotteryRandom + ']');
                var lh = document.getElementById('lottoHeader');

                if(lh.classList.contains('hidden')){
                    lh.classList.remove('hidden');
                }

                var i, len = array.length;
                for(i = 0; i < len; i++){
                    addAnother(array[i], false);
                }
            }

            function generatePowerball(){
                powerballRandom = generatePowerBallNumbers(1, '');

                var ph = document.getElementById('powerballHeader');
                if(ph.classList.contains('hidden')){
                    ph.classList.remove('hidden');
                }
                addAnother(powerballRandom, true);
            }

            function addAnother(num, isPowerBall) {
                var span = document.createElement('span');
                if(isPowerBall){
                    span.setAttribute('class', 'powerball_number blue');
                    span.appendChild(document.createTextNode(num));
                    powerballNum.appendChild(span);
                } else {
                    lottoArray.push(num);
                    span.setAttribute('class', 'lucky_numbers blue');
                    span.appendChild(document.createTextNode(num));
                    lottoNums.appendChild(span);
                }
            }

            generateLottoRandom();
            generatePowerball();
        });
    }

    function init(){
        generateBoth();
    }

    return {
        init: init
    }

})();
$(jwApp.utils.lotto.init);
