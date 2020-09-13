'use strict';
//Tabela de Agendamentos
module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('appointments', { 
        id:{
          type:Sequelize.INTEGER ,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true,
        },
        date:{
          allowNull:false,
          type:Sequelize.DATE,
        },
        user_id:{
          //Fazendo relacionamento entre a tabela appoitments e users
          type:Sequelize.INTEGER,
          references:{model:'users',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'SET NULL',
          allowNull:true,
        },
        provider_id:{
           //Fazendo relacionamento entre a tabela appoitments e users
          type:Sequelize.INTEGER,
          references:{model:'users',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'SET NULL',
          allowNull:true,
        },
        cancele_at:{
          type:Sequelize.DATE,
          allowNull:true,
        },
        created_at:{
            type:Sequelize.DATE,
            allowNull:false
        },
        updated_at:{
          type:Sequelize.DATE,
          allowNull:false,
        },
      });
     
  },

  down:  (queryInterface) => {
 return queryInterface.dropTable('appointments');

  },
};

