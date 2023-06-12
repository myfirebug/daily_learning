export default function (list) {
  if (list instanceof Array) {
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]());
    }
  }
}
