# BackEnd-Ax-Sports

Proyecto personal para el desarrollo de una plataforma enfocada a las academias de tiro con arco

## Creador

Deyvis Jhoswa Samanez Ccoscco

## Comandos

Para iniciar la base de datos primero necesitamos inicias cocker compose con el siguiente comando.
```bash
docker-compose up
```

Luego de eso necesitamos crear la imagen y eso lo hacemos con el siguiente comando.
```bash
docker build --no-cache --progress=plain -t api-node-ts .
```

Luego de eso corremos la imagen creada con el siguiente comando.
```bash
docker run -it -p 8000:8000 api-node-ts
```

## LISTA DE PERMISOS

|  ENTIDADES       |         Super        |       Docente       |     Estudiante      |     Responsable     |  
|------------------|----------------------|---------------------|---------------------|---------------------|
|  Administrador   |  L B C E D           | P EP-T              |                     |                     |
|  Distancia       |  L B C E D           | L B C E             | L                   | L                   |
|  Estudiante      |  L B C E D           | L B C E             | P EP                | LE                  |
|  Evento          |  L B C E D           | L B C E             | L                   |                     |
|  Horario         |  L B C E D           | L B C E             | L                   | L                   |
|  Inscripcion     |  L B C E D           |                     | DESARROLLO          | DESARROLLO          |
|  Pago            |  L B C E D           |                     | L B C E             | L B C E             |
|  Puntaje         |  L B C E D           | L B C E             | L B C E             |                     |
|  Responsable     |  L B C E D           | L B C E             | LR                  | E EP                |
|  Sede            |  L B C E D           | L B C E D           |                     |                     |
|  Tipo            |  L B C E D           |                     |                     |                     |

### LEYENDA

* L       -  Listar
* B       -  Buscar por Id
* C       -  Crear 
* E       -  Editar/Actualizar
* D       -  Eliminar
* P       -  Perfil
* EP-T    -  Editar/Actualizar perfil(para administradores sin cambiar el tipo)
* EP      -  Editar
* LE      -  Listar estudiantes(solo para responsables que tengan estudiantes asigandos)
* LR      -  Listar responsable(solo para estudiantes que tengan un responsble asignado)


