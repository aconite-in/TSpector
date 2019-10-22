
export class SQLHelper {

    public static async query(columnName: string, tableName: string, where: string) {
        const sql = require("mssql");
        await sql.connect("mssql://user:password@dbserver/database");
        const result = await sql.query(`select top 1 ${columnName} from ${tableName} where ${where}`);
        return Object.values(result.recordset[0]).toString();
    }

}
