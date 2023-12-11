// import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// const __filename = fileURLToPath(import.meta.url);
const __filenamePath = resolve(process.cwd(), process.argv[1] || process.argv[0]);
const __dirnamePath = dirname(__filenamePath);
export default __dirnamePath;
