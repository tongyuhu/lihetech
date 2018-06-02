/**
 * 打印页面数据
 * @param {String} content
 * @param {*} w
 * @param {*} h
 */
export function print (content, w = null, h = null) {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  w = +w === 0 ? width : w
  h = +h === 0 ? height : h
  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  var myWindow = window.open('', '打印', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
  var style = "<style type='text/css'>.title{ font-size: 24px; text-align: center; padding-top: 66px; padding-bottom: 30px; } .title h1{ margin-bottom: 5px; } .print{ padding-bottom: 30px;position: relative; } .bottom-boder{ border-bottom: 1px solid #eaeaea; } .diagnos{ margin-top:20px; padding-left: 20px; } .diagnos p{ margin-bottom: 20px; } .cardnum{ padding-bottom: 20px; padding-left: 20px; } .print-footer{ position: absolute;bottom: 5px;right: 150px; } .base-info{ padding-top: 20px; padding-bottom: 20px; padding-left: 20px; } .base-info span{ display: inline-block; width: 18%; } .info-card{ padding-bottom: 20px; padding-left: 20px; } .info-card span{ display: inline-block; width: 40%; }</style>"
  myWindow.document.write(content + style)
  myWindow.focus()
  myWindow.document.close()     // 关闭document的输出流, 显示选定的数据
  myWindow.print()   // 打印当前窗口
  return myWindow
}
