# Angular: Haciendo el deployment en el IIS

## ¿Cómo hacemos un Build y posterior Deploy de nuestro sitio de Angular?

Hasta ahora hemos trabajado simplemente con un sitio, que para ser probado localmente, utilizaba un lite-server, un servidor liviano que funcionaba correctamente durante el desarrollo. Lo que queremos hacer es tomar el contenido y moverlo a otro servidor más robusto para que pueda ser visto externamente, a través de una red como una LAN o Internet. 

Para ello, como ya sabemos evidentemente es necesario transpirar todos nuestros TS a JS, y moverlos para el servidor que vamos a usar (IIS).

Hay un montón de herramientas que nos permiten lograr esto:

- gulp
- grunt
- webpack (https://github.com/webpack/webpack)
- angular-cli (https://github.com/angular/angular-cli)

Ver los tutoriales existentes para cada una aquí:

https://stackoverflow.com/questions/37631098/how-to-bundle-an-angular-app-for-production

Básicamente, todos ellos tienen en común que se comportan como ‘bundlers’. Estos tienen como objetivo empaquetar (armar un bundle), de todos nuestros archivos ```.js```, ```.css```, etc para que puedan ser usados en el navegador, adems de poder ser capaz de empaquetar, y transformar cualquier otro recurso o asset a servir. Además, se realizan otras tareas como la minificación del contenido. 

En otras palabras, estas herramientas comprimirán todo nuestro código en un archivo ```.js``` minificado.

Particularmente, el equipo de Angular encontró que hay una enormidad de tareas repetitivas que se llevaban a cabo en el desarrollo de una app usando su tecnología, por lo que se enfocaron en sacar una herramienta que eliminara la fricción de tener que estar utilizando un montón de herramientas por separado. Esto les llevó a sacar Angular CLI.

Angular CLI, es una herramienta muy potente que permite, a través de una interfaz de consola, hacer tareas como:

* crear una nueva app de Angular
* correr un servidor de desarrollo liviano para poder ver nuestra aplicación a medida que vamos desarrollando
* agregar features y ver los cambios automáticamente (sync watcher)
* correr unit tests  o E2E tests automáticamente en nuestra app
* compilar nuestra aplicación para que esté pronta para el deployment en producción

Ver más aquí:

https://www.sitepoint.com/ultimate-angular-cli-reference/

Esta herramienta se basa en Node y NPM, por lo que precisamos tenerlos instalados.

Lo que queremos hacer entonces, es usar ```angular-cli``` para armar nuestro build de nuestra app, y poder hacer el deploy más tarde en el IIS. Para ello usaremos el comando ```ng build``` (todos los comandos de angular-cli arrancan con ```ng```).

Cada vez que lo corremos, lo que pasa detrás de las escenas es:

* Angular CLI carga toda su configuración desde  .angular-cli.json
* Angular CLI corre Webpack para hacer el bundle y empaquetar todo el código   JavaScript y CSS.
* El resultado es guardado en un directorio (parámetro outDir) especificado en la configuración de Angular CLI. Por defecto, este directorio se llama dist.

A su vez, tenemos varias opciones para correr nuestro comando:

--aot: habilita la compilación ‘ahead-of-time’
--base-href: string, es el base href a usar en el index.html
--output-path: string, directorio a escribir 
--target: string, default es development, ambiente a usar 
--watch: boolean, default false, mira los archivos en caso de que haya cambios y hace un rebuild al detectarlos

## Usando Angular CLI

Si buscamos cómo usarlo, vemos que estamos con un problema: 

```ng build``` no funciona con un proyecto que ya fue creado previamente SIN Angular CLI (como el que hemos venido trabajando). Esto se da porque este proyecto no tiene la información y archivos de configuración necesarios para que angular-cli funcione de forma apropiada. 

Como nota aparte, antes podíamos usar angular-cli de forma sencilla sobre un proyecto existente, a través de un comando llamado ```ng init```, pero ahora dicho comando ahora está deprecated, si lo usáramos obtendríamos un error: “The specified command init is invalid. For available options, see ng help”.

Ver aquí: 

https://github.com/angular/angular-cli/issues/5176
https://github.com/angular/angular-cli/issues/755

Entonces, lo que tenemos que hacer es crear un nuevo proyecto en angular-cli y reemplazar todo nuestra lógica (dentro de src), en dicho nuevo proyecto.

### 1. Correr el siguiente comando para instalar angular/cli:

```npm install -g @angular/cli```

### 2. Crear una nuevo proyecto en angular-cli:

```ng new nueva-carpeta-de-proyecto```

### 3. Entrar a dicha carpeta:

```cd nueva-carpeta-de-proyecto```

### 4. Correr el proyecto con ng serve (el proyecto se corre en localhost:4200)

```ng serve```

### 5. Copiamos la carpeta /src.

Lo que haremos será copiar la carpeta ```/src``` de nuestro antiguo proyecto y reemplazamos el ```/src``` del proyecto que acabamos de crear.

### 6. Volver a correr ```ng serve``` y ver qué sucede

### 7. Si faltan dependencias, como bootstrap y rxjs debemos instalarlos:

```npm install rxjs --save 
npm install bootstrap@3 --save```

### 8. Si teníamos estilos referenciados en el index.html (con tags <link>), los llevamos al styles.css:

En styles.css, copiamos y pegamos

```
/* You can add global styles to this file, and also import other style files */
@import '~bootstrap/dist/css/bootstrap.css';
```

### 9. Assets

Si teníamos otros assets que queríamos servir, como imágenes, iconos, etc, debemos ponerlo en la configuración .angular-cli.json. Particularmente nosotros queremos que nuestra api falsa que usábamos para obtener las mascotas también sea servida por el servidor (test-api.json). En consecuencia lo que hacemos es :

Ir al ```.angular-cli.json``` y en el array de assets agregar:

```
  "assets": [
        "assets",
        "favicon.ico",
        "test-api.json"
      ], ...
```    
      
### 10. Vemos que pasa si corremos ng serve

### 11. Hacemos ng build

Vemos que se generó la carpeta dist

### 13. Hacemos el deploy en el IIS

Copiamos la carpeta dist, y la llevamos al servidor en el que queramos hacer el deploy de nuestro sitio (particularmente usaremos IIS).





