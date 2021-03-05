import avatar from './avatar.jpg'
import styles from './avatar.less'

const img = new Image()
img.src= avatar
img.width = 100
img.height = 100
// 有点类似于react的属性私有
img.className= styles.myAvatar

const rootDom = document.getElementById('root')
rootDom.appendChild(img)