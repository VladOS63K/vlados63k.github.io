import { createHmac } from "node:crypto";

function parseInitData(initData) {
  const q = new URLSearchParams(initData);
  const hash = q.get("hash");
  q.delete("hash");
  const v = Array.from(q.entries());
  v.sort(([aN], [bN]) => aN.localeCompare(bN));
  const data_check_string = v.map(([n, v]) => `${n}=${v}`).join("\n");
  return { hash, data_check_string };
}

function checkSignature(bot_token, initData) {
  const { hash, data_check_string } = parseInitData(initData);
  const secret_key = createHmac("sha256", bot_token).digest();
  const key = createHmac("sha256", secret_key)
    .update(data_check_string)
    .digest("hex");

  return key === hash;
}