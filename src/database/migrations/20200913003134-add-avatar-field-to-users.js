'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    //Fazendo relacionamentos entre a tabela users e files
    //Adicionando uma coluna na tabela users
    return queryInterface.addColumn( 'users','avatar_id',
      {
        type:Sequelize.INTEGER,
        references:{model:'files',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:true,
      }
      )
  },
  down:  (queryInterface) => {
    return queryInterface.removeColumn('users','avatar_id');
  }
};
