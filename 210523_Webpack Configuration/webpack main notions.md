- [Webpack 의 주요 속성](#webpack-의-주요-속성)
- [entry 와 output](#entry-와-output)
- [Webpack 을 실행할 때 필수 3 가지 옵션](#webpack-을-실행할-때-필수-3-가지-옵션)
  - [mode](#mode)
  - [entry](#entry)
- [실습해보기](#실습해보기)
- [loader](#loader)
  - [loader의 동작 원리](#loader의-동작-원리)
  - [css-loader](#css-loader)
  - [style-loader](#style-loader)

## Webpack 의 주요 속성

1. **entry**
   > Webpack 에서 웹 자원을 변환하는데 필요한 진입점 & **js 파일 경로**
  
   * 엔트리를 통해서 필요한 모듈들을 로딩하고, 하나의 파일로 묶는 과정 진행

2. **ouput**
    > Webpack 을 돌리고 난 **결과물의 파일 경로**

3. **loader**
    > Webpack 이 웹 앱을 해석할 때 js 파일을 **HTML, CSS, IMG, 폰트 등을 변환할 수 있도록 도와줌**

4. **plugin**
    > Webpack 의 기본적인 동작에 **추가적인 기능을 제공**

## entry 와 output

![webpack](https://media.vlpt.us/images/mnz/post/5b44dd44-ab02-4614-85e9-000dd3019078/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-05-02%20160001.png)

```
Webpack 은 js, img 파일 등은 모두 모듈로 인식합니다.
```

그러므로 JS 코드와 import 구문을 사용하여 image 와 css 파일을 가져올 수 있습니다.

왼쪽은 entry, 오른쪽은 webpack 으로 컴파일된 결과물 입니다.

## Webpack 을 실행할 때 필수 3 가지 옵션

패키지를 설치한 후 아래 명령어를 실행하면 사용 가능한 옵션과 사용 방법에 관해 확인할 수 있습니다.

``` bash
    node_modules/.bin/webpack --help
```

### mode

> mode 옵션은 웹팩에 내장된 최적화 방법중 어느 것을 사용할지 웹팩에게 알려주는 역할을 합니다.

``` js
    module.exports = {
        mode: 'production' | 'development' | 'none'
    }
```

* **production** :: DefinePlugin 의 `process.env.Node_ENV` 를 `production` 으로 설정합니다.
* **development** :: DefinePlugin 의 `process.env.Node_ENV` 를 `development` 로 설정합니다.
* **none** :: 기본 최적화 옵션으로 설정합니다.

> mode 에 따라 웹팩 설정을 다르게 실행하고 싶다면 객체 대신 함수를 반환해야합니다.

``` js
    const config = {
        entry = './app.js'
    }

    module.exports = (env, arg) => {
        if (argv.mode === 'development') {
            config.entry = './dev/app.js'
        }
        if (argv.mode === 'production') {
        }
        if (argv.mode === 'none') {
        }
    }
```

### entry

> entry 옵션은 앱 번들링을 시작할 지점을 의미합니다. 배열을 값으로 전달하면, 배열에 담긴 모든 요소가 번들링됩니다.

HTML 페이지마다 하나의 포인트를 가집니다. SPA (Single Page Application) 는 하나의 포인트를 가지게 되고, MAP(Multi Page Application) 은 페이지별로 하나의 포인트를 가지게 됩니다.

``` js
    module.exports = {
        // SPA
        entry: './index.js'
        
        // MPA
        entry: {
            main: './main.js',
            contact: './contact.js'
        }
    }
```

아래와 같은 SPA 의 `index.js` 코드가 있다면 `index.js` 파일에서 다른 js 파일도 불려져 사용되고 있어서 웹팩을 실행하면 해당 파일들의 내용까지 해석하여 파일을 빌드해줄 것 입니다.

``` js
    import LoginView from './LoginView.js'
    import HomeView from './HomeView.js'
    import PostView from './PostView.js'

    function initApp () {
        LoginView.init()
        HomeView.init()
        PostView.init()
    }

    initApp()
```

<img src="https://joshua1988.github.io/webpack-guide/assets/img/webpack-entry.90e26197.png" width=500>


**위와 같이 모듈 간의 의존 관계가 생기는 구조를 디펜던시 그래프(Dependency Graph)라고 합니다.**

## 실습해보기

``` bash
    node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path ./dist/main.js 
```

`mode` 는 `development`,  `entry` 는 `./src/app.js`, `output` 경로는 `./dist/main.js` 로 설정되었습니다.

또는, `webpack.config.js` 파일을 이용하여 설정할 수도 있습니다.

``` js
    const path = require('path')

    module.exports = {
        mode: 'development',
        entry: {
            main: './src/app.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve('./dist')
        }
    }
```

그리고 명령어를 통하여 쉽게 build 하기 위해선, `package.json` 의 scripts 코드를 수정합니다.

``` json
    {
        "name": "test",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^5.37.1",
            "webpack-cli": "^4.7.0"
        }
    }
```

이제 명령어로 파일을 빌드할 수 있습니다.

``` bash
    npm run build
```

## loader

module 을 사용할 수 있게 해주는 loader는, TS 같은 다른 언어를 JS 문법으로 변환해주거나 이미지를 data URL 형식의 문자열로 변환합니다. CSS 파일을 JS 에서 직접 로딩할 수도 있습니다.

### loader의 동작 원리

``` js
    // myloader.js
    module.exports = function myloader (content) {
        console.log('myloader is working...')
        return content
    }
``` 

``` js
    // webpack.config.js
    const path = require('path')

    module.exports = {
        mode: 'development',
        entry: {
            main: './src/app.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve('./dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // js. 확장자로 끝나는 모든 파일
                    use: [path.resolve('./myloader.js')] // loader 적용
                }
            ]
        }
    }
```

`test` 에는 로딩에 적용할 파일을 지정합니다. 파일명 뿐 아니라 패턴을 정규 표현식으로 지정할 수 있습니다.

`use` 에는 이 패턴에 해당하는 파일에 적용할 로더를 설정합니다.

build 명령어를 이용하여 빌드를 할 경우, 로그가 찍히는 것을 확인할 수 있습니다.

결과가 두번 실행되는 이유는, **.js 확장자를 갖는 모든 파일을 처리하겠다고 설정했으므로** `app.js`, `math.js` 모두를 실행했기 때문입니다.

``` bash
    myloader가 동작함
    myloader가 동작함
    asset main.js 4.1 KiB [compared for emit] (name: main)
    runtime modules 670 bytes 3 modules
    cacheable modules 110 bytes
    ./src/app.js 61 bytes [built] [code generated]
    ./src/math.js 49 bytes [built] [code generated]
    webpack 5.36.2 compiled successfully in 103 ms
```

### css-loader

자주 사용하는 loader 중 하나인 css-loader 를 알아보겠습니다. `src` 파일 안에, `style.css` 파일을 생성하고, 아래 명령어를 실행하여 css-loader 를 설치합니다. 그리고 webpack config 파일을 변경합니다.

``` bash
    npm install -D css-loader
```

``` js
    // webpack.config.js
    const path = require('path')

    module.exports = {
        // ...
        module: {
            rules: [
                {
                    test: /\.css$/, // css. 확장자로 끝나는 모든 파일
                    use: ['css-loader'] // css-loader 적용
                }
            ]
        }
    }
```

### style-loader

css-loader 로 처리하면 자바스크립트 코드로만 변경되었을 뿐 돔에 적용되지 않았기 때문에 스타일이 적용되지 않은 상태입니다.

style-loader 는 **JS 로 변경된 스타일을 동적으로 DOM에 추가**하는 로더입니다. CSS 를 번들링 하기 위해 css-loader 와 style-loader 를 함께 사용합니다.

``` bash
    npm install -D style-loader
```

``` js
    // webpack.config.js

    const path = require('path')

    module.exports = {
        // ...
        module: {
            rules: [
                {
                    test: /\.css$/, // css. 확장자로 끝나는 모든 파일
                    use: ['css-loader', 'style-loader'] // css-loader, style-loader 적용
                }
            ]
        }
    }
```

출처 :: [velog.io/@mnz](https://velog.io/@mnz/Webpack-%EC%9B%B9%ED%8C%A9-%EA%B0%9C%EB%85%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)