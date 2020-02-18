    module.exports = {
        mysql: {
            host: '127.0.0.1',
            user: 'dbuser',
            password: 'dbpassword',
            database: 'db',
            port: '3306',
            queueLimit: 0,
            connectionLimit: 0,
        },
        SQLpostMap: {
            insert: 'INSERT INTO classroom(id, name) VALUES(NULL,?)',
            update: 'update classroom set name=?',
            delete: 'delete from classroom where id=',
            queryById: 'select * from classroom where id=',
            queryAll: 'select * from classroom',
            queryByName: 'select * from classroom where name like ?'
        },
        SQLuserMap: {
            insert: 'INSERT INTO user(name, password) VALUES(?,?)',
            queryById: 'select * from user where id=?',
            queryByCred: 'select * from user where name=? and password=?',
        },
        SQLpcMap: {
            insert: 'INSERT INTO pc(id, name, room, invet, status) VALUES(NULL, ?, ?, ?, ?)',
            update: 'update classroom set name=?',
            delete: 'delete from classroom where id=',
            queryById: 'select * from classroom where id=',
            queryAll: 'select * from pc',
            queryByName: 'select * from classroom where name like ?'
        }
    };