const sqlite3 = require('sqlite3')
// o  { open } esta dizendo que não é pra importar o sqlite inteiro mas somente a funcionalidade open
const { open } = require('sqlite')


module.exports = () => open({
    filename: 'maratona-discover-02-1.0.0/src/database.sqlite',
    driver: sqlite3.Database,
});



