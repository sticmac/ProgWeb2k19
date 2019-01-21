FROM mongo:latest

VOLUME ["/data/db"]

WORKDIR /data

COPY ./data ./data

CMD ["mongoimport", "--db", "off", "--collection", "vietnam", "--drop", "./data/vietnam.json"]

CMD ["mongod"]

EXPOSE 27017