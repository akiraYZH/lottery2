let oLottery = document.querySelector('.sqr_lottery');
let oBtn = oLottery.querySelector('.btn');
let aPrizes = ['爱爱', '亲亲', '抱抱', '打打', '锤锤', '哈哈', '摸摸', '嘿嘿'];
let sqrs = document.querySelectorAll('.sqr[id^=_]');

render();

// Click the button
oBtn.addEventListener('click', run);

function run(){
    if(aPrizes.length==0){
        alert('选项已经为空');
        return;
    }
    oBtn.removeEventListener('click', run);
   
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
    let base = 400;
    let changale = 370;
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
                aPrizes = aPrizes.filter((val, index)=>{
                    if(index!=total%8){
                        return true;
                    }
                })
                render()
                sqrs.forEach((val) => {
                    val.classList.remove('active');
                });
                
                oBtn.addEventListener('click', run);
            }

        }, getInterval(--count / total));


}

//Insert prizes
function render() {
    
    sqrs.forEach((div)=>{
        div.innerHTML='';
    })
    console.log(sqrs);
    
    aPrizes.forEach((val, index) => {
        oLottery.querySelector('#_' + index).innerHTML = val;
    })
}