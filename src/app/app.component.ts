import { Component } from '@angular/core';

const doSomething = (step = 100, result: boolean = true) => {
  return new Promise<string>((resolve, reject) => {
    if (result) {
      setTimeout(() => {
        resolve(`do something complete: step: ${step}`);
      }, 300)
    } else {
      reject('fail to do')
    }
  });
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = '';
  check = false;

  doPromise() {
    this.content = '';
    this.append('----------------using nomal promise-----------------');
    this.append('start');
    doSomething()
      .then(x => {

        // x ở đây chính là kết quả reosolve trong hàm doSomething()
        console.log(x)
        this.append(x);
        return doSomething(2);
      })
      .then(x => {
        this.append(x)
        return doSomething(3);
      })
      .then(x => {
        this.append(x)
        this.append('after complete');
        this.check = true;
        console.log(this.check)
      });
      
    this.append('end');

    this.append('------------------------------------------');
  }

  async doAsyncAwait() {
    this.content = '';
    // this.append('this will show before complete');
    this.append('----------------using async await-----------------');
    this.append('before')
    // async await is a sugar for promise
    // and that can make the async method run sync
    const result = await doSomething();
    this.append(result)
    const result2 = await doSomething(2);
    this.append(result2)
    const result3 = await doSomething(3);
    this.append(result3)

    this.append('after complete')
    this.append('------------------------------------------');
  }

  append(content: string) {
    this.content += `${content}<br>`;
    console.log(content);
  }

}

