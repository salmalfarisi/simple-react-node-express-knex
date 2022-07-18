/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  var settime = new Date();
  var now = settime.getFullYear() + '-' + settime.getMonth() + '-' + (parseInt(settime.getDate()) + parseInt("3"));
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {id: 1, name: 'testing1', qty:1, picture:'testing1', expiredAt:now, isActive:true},
    {id: 2, name: 'testing2', qty:2, picture:'testing2', expiredAt:now, isActive:true},
    {id: 3, name: 'testing3', qty:3, picture:'testing3', expiredAt:now, isActive:true},
  ]);
};
