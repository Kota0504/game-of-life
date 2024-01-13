// ----------マスの位置から色を取得する機能----------

// クラス名文字列から色を抽出するヘルパー関数
const extractColorFromClassname = (classname) => {
  const colorPattern = /bg-([a-z]+)-200/; // この正規表現はクラス名で使われている色のフォーマットにマッチする
  const match = classname.match(colorPattern);
  return match ? match[1] : null; // 色に該当する部分を返す、またはマッチしない場合はnullを返す
};

// マスの位置から色を取得する関数
const getSquareColor = (position) => {
  // プレイヤーの位置に対応するIDを持つマスの要素を探す
  const squareElement = document.getElementById(position.toString());
  if (!squareElement) return null; // 要素が見つからなければnullを返す

  // マスのクラス名から色を抽出する
  return extractColorFromClassname(squareElement.className);
};

export { getSquareColor };
