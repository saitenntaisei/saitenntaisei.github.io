let count = 0
const countUp = () => {
  count++
  viewcount()
 
}

const reset=()=>{
  count=0
  viewcount()
  
}

function viewcount () {
  const countElement = document.querySelector('#count')
  countElement.innerText = '回数: ' + count
}