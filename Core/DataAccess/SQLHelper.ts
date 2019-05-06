

export class SQLHelper {

    public static async query() {
        const sql = require('mssql')
        await sql.connect('mssql://user:password@dbserver/database')
        const result = await sql.query`select top 1 * from [user]`
        result
        console.dir(result)
    }

}