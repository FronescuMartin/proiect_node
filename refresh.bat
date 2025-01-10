@echo off
del /f db.sqlite
npx sequelize db:migrate
npx sequelize db:seed:all