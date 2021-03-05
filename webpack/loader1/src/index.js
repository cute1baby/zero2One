import avatar from './avatar.jpg'
import './index.less'

const img = new Image()
img.src= avatar
img.width = 100
img.height = 100
img.className= "myAvatar"

document.body.appendChild(img)