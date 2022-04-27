// H5端主机名（域名）前缀
let HOST_H5 = 'https://xiaolingdang.net/#/'

if(process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	HOST_H5 = 'xxx.com'
} else {
	console.log('生产环境')
	HOST_H5 = 'ttt.com'
}

export {
	HOST_H5
}