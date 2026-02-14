import { promises as fs } from "fs";
import path from "path";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/jpeg";

export default async function Icon() {
  const file = await fs.readFile(
    path.join(process.cwd(), "public/images/me.jpg"),
  );
  return file;
}
