const express = require('express');
const morgan = require('morgan');
const app = express();
const compression = require('compression');
const jwt = require('jsonwebtoken');
const ACLT = require('./helpers/AccessControl');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVWd3dWRpa2UiLCJ1c2VyVHlwZSI6ImFkbWluIiwicm9sZXMiOnsiaW52b2ljZSI6WyJyZWFkIiwiY3JlYXRlIiwiZGVsZXRlIiwidXBkYXRlIl0sInF1b3RlIjpbInJlYWQiLCJ1cGRhdGUiXSwidXNlckFjY291bnQiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdfX0sImlhdCI6MTQ5Nzc5NzM4NiwiZXhwIjoxNDk3Nzk5MTg2LCJhdWQiOiJCcml0dGFuaWEtVSBBcHAiLCJpc3MiOiJCcml0dGFuaWEtVSJ9.s9tonWT30cTPaTSHhwjUPbVZQL92xybEWVpYeYJo38o';
let permissions = {
        invoice: ["read", "create", "delete", "update"],
        quote: ["read", "update"],
        userAccount: ["read", "create", "update"]
      }

console.log(new ACLT.AccessControl(permissions).can('userAccount:create'));

app.use(morgan('tiny'));
app.use(compression());
app.get('/', (req, res) => {
  let token = jwt.sign({
    data: {
      username: 'Ugwudike',
      userType: 'admin',
      permissions: {
        invoice: ["read", "create", "delete", "update"],
        quote: ["read", "update"],
        userAccount: ["read", "create", "update"]
      }
    }}, 'xperience', 
      { expiresIn: '30m',
        audience: 'Brittania-U App',
        issuer: 'Brittania-U'
    }
    );

  // var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVWd3dWRpa2UiLCJ1c2VyVHlwZSI6ImFkbWluIn0sImlhdCI6MTQ5NzcyMjYwMCwiZXhwIjoxNDk3ODA5MDAwfQ.fWRlHAT4n8H-0gpWVK6Q8c7QmToExBDLrRobugHOj-s', 
  //   'xperience', (err, decoded) => {
  //   if (err) res.send(err);
  //   res.send(decoded);
  // })
  res.send(token);
})
app.listen(3000, () => {
  console.log("I'm listening on port 3000");
});