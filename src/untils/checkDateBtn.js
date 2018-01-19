export const checkDateBtn = (btn, btnArr, defaultType, changeType) => {
  if (btnArr[btn] === defaultType) {
    for (let i = 0; i < btnArr.length; i++) {
      btnArr.splice(i, 1, defaultType)
    }
    btnArr.splice(btn, 1, changeType)
  }
}
