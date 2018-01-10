export default function entries(obj) {
  if (Object.entries) {
    return Object.entries(obj)
  }
  const ownProps = Object.keys(obj)
  let i = ownProps.length
  let resArray = new Array(i)
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]
  return resArray
}
