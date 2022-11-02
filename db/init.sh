#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --db imdb --collection basics --type tsv /tmp/title.basics.tsv --headerline -u mern -p merndocker --host=localhost:27017 --authenticationDatabase=admin
mongoimport --db imdb --collection principals --type tsv /tmp/title.principals.tsv --headerline -u mern -p merndocker --host=localhost:27017 --authenticationDatabase=admin
mongoimport --db imdb --collection ratings --type tsv /tmp/title.ratings.tsv --headerline -u mern -p merndocker --host=localhost:27017 --authenticationDatabase=admin
mongoimport --db imdb --collection crew --type tsv /tmp/title.crew.tsv --headerline -u mern -p merndocker --host=localhost:27017 --authenticationDatabase=admin