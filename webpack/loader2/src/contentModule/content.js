import styles from './content.less'
// function contentModule(){
//     const pDom = document.createElement('p')
//     pDom.innerHTML = '这是我写的一点点内容111...<span class="iconfont">&#xe603;</span>'

//     const spanDom = document.createElement('span')
//     spanDom.innerHTML = 1
//     pDom.appendChild(spanDom)

//     pDom.className = styles.pDom
//     document.body.appendChild(pDom)

//     pDom.onclick = function(){
//         spanDom.innerHTML = parseInt(spanDom.innerHTML, 10) + 1
//     }
// }

// export default contentModule



function counter() {
	var div = document.createElement('div');
	div.setAttribute('id', 'counter');
	div.innerHTML = 1;
	div.onclick = function() {
		div.innerHTML = parseInt(div.innerHTML, 10) + 10
	}
	document.body.appendChild(div);
}

export default counter;