const sqlite3 = require('sqlite3')
// o  { open } esta dizendo que não é pra importar o sqlite inteiro mas somente a funcionalidade open
const { open } = require('sqlite')


module.exports = () => {
open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});
};



