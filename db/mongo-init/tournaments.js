conn = new Mongo();
db = conn.getDB('tournaments');
db.createUser({
  user: 'username',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'tournaments',
    },
  ],
});
