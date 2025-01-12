@echo off
if exist db.sqlite del /f db.sqlite
npx sequelize db:migrate && npx sequelize db:seed:all