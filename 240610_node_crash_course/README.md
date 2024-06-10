# 메모

## Node JS란?
> Node 는 서버에서 동작하는 Javascript 코드이다. (Node.js 는 언어가 아님)
> V8 엔진을 기반으로 Chrome 대신 Node 위에서 돌아가는 코드 (추가 설명 필요)
> [What is Node.js?](https://learning.oreilly.com/videos/the-complete-node-js/9781789955071/9781789955071-video2_3/)


### Node 실행시키기
> node 를 실행시키기 위해서는 터미널에서 `node` 를 입력하여 node.js를 실행시킨다.
> 브라우저의 개발자도구에서 V8 엔진이 동작하는 방식과 똑같지만, 
``` bash
  $ node

  $ process.exit() # node 종료
```

| 대상       | Chrome | Node | 설명                  |
|----------|--------|------|---------------------|
| window   | O      | X    |                     |
| document | O      | X    | Node 는 Dom이 존재하지 않음 |
| process  | X      | O    |                     |

## Non-Blocking I/O
> I/O 란?
> ---
> **Non-Blocking** \
> 응답을 기다리지 않고 작업을 병렬적으로 진행할 수 있는 작업 (비동기 방식)

