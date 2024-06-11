import './assets/main.css'

import { createApp } from 'vue'
import App from './components/App.vue'
import CalculatorComponent from './components/Calculator.vue'
import CalculatorButton from './components/CalculatorButton.vue'
import { Calculator } from './store/modules/Calculator'
import { Operation } from './store/modules/Operation'

const app = createApp(App)

app.component('CalculatorComponent', CalculatorComponent)
app.component('CalculatorButton', CalculatorButton)

app.provide('calculator', new Calculator())
app.provide('operation', Operation)

app.mount('#app')
