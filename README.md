# GULF

js용 task manager로 js, scss compile 같은 다양한 작업들을 자동화하는 도구

설치방법  
`npm install gulp-cli -g`

src 폴더를 만들어 컴파일된 내용들을 관리하자.

package.json에 script 작성 후
'npm add gulp -D' 명령을 실행한다.  
개발용 이므로 -D를 붙였다.

dependencies에 gulp가 추가된다.

최상단 경로로 이동하여
gulpfile.babel.js 를 빈파일로 만든다.

다음의 패키지를 설치한다.
npm i @babel/core @babel/register @babel/preset-env

`npm run dev` 명령을 실행

## task만들기

function을 export 하거나 const하는 것을 task

## task 종류

- pug파일들 -> html로 변경 후 => [다른 폴더]
- scss파일들 -> css로 변경 후 => minified code한 다음= [css] 폴더에 삽입
- 이미지 최적화, js 압축, 파일이동, 브라우져에 출력등 여러가지 task를 한번에 할수도 있다.

### 1. task 만들기

task는 gulpfile.babel.js에서 작성한다.
pug 파일을 html파일로 만들어보자.
gulp pug 플러그인을 사용한다.
`npm i gulp-pug -D`

### 2. Dev Server 만들기

`npm i gulp-webserver -D`
하고 task를 작성하자.
task는 gulpfile.babel.js에서 작성한다.

### 3. watch Server 하기

파일 수정할때마다 자동으로 server에 업데이트 하게하는 작업
task는 gulpfile.babel.js에서 작성한다.

### 4. image처리하기

gulp-image 를 설치한다.
task는 gulpfile.babel.js에서 작성한다.

### 5. sass 전처리기 컴파일하기

npm i sass gulp-sass -D 를 설치한다.
task는 gulpfile.babel.js에서 작성한다.

다음의 코드 추가

```gulpfile.babel.js
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
```

### 6. 구형 웹브라우저 호환성적용

npm i gulp-autoprefixer -D를 설치한다.
task는 gulpfile.babel.js에서 작성한다.

### 7. css 최적화

npm i gulp-csso -D

D:\mirror\dev\MyWeb\Javascript\StudyJS\gulp>npx browserlist

    ╭─────────────────────────────────╮
    │                                 │
    │  You made typo in browserslist  │
    │                                 │

    확인필요

### 8. js 최적화

npm i bro -D
npm i babelify -D
npm i uglifyify -D

### 9. github page 배포

npm i gulp-gh-pages -D
https://smin987.github.io/gulp
