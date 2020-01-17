let oLottery = document.querySelector('.sqr_lottery');
let oBtn = oLottery.querySelector('.btn');
let aPrizes = ['爱爱', '亲亲', '抱抱', '打打', '锤锤', '哈哈'];

//Insert prizes
aPrizes.forEach((val, index) => {
    oLottery.querySelector('#_' + index).innerHTML = val;
})

// Click the button
oBtn.addEventListener('click', run);

function run(){
    oBtn.removeEventListener('click', run);
    aPrizes.forEach((val, index) => {
        oLottery.querySelector('#_' + index).classList.remove('active');
    });
    oLottery.querySelector('#_0').classList.add('active');
    let bingo = rdm(0, aPrizes.length - 1);
    let count = total = 8 * 10 + bingo;
    _switch(count, total);
}

//Generate a random number between min and max
function rdm(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}



//Use sin() curve to calculate interval of setInterval
function getInterval(t) {
    let y = Math.round(Math.sin(Math.PI * t) * 100) / 100;
    let base = 300;
    let changale = 270;
    // console.log(y);

    return base - y * changale;

}



// switch one to another
function _switch(count, total, now_index = 0, last_index = 0) {
        
        setTimeout(() => {
            console.log(count);
            if (count >= 0) {
                
                
                oLottery.querySelector('#_' + last_index % 8).classList.remove('active');
                now_index++;
                oLottery.querySelector('#_' + now_index % 8).classList.add('active');
                last_index = now_index;
                _switch(count, total, now_index, last_index);
                
                
            }else{
                
                alert('恭喜你,你中了 ' + aPrizes[total%8] + '!');
                oBtn.addEventListener('click', run);
            }

        }, getInterval(--count / total));


}