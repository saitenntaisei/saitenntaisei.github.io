let count = 0
const countUp = () => {
  count++
  viewcounter();
}

const reset=()=>{
  count=0;
  viewcounter();
}

function viewcount () {
  const countElement = document.querySelector('#count')
  countElement.innerText = '回数: ' + count
}