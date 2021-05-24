let count = 0
const countUp = () => {
  count++
  viewcounter();
  //const countElement = document.querySelector('#count')
  //countElement.innerText = '回数: ' + count
}

const reset=()=>{
  count=0;
  viewcounter();
  //const countElement = document.querySelector('#count')
  //countElement.innerText = '回数: ' + count
}

function viewcount () {
  const countElement = document.querySelector('#count')
  countElement.innerText = '回数: ' + count
}