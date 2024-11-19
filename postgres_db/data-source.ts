import { DataSource } from "typeorm";

import { dataSourceOptions } from "./dataSourceOptions";

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
