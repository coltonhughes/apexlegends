<h1 align="center">Welcome to @cheem/apexlegends 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@cheem/apexlegends" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@cheem/apexlegends.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D8.11.0-blue.svg" />
  <img src="https://img.shields.io/node/v/@cheem/apexlegends" />
  <a href="https://github.com/coltonhughes/apexlegends#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/coltonhughes/apexlegends/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Apex Legends API Wrapper for https://apexlegendsstatus.com

### 🏠 [Homepage](https://github.com/coltonhughes/apexlegends)

## Prerequisites

- npm >=8.11.0
- node >=18.2.0

## Install

```sh
npm install
```

## Example

```sh
import {ApexStat} from "@cheem/apexlegends";

async function getStats(): Promise<ApexStat> {
  const client = new Client(<API_KEY>);
  const stats = await client.getUserStats(<APEX_USERNAME>);
  console.log(JSON.stringify(stats));
}
```

## Author

👤 **Colton Hughes**

- Github: [@coltonhughes](https://github.com/coltonhughes)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/coltonhughes/apexlegends/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Colton Hughes](https://github.com/coltonhughes).<br />
This project is [MIT](https://github.com/coltonhughes/apexlegends/blob/master/LICENSE) licensed.

---
