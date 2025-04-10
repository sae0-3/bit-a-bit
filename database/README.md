* Hacer correr el contenedor
```hs
docker compose up -d
```

* Dar de baja el contenedor
```hs
docker compose down
```

* Ejecutar la terminal interactiva del contenedor
```hs
docker exec -it db-questeditor psql -U postgres
```
