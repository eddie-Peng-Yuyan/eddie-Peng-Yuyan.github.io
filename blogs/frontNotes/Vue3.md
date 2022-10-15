---
title: Vue3
date: 2022-10-03
sidebar: auto
---

# Vue3学习笔记 学会了就是自己的

## 1. Vue3的新特性

### 1.1 Composition API
* Composition API也就是steup函数，可以替换之前所编写的大部分其他选项，可以直接写在script标签里面这是setup的语法糖。
```js
<script setup lang="ts">
    
</script>
```
### 1.2 Reactive API
* 如果想为在setup中定义的数据提供响应式的特性，可以使用reactive函数。
```js
<script setup>
    //首先需要从vue中按需导出reactive函数
    import { reactive } from 'vue'
    const state = reactive({
        name: 'Eddie',
        age: 18
    });
</script>
```
### 1.3 Ref API
* Reactive API对传入对类型是有限制的，它要求我们必须传入一个对象或者数组类型，如果传入一个基本数据类型就会报警告，这时候我们就可以使用Ref API来解决这个问题。
* ref会返回一个可变的响应式对象，我们可以通过.value来获取它的值。
```js
<script setup>
    import { ref } from 'vue'
    const message = ref('Hello World');
</script>
```
* 有一点是需要注意的在template模板中使用ref的值时，Vue会自动帮我们进行解包操作，所以我们不需要再使用.value来获取它的值。
但是在steup函数内部，它依然是个ref引用，所以对其进行操作时，我们需要使用.value来获取它的值。
### 1.4 Readonly API
* 如果我们想要一个只读的响应式对象，可以使用readonly函数。
* readonly函数会返回一个只读的响应式对象，我们不能对它进行修改，但是可以对它的属性进行修改。
* 应用场景常见的就是组件传值，我们可以使用readonly函数来防止组件内部对传入的值进行修改。
```js
<script setup>
    import { readonly } from 'vue'
    //1.传入一个普通对象
    const info ={
        name: 'Eddie',
        age: 18
    };
    //此时state对象是不允许被修改的，但是当info对象被修改时，state对象也会跟着被修改
    const state = readonly(info);
    // 2.传入一个reactive对象
    const info2 = reactive({
        name: 'Eddie',
        age: 18
    });
    const state2 = readonly(info2);
    // 3.传入一个ref对象
    const info3 = ref('Eddie');
    const state3 = readonly(info3);
</script>
```
* 其实本质上就是readonly返回的对象被setter方法劫持了而已。
### 1.5 ToRefs API
* 如果我们使用ES6的解构语法，对reactive返回的对象进行解构，那么解构出来的对象就不是响应式的了。
```js
<script setup>
    import { reactive } from 'vue'
    const state = reactive({
        name: 'Eddie',
        age: 18
    });
    //此时name和age就不是响应式的了
    const { name, age } = state;
```
* 这时候我们就可以使用toRefs函数来解决这个问题。
```js
    //此时name和age就是响应式的了
    const { name, age } = toRefs(state);
```
* toRefs函数会返回一个对象，这个对象的每个属性都是一个ref对象，我们可以通过.value来获取它的值。

### 1.6 ToRef API 
* 如果我们想要将一个响应式对象的某个属性转换为ref对象，可以使用toRef函数。
```js
    //此时name就是一个ref对象，我们可以通过.value来获取它的值
    const name = toRef(state, 'name');
```
## 2. computed API
* 在steup语法糖中如何使用computed API
  * 方式一：接收一个getter函数，并为getter函数返回的值创建一个不变的ref对象。
  * 方式二：接收一个getter函数和一个setter函数，并为getter函数返回的值创建一个可变(可读写)的ref对象。
```js
<script setup>
    import { ref, computed } from 'vue'
    const count = ref(0);
    //方式一
    const double = computed(() => count.value * 2);
    //方式二
    const double2 = computed({
        get: () => count.value * 2,
        set: (val) => {
            count.value = val / 2;
        }
    });
</script>
```
## 3. watch API
* 在steup语法糖中可以使用watch和watchEffect来完成响应式数据的侦听。
  * watchEffect用于自动收集依赖，当依赖发生变化时，会自动执行回调函数。
  * watch用于手动收集依赖，当依赖发生变化时，会自动执行回调函数。
### 3.1 watch的使用
* 侦听单个数据源有两种类型
  * 一个getter函数：但是该getter函数必须引用可响应式的对象比如ref对象、reactive对象、computed对象等。
  * 直接写入一个可响应式的对象，比如ref对象、reactive对象、computed对象等。
* 第一种方式
```js
<script setup>
    import { reactive, watch } from 'vue'
    const state = reactive({
        name: 'Eddie',
        age: 18
    });
    watch(() => state.name, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });
    const changeName = () => {
        state.name = '彭于晏';
    };
</script>
```
* 第二种方式
```js
<script setup>
    import { ref, watch } from 'vue'
    const name = ref('Eddie');
    watch(name, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });
    const changeName = () => {
        name.value = '彭于晏';
    };
</script>
```
### 3.2 侦听多个数据源
```js
<script setup>
    import { ref, watch } from 'vue'
    const name = ref('Eddie');
    const age = ref(18);
    watch([name, age], ([newName, newAge], [oldName, oldAge]) => {
        console.log(newName, newAge, oldName, oldAge);
    });
    const changeName = () => {
        name.value = '彭于晏';
    };
    const changeAge = () => {
        age.value = 20;
    };
</script>
```
### 3.3 侦听响应式对象
* 如果希望侦听一个数组或者对象，那么可以使用一个getter函数，并对可响应式对象进行解构。
```js
<script setup>
    import { reactive, watch } from 'vue'
    const names = reactive(['Eddie', '彭于晏']);
    watch(() => [...names], (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });
    const changeName = () => {
        names.push('胡歌');
    };
</script>
```
### 3.4 深度侦听
* 如果希望侦听一个对象的深层属性，那么可以使用deep选项。
* 也可以传入immediate选项，表示立即执行回调函数。 
```js
<script setup>
    import { reactive, watch } from 'vue'
    const state = reactive({
        name: 'Eddie',
        age: 18,
        info: {
            address: '北京'
        }
    });
    watch(() => state, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    }, {
        deep: true,
        immediate: true // 立即执行回调函数
    });
    const changeAddress = () => {
        state.info.address = '上海';
    };
</script>
```
## 4. watchEffect API
* 首先，watchEffect传入的函数会立即执行一次。
* 其次，watchEffect用于自动收集依赖，当依赖发生变化时，会自动执行回调函数。
```js
<script setup>
    import { ref, watchEffect } from 'vue'
    const name = ref('Eddie');
    const age = ref(18);
    watchEffect(() => {
        console.log('watchEffet执行了～', name.value, age.value);
    });
```
### 4.1 watchEffect的停止侦听
* watchEffect返回一个停止侦听的函数，可以在某些时候需要停止侦听但依然可以获取返回值。
```js
<script setup>
    import { ref, watchEffect } from 'vue'
    const name = ref('Eddie');
    const age = ref(18);
    const stop = watchEffect(() => {
        console.log('watchEffet执行了～', name.value, age.value);
    });
    const stopWatch = () => {
        stop();
    };
</script>
```
### 4.2 watchEffect的延迟执行
#### 4.2.1 在setup中使用ref属性
* 只需要定义一个ref对象，绑定到元素或者组件的ref属性上即可。
```js
<template>
  <div>
    <h2 ref="titleRef">彭于晏</h2>
  </div>
</template>
<script setup>
    import { ref, watchEffect } from 'vue'
    const titleRef = ref(null); // 这样就可以使用ref属性了
    watchEffect(() => {
        console.log(titleRef.value); 
        // 第一次为null
        // 第二次为<h2></h2>
    });
</script>
```
* 打印结果打印了两次
  * 这是因为steup函数在执行时就会立即执行传入的副作用函数，这个时候DOM没有挂载，所以打印为null。
  * 而当DOM挂载时，会给title的ref对象赋值，副作用函数会再次执行，所以第二次打印的是对应的DOM对象。
#### 4.2.2 调整watchEffect的执行时机
* watchEffect的第二个参数可以传入一个配置对象，其中可以传入一个flush选项，用于调整watchEffect的执行时机。
```js
<template>
  <div>
    <h2 ref="titleRef">彭于晏</h2>
  </div>
</template>
<script setup>
    import { ref, watchEffect } from 'vue'
    const titleRef = ref(null);
    watchEffect(() => {
        console.log(titleRef.value); 
    }, {
        flush: 'post'
        // flush 默认是 pre 可选值为 post sync
        // pre 表示在 DOM 更新之前执行副作用函数
        // post 表示在 DOM 更新之后执行副作用函数
        // sync 表示同步执行副作用函数 注：这个选项会阻塞 DOM 更新 是低效的 不建议使用
    });
</script>
```
## 5. 生命周期钩子
* 因为setup是围绕beforeCreate和created生命周期钩子执行的，所以在setup中不需要特别的去定义它们，也就是说在这些钩子中编写的代码在setup函数中都可以直接编写。
* 还有就是别的钩子和vue2有一些区别
```js
<scripe setup>
  // 选项式API       setup
  // beforeMount    onBeforeMount
  // mounted        onMounted
  // beforeUpdate   onBeforeUpdate
  // updated        onUpdated
  // beforeUnmount  onBeforeUnmount
  // unmounted      onUnmounted
  // activated      onActivated
  // deactivated    onDeactivated
  // errorCaptured  onErrorCaptured
</scripe>
```
## 6. 父子组件通信
### 6.1 父组件向子组件传递数据
* 父组件向子组件传递数据，可以通过props属性来实现。
```js
// 父组件
<template>
  <div>
    <h2>父组件</h2>
    <Child ref='childRef' :name="name" :age="age" />
  </div>
</template>
<script setup>
  import Child from './Child.vue'
  const name = 'Eddie'
  const age = 18
  const childRef = ref(null) // 拿到子组件的ref对象
  
  const handleClick = (val) => {
    name.value = val; // 子组件修改了父组件的数据
    console.log('子组件调用父组件的handleClick');
  }
  const handleClick2 = () => {
    childRef.value.handleChildClick(); // 父组件调用子组件的方法 子组件需要先抛出这个方法
  }
</script>
// 子组件
<template>
  <div>
    <h2>子组件</h2>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
  </div>
</template>
<script setup>
  import { defineProps,defineEmits,defineExpose } from 'vue'
  const { name, age } = defineProps({ // 使用defineProps接收父组件传递的数据
    name: String, // 可以简写为 name: String
    age: { // 也可以写成对象的形式 设置默认值和是否必填
      type: Number,
      default: 18 // 如果类型是对象和数组，需要使用函数返回默认值 default: () => {} 或 default: () => []
      required: true
    }
  })
  // 子组件调用父组件的方法和传值
  const emit = defineEmits(['handleClick']) // 传入一个数组，数组中的值为父组件定义的方法名 否则会报警告
  const handleClick = () => {
    emit('handleClick', 'Eddie') // 调用父组件的handleClick方法，并传入参数
  }
  // 父组件调用子组件的方法
  defineExpose({ // 需要先抛出不然父组件调用不了
    handleChildClick: handleClick
  })
</script>
```
### 6.2Provide和inject函数
* provide和inject函数是用于祖孙组件之间的通信的，也就是多层嵌套组件。
* provide函数用于提供数据，inject函数用于接收数据。
```js
<script setup>
    // 父组件
    import {ref, provide, inject } from 'vue'
    const name = ref('Eddie'); //为了响应性 可以在provide值时使用reactive和ref
    provide('name', name);
    // 孙组件
    const name = inject('name');
    // 如果需要修改可响应的数据，那么最好是在数据提供的位置进行修改
    const changeName = () => {
        name.value = '彭于晏';
    };
</script>
```
## 7. setup函数中路由的使用
* 在setup函数中使用路由，需要使用useRouter函数。
```js
<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const go = () => {
        router.push({ // 跳转页面并携带参数
          name: 'home',
          params: {
              id: 1
          }
        });
    };
    // 接收参数
    const id = router.params.id;
</script>
```
## 8. setup函数中vuex的使用
### 8.1 第一步创建store
* 在src目录下创建store文件夹，然后在store文件夹下创建index.js文件。
* 然后需要在main.js中挂载store。
```js
import { createStore } from 'vuex';
export default createStore({
    state: {
        count: 0,
        age: 18,
        name: 'Eddie',
        height: 180
    },
   getters: {
        getCount(state) {
            return state.count * 2;
        },
        nameInfo(state) {
            return `name: ${state.name}`
        },
        ageInfo(state) {
            return `age: ${state.age}`
        },
        heightInfo(state) {
            return `height: ${state.height}`
        }
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        // 接收参数 是对象类型的
        decrement(state, payload) {
            state.count = payload.num;
        },
    },
    actions: {
        incrementAction(state, payload) {
            console.log(paload); // { num : 10 }
            state.commit('increment');
        },
        decrementAction({commit, dispatch, state, rootState, getters, rootGetters}) {
            commit('decrement', { num: 20 });
        },
    },
    modules: {
    }
});
```
### 8.2 模块化store
* 在store文件夹下创建modules文件夹，然后在modules文件夹下创建home.js文件。
```js
const userModule = {
    namespaced: true, // 开启命名空间 为了防止不同模块中的命名冲突
    state: {
        count: 0
    },
    getters: {
       
    },
    mutations: {
       
    },
    actions: {
       
    },
};
```
* 然后在index.js中引入home.js文件。
```js
import home from './modules/home';
const store =  createStore({
    modules: {
        home
    }
});
export default store;
```
### 8.3 在setup函数中使用vuex
* 在setup函数中使用vuex，需要使用useStore函数。
```js
<script setup>
    import { computed } from 'vue'
    import { useStore , mapState} from 'vuex';
    import { useState } from '../hooks/useState'
    import { useGetters } from '../hooks/useGetters'
    const store = useStore();
    const increment = () => {
        store.commit('increment');
    };
    // 1.单个获取
    // 获取state
    const count = store.state.count;
    // 2. 使用辅助函数mapState获取多个state
    const storeStatefns = mapState(['count','name','age','height']);
    // {name: function, age: function, height: function}
    // 返回的是函数方法，所以需要封装一个hooks方法
    import { useState } from '../hooks/useState'
    // 可以解构也可以直接使用
    const {count , name , age , height } = useState(['count','name','age','height']);
    // 3. 使用辅助函数mapGetters获取多个getters
    import { useGetters } from '../hooks/useGetters'
    // 可以解构也可以直接使用
    const stroeGetters = useGetters(['nameInfo','ageInfo','heightInfo']);
</script>
```
### 8.4 封装mapState的hooks方法
* 在src目录下创建hooks文件夹，然后在hooks文件夹下创建useState.js文件。
```js
import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
  // 拿到store独享
  const store = useStore();

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapState(mapper);

  // 对数据进行转换
  const storeState = {};
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    // 因为setup没有this 所以我们需要遍历每个对象利用bind绑定this
    storeState[fnKey] = computed(fn)
  });
  
  return storeState;
}
```
### 8.5 封装mapGetters的hooks方法
* 在src目录下创建hooks文件夹，然后在hooks文件夹下创建useGetters.js文件。
```js
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'

export function useGetters(mapper) {
  // 拿到store独享
  const store = useStore();

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapGetters(mapper);

  // 对数据进行转换
  const storeState = {};
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    // 因为setup没有this 所以我们需要遍历每个对象利用bind绑定this
    storeState[fnKey] = computed(fn)
  });

  return storeState;
}
```
### 8.6 setup函数中使用mapMutations
* 更改Vuex中state中的状态唯一的方法就是提交mutation。
* 还有一条重要的原则就是mutation必须是同步函数。
  * 因为Vue的插件devtool会记录每一个mutation的状态，如果mutation是异步的，那么devtool就无法记录状态的变化。 
```js
<script setup>
    import { mapMutations } from 'vuex'
  
    const { increment , decrement } = mapMutations(['increment' , 'decrement']);
    // 开启命名空间的写法一
    const { increment , decrement } = mapMutations('home',['increment' , 'decrement']);
    // 开启命名空间的写法二
    const { increment , decrement } = mapMutations({
        increment: 'home/increment',
        decrement: 'home/decrement'
    });
    // 很多时候提交的mutation的时候会携带一些数据
    const handleIncrement = () => {
        // 对象风格的提交方式
        decrement({ num: 10 });
    }
</script>
```
### 8.7 setup函数中使用mapActions
* action提交的是mutation，而不是直接变更状态。
* action可以包含任意异步操作。
```js
<script setup>
    import { mapActions } from 'vuex'
  
    const { incrementAction , decrementAction } = mapActions(['incrementAction' , 'decrementAction']);
    // 开启命名空间的写法一
    const { incrementAction , decrementAction } = mapActions('home',['incrementAction' , 'decrementAction']);
    // 开启命名空间的写法二
    const { incrementAction , decrementAction } = mapActions({
        increment: 'home/increment',
        decrement: 'home/decrement'
    });
    // 很多时候提交的mutation的时候会携带一些数据
    const handleIncrement = () => {
        // 对象风格的提交方式
        decrement({ num: 10 });
    }
<script>
```
## 9. vue3中使用pinia
* 安装pinia `npm i pinia`
* 挂载pinia
```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
```
### 9.1 创建store
* 在src目录下创建store文件夹，然后在store文件夹下创建index.js文件。
* pinia本质就是vuex5 也是vue的团队开发的，只是名字不一样也更轻量，只有store、getters、actions三个属性。
```js
import { defineStore } from 'pinia'
import { allStore } from './allStore' //引入另外一个store

export const mainStore = defineStore({
  // store的名称
  id: 'main',
  // store的状态
  state: () => ({
    name: 'Eddie',
    age: 18,
    height: 180
  }),
  // store的计算属性
  getters: {
    nameInfo() {
      return this.name + '的年龄是' + this.age + '身高是' + this.height; //可以直接使用this访问state
    },
    ageInfo() {
      return this.age + 1;
    },
    heightInfo() {
      return this.height + 1;
    },
    //  可以引入另外一个store然后调用其中的属性
    getAllStoreInfo() {
      return allStore().info //假设里面有这个info属性
    }
  },
  // store的方法
  actions: {
    changeNameAndAgeAction() {
      this.count++; //可以直接使用this访问state
      this.height = this.height == 180 ? 175 : 180;
    },
    decrementAction() {
      this.count--;
    }
  }
})
```
### 9.2 在setup函数中使用store
```js
<script setup>
    import { mainStore } from '@/store/index'
    import { storeToRefs } from 'pinia' 
    
    const store = mainStore();
    // 这样写不具备响应性
    const { name, age, height } = store;
    // 因为传统ES6的解构方式虽然能获取到值但是不具有响应性，所以我们需要使用storeToRefs方法将store转换成响应式的对象
    const { name, age, height } = storeToRefs(store);
</script>
```
### 9.3 在setup函数中使用getters
* pinia 的getter和vue中的计算属性几乎一样，在获取state值前做一些逻辑处理。
* getter具有缓存属性，如果值没改变，多次使用只会调用一次。
```js
<script setup>
    import { mainStore } from '@/store/index'
    import { storeToRefs } from 'pinia' 
    
    const store = mainStore();
    // 这样写不具备响应性
    const { nameInfo, ageInfo, heightInfo } = store;
    // 因为传统ES6的解构方式虽然能获取到值但是不具有响应性，所以我们需要使用storeToRefs方法将store转换成响应式的对象
    const { nameInfo, ageInfo, heightInfo } = storeToRefs(store);
</script>
```

### 9.4 pinia修改数据状态
```js
<script setup>
    import { mainStore } from '@/store/index'
    import { storeToRefs } from 'pinia' 
    
    const store = mainStore();
    const { name, age, height } = storeToRefs(store);
    // 方法一：修改简单的数据状态
    const changeName = () => {
        store.name = '彭于晏'
    };
    // 方法二：修改多条数据状态
    // $patch + 对象
    const changeNameAndAge = () => {
        store.$patch({
            name: '彭于晏',
            age: 30
        })
    };
    // $patch + 函数
    const changeNameAndAge = () => {
        store.$patch((state) => {
            state.name = `我就是${state.name}`
            state.age = state.age - 12
        })
    };
    // 方法三：通过actions修改数据状态
    const changeNameAndAge = () => {
        store.changeNameAndAgeAction()
    };
```





