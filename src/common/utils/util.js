export const showMsg = (that, isClose, msg, type) => {
  that.$message({
    showClose: isClose,
    message: msg,
    type: type
  })
}
