
function createNumber(){
    const pDom = document.createElement('p')
    pDom.setAttribute('id', 'pDom')
    pDom.innerHTML = 102
    document.body.appendChild(pDom)
}

export default createNumber