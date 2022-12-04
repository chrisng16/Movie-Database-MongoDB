sudo mkdir -p /project/rs1/repl1/data /project/rs2/repl1/data /project/config/config1/data
sudo chown mongodb:mongodb /project

sudo mkdir -p /project/rs1/repl2/data /project/rs2/repl2/data /project/config/config2/data
sudo chown mongodb:mongodb /project

sudo mkdir -p /project/rs1/repl3/data /project/rs2/repl3/data /project/config/config3/data
sudo chown mongodb:mongodb /project

#!/bin/bash
sudo mongos --configdb crs/172.31.10.236:27018,172.31.6.114:27018,172.31.12.113:27018 --bind_ip_all

#n-1 172.31.10.236
#!/bin/bash
sudo mongod --configsvr  --port 27018 --dbpath /project/config/config1/data --replSet crs --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27019 --dbpath /project/rs1/repl1/data --replSet rs1 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27020 --dbpath /project/rs2/repl1/data --replSet rs2 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all

#n-2
#!/bin/bash
sudo mongod --configsvr  --port 27018 --dbpath /project/config/config2/data --replSet crs --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27019 --dbpath /project/rs1/repl2/data --replSet rs1 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27020 --dbpath /project/rs2/repl2/data --replSet rs2 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all

#n-3
#!/bin/bash
sudo mongod --configsvr  --port 27018 --dbpath /project/config/config3/data --replSet crs --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27019 --dbpath /project/rs1/repl3/data --replSet rs1 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all
sudo mongod --shardsvr --port 27020 --dbpath /project/rs2/repl3/data --replSet rs2 --logpath /var/log/mongodb/mongod.log --fork --bind_ip_all

mongosh --port 2701

config = {
  _id: 'crs',
  members: [
    { _id: 0, host: '172.31.10.236:27018' },
    { _id: 1, host: '172.31.6.114:27018' },
    { _id: 2, host: '172.31.12.113:27018' }
  ]
}

config = {
  _id: 'rs1',
  members: [
    { _id: 0, host: '172.31.10.236:27019' },
    { _id: 1, host: '172.31.6.114:27019' },
    { _id: 2, host: '172.31.12.113:27019' }
  ]
}

config = {
  _id: 'rs2',
  members: [
    { _id: 0, host: '172.31.10.236:27020' },
    { _id: 1, host: '172.31.6.114:27020' },
    { _id: 2, host: '172.31.12.113:27020' }
  ]
}

rs.initiate(config)

sh.addShard("rs1/172.31.10.236:27019,172.31.6.114:27019,172.31.12.113:27019")
sh.addShard("rs2/172.31.10.236:27020,172.31.6.114:27020,172.31.12.113:27020")
