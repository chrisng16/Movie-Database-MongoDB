FROM mongo:latest

COPY ./init.sh /docker-entrypoint-initdb.d

RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

RUN cd /tmp && wget https://datasets.imdbws.com/title.basics.tsv.gz
RUN cd /tmp && gzip -d /tmp/title.basics.tsv.gz

RUN cd /tmp && wget https://datasets.imdbws.com/title.principals.tsv.gz
RUN cd /tmp && gzip -d /tmp/title.principals.tsv.gz

RUN cd /tmp && wget https://datasets.imdbws.com/title.ratings.tsv.gz
RUN cd /tmp && gzip -d /tmp/title.ratings.tsv.gz

RUN cd /tmp && wget https://datasets.imdbws.com/title.crew.tsv.gz
RUN cd /tmp && gzip -d /tmp/title.crew.tsv.gz