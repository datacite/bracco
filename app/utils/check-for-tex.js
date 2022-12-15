export default function checkForTex(text, hash) {
  let ret = false;

  if (text && text.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
    ret = true;
  }

  return ret;
}
